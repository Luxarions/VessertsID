/**
 * Entity
 * Base graph node representing any social media entity (User, Post, Comment, Channel).
 * Features parent-child hierarchy, lifecycle events, and bitmask audience layer gating.
 */

import { EventDispatcher } from './EventDispatcher.js';
import { Layers } from './Layers.js';

let _entityId = 0;

class Entity extends EventDispatcher {

	constructor() {

		super();

		this.isEntity = true;

		this.id = ++ _entityId;
		this.uuid = generateUUID();

		this.name = '';
		this.type = 'Entity';

		this.parent = null;
		this.children = [];

		this.layers = new Layers();

		this.visible = true;

		this.userData = {};

	}

	add( object ) {

		if ( arguments.length > 1 ) {

			for ( let i = 0; i < arguments.length; i ++ ) {

				this.add( arguments[ i ] );

			}

			return this;

		}

		if ( object === this ) {

			console.error( '[Entity.add] An entity cannot be added as a child of itself.', object );
			return this;

		}

		if ( object && object.isEntity ) {

			if ( object.parent !== null ) {

				object.parent.remove( object );

			}

			object.parent = this;
			this.children.push( object );

			object.dispatchEvent( { type: 'added' } );
			this.dispatchEvent( { type: 'childadded', child: object } );

		} else {

			console.error( '[Entity.add] Target is not an instance of Entity.', object );

		}

		return this;

	}

	remove( object ) {

		if ( arguments.length > 1 ) {

			for ( let i = 0; i < arguments.length; i ++ ) {

				this.remove( arguments[ i ] );

			}

			return this;

		}

		const index = this.children.indexOf( object );

		if ( index !== -1 ) {

			object.parent = null;
			this.children.splice( index, 1 );

			object.dispatchEvent( { type: 'removed' } );
			this.dispatchEvent( { type: 'childremoved', child: object } );

		}

		return this;

	}

	removeFromParent() {

		const parent = this.parent;

		if ( parent !== null ) {

			parent.remove( this );

		}

		return this;

	}

	clear() {

		for ( let i = 0; i < this.children.length; i ++ ) {

			const object = this.children[ i ];

			object.parent = null;
			object.dispatchEvent( { type: 'removed' } );

		}

		this.children.length = 0;

		return this;

	}

	getObjectById( id ) {

		return this.getObjectByProperty( 'id', id );

	}

	getObjectByName( name ) {

		return this.getObjectByProperty( 'name', name );

	}

	getObjectByProperty( name, value ) {

		if ( this[ name ] === value ) return this;

		for ( let i = 0, l = this.children.length; i < l; i ++ ) {

			const child = this.children[ i ];
			const object = child.getObjectByProperty( name, value );

			if ( object !== undefined ) {

				return object;

			}

		}

		return undefined;

	}

	traverse( callback ) {

		callback( this );

		const children = this.children;

		for ( let i = 0, l = children.length; i < l; i ++ ) {

			children[ i ].traverse( callback );

		}

	}

	traverseVisible( callback ) {

		if ( this.visible === false ) return;

		callback( this );

		const children = this.children;

		for ( let i = 0, l = children.length; i < l; i ++ ) {

			children[ i ].traverseVisible( callback );

		}

	}

	traverseAncestors( callback ) {

		const parent = this.parent;

		if ( parent !== null ) {

			callback( parent );

			parent.traverseAncestors( callback );

		}

	}

	clone( recursive = true ) {

		return new this.constructor().copy( this, recursive );

	}

	copy( source, recursive = true ) {

		this.name = source.name;
		this.type = source.type;

		this.layers.mask = source.layers.mask;
		this.visible = source.visible;

		this.userData = JSON.parse( JSON.stringify( source.userData ) );

		if ( recursive === true ) {

			for ( let i = 0; i < source.children.length; i ++ ) {

				const child = source.children[ i ];
				this.add( child.clone() );

			}

		}

		return this;

	}

}

function generateUUID() {

	if ( typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function' ) {

		return crypto.randomUUID();

	}

	let d = Date.now();
	let d2 = ( typeof performance !== 'undefined' && performance.now && ( performance.now() * 1000 ) ) || 0;

	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function ( c ) {

		let r = Math.random() * 16;

		if ( d > 0 ) {

			r = ( d + r ) % 16 | 0;
			d = Math.floor( d / 16 );

		} else {

			r = ( d2 + r ) % 16 | 0;
			d2 = Math.floor( d2 / 16 );

		}

		return ( c === 'x' ? r : ( r & 0x3 | 0x8 ) ).toString( 16 );

	} );

}

export { Entity };
