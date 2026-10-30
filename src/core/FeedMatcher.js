/**
 * FeedMatcher
 * Query and filter evaluator across social graph entities.
 * Performs audience layer gating, hashtag extraction, criteria intersections,
 * and ranking sort against target nodes in the feed.
 */

import { Layers } from './Layers.js';

class FeedMatcher {

	constructor( query = {} ) {

		this.query = query;

		this.layers = new Layers();

		this.params = {
			minScore: 0,
			authorId: null,
			tags: [],
			types: []
		};

		if ( query.layers !== undefined ) {

			this.layers.mask = query.layers.mask;

		}

		if ( query.params !== undefined ) {

			Object.assign( this.params, query.params );

		}

	}

	setQuery( query ) {

		this.query = query;

		if ( query.layers !== undefined ) {

			this.layers.mask = query.layers.mask;

		}

		if ( query.params !== undefined ) {

			Object.assign( this.params, query.params );

		}

		return this;

	}

	testEntity( entity ) {

		if ( ! entity || ! entity.isEntity ) return false;

		// 1. Visibility check
		if ( entity.visible === false ) return false;

		// 2. Audience layer gating bitmask check
		if ( this.layers.test( entity.layers ) === false ) return false;

		// 3. Entity type check
		if ( this.params.types && this.params.types.length > 0 ) {

			if ( this.params.types.indexOf( entity.type ) === -1 ) {

				return false;

			}

		}

		// 4. Author filter check
		if ( this.params.authorId !== null && entity.userData.authorId !== undefined ) {

			if ( entity.userData.authorId !== this.params.authorId ) {

				return false;

			}

		}

		// 5. Hashtag intersection check
		if ( this.params.tags && this.params.tags.length > 0 ) {

			const entityTags = entity.userData.tags;

			if ( ! Array.isArray( entityTags ) || ! hasIntersection( this.params.tags, entityTags ) ) {

				return false;

			}

		}

		// 6. Minimum score filter
		if ( this.params.minScore > 0 ) {

			const score = entity.userData.score || 0;

			if ( score < this.params.minScore ) {

				return false;

			}

		}

		return true;

	}

	match( rootEntity, recursive = true ) {

		const results = [];

		this.matchEntity( rootEntity, results, recursive );

		// Sort by score descending if scores are present
		results.sort( ( a, b ) => {

			const scoreA = a.score !== undefined ? a.score : 0;
			const scoreB = b.score !== undefined ? b.score : 0;

			return scoreB - scoreA;

		} );

		return results;

	}

	matchEntity( entity, intersects, recursive = true ) {

		if ( this.testEntity( entity ) ) {

			intersects.push( {
				distance: calculateDistance( this.query, entity ),
				score: entity.userData.score || 0,
				entity: entity
			} );

		}

		if ( recursive === true ) {

			const children = entity.children;

			for ( let i = 0, l = children.length; i < l; i ++ ) {

				this.matchEntity( children[ i ], intersects, true );

			}

		}

	}

}

function hasIntersection( arr1, arr2 ) {

	for ( let i = 0; i < arr1.length; i ++ ) {

		if ( arr2.indexOf( arr1[ i ] ) !== -1 ) return true;

	}

	return false;

}

function calculateDistance( query, entity ) {

	if ( query.timestamp && entity.userData.timestamp ) {

		return Math.abs( query.timestamp - entity.userData.timestamp );

	}

	return 0;

}

export { FeedMatcher };
