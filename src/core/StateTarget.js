/**
 * StateTarget
 * Memory sink and snapshot container for off-screen caching,
 * timeline persistence buffers, and state serialization targets.
 */

import { EventDispatcher } from './EventDispatcher.js';

class StateTarget extends EventDispatcher {

	constructor( width = 500, height = 500, options = {} ) {

		super();

		this.isStateTarget = true;

		this.width = width;
		this.height = height;

		this.depth = 1;

		this.state = {};
		this.snapshots = [];

		this.options = Object.assign( {
			generateSnapshots: true,
			maxSnapshots: 50,
			compressed: false
		}, options );

		this.version = 0;

	}

	setSize( width, height, depth = 1 ) {

		if ( this.width !== width || this.height !== height || this.depth !== depth ) {

			this.width = width;
			this.height = height;
			this.depth = depth;

			this.dispose();

		}

		return this;

	}

	write( key, value ) {

		this.state[ key ] = value;
		this.version ++;

		return this;

	}

	read( key ) {

		return this.state[ key ];

	}

	has( key ) {

		return this.state[ key ] !== undefined;

	}

	delete( key ) {

		if ( this.state[ key ] !== undefined ) {

			delete this.state[ key ];
			this.version ++;
			return true;

		}

		return false;

	}

	captureSnapshot() {

		if ( ! this.options.generateSnapshots ) return null;

		const snapshot = {
			id: ++ this.version,
			timestamp: Date.now(),
			data: JSON.parse( JSON.stringify( this.state ) )
		};

		this.snapshots.push( snapshot );

		if ( this.snapshots.length > this.options.maxSnapshots ) {

			this.snapshots.shift();

		}

		this.dispatchEvent( { type: 'snapshot', snapshot: snapshot } );

		return snapshot;

	}

	restoreSnapshot( snapshotOrId ) {

		let targetSnapshot = null;

		if ( typeof snapshotOrId === 'number' ) {

			targetSnapshot = this.snapshots.find( ( s ) => s.id === snapshotOrId );

		} else if ( snapshotOrId && snapshotOrId.data ) {

			targetSnapshot = snapshotOrId;

		}

		if ( targetSnapshot ) {

			this.state = JSON.parse( JSON.stringify( targetSnapshot.data ) );
			this.version ++;

			this.dispatchEvent( { type: 'restore', snapshot: targetSnapshot } );

			return true;

		}

		return false;

	}

	clone() {

		return new this.constructor().copy( this );

	}

	copy( source ) {

		this.width = source.width;
		this.height = source.height;
		this.depth = source.depth;

		this.state = JSON.parse( JSON.stringify( source.state ) );
		this.options = Object.assign( {}, source.options );

		return this;

	}

	dispose() {

		this.state = {};
		this.snapshots.length = 0;

		this.dispatchEvent( { type: 'dispose' } );

	}

}

export { StateTarget };
