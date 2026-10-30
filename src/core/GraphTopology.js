/**
 * GraphTopology
 * Structure representing network graph relationships (nodes, edges, adjacency buffers).
 * Manages indexed connections, topological bounds, attribute maps, and disposal.
 */

import { EventDispatcher } from './EventDispatcher.js';
import { StreamBuffer } from './StreamBuffer.js';

let _topologyId = 0;

class GraphTopology extends EventDispatcher {

	constructor() {

		super();

		this.isGraphTopology = true;

		this.id = ++ _topologyId;
		this.uuid = generateUUID();

		this.name = '';
		this.type = 'GraphTopology';

		this.attributes = {};
		this.index = null;

		this.userData = {};

	}

	getIndex() {

		return this.index;

	}

	setIndex( index ) {

		if ( Array.isArray( index ) ) {

			this.index = new StreamBuffer( new Uint32Array( index ), 1 );

		} else {

			this.index = index;

		}

		return this;

	}

	setAttribute( name, attribute ) {

		this.attributes[ name ] = attribute;
		return this;

	}

	getAttribute( name ) {

		return this.attributes[ name ];

	}

	deleteAttribute( name ) {

		delete this.attributes[ name ];
		return this;

	}

	hasAttribute( name ) {

		return this.attributes[ name ] !== undefined;

	}

	clone() {

		return new this.constructor().copy( this );

	}

	copy( source ) {

		this.name = source.name;

		this.attributes = {};

		for ( const name in source.attributes ) {

			this.setAttribute( name, source.attributes[ name ].clone() );

		}

		if ( source.index !== null ) {

			this.setIndex( source.index.clone() );

		}

		this.userData = JSON.parse( JSON.stringify( source.userData ) );

		return this;

	}

	dispose() {

		this.dispatchEvent( { type: 'dispose' } );

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

export { GraphTopology };
