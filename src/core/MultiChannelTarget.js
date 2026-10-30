/**
 * MultiChannelTarget
 * Multi-dimensional channel target manager.
 * Extends StateTarget to manage sliced channels (Home, Explore, Notifications, DMs, Stories)
 * with independent depth levels, sub-state routing, and channel switching.
 */

import { StateTarget } from './StateTarget.js';

class MultiChannelTarget extends StateTarget {

	constructor( width = 500, height = 500, depth = 4, options = {} ) {

		super( width, height, options );

		this.isMultiChannelTarget = true;

		this.depth = depth;
		this.activeChannel = 0;

		this.channels = new Map();

		for ( let i = 0; i < depth; i ++ ) {

			this.channels.set( i, {
				name: `channel_${ i }`,
				state: {},
				items: [],
				version: 0
			} );

		}

	}

	setChannelName( channelIndex, name ) {

		if ( this.channels.has( channelIndex ) ) {

			this.channels.get( channelIndex ).name = name;

		}

		return this;

	}

	getChannelName( channelIndex ) {

		return this.channels.has( channelIndex ) ? this.channels.get( channelIndex ).name : null;

	}

	setActiveChannel( channelIndex ) {

		if ( channelIndex >= 0 && channelIndex < this.depth ) {

			const prev = this.activeChannel;
			this.activeChannel = channelIndex;

			this.dispatchEvent( { type: 'channelchange', previous: prev, current: channelIndex } );

		}

		return this;

	}

	writeChannel( channelIndex, key, value ) {

		if ( this.channels.has( channelIndex ) ) {

			const ch = this.channels.get( channelIndex );
			ch.state[ key ] = value;
			ch.version ++;

			if ( channelIndex === this.activeChannel ) {

				this.write( key, value );

			}

		}

		return this;

	}

	readChannel( channelIndex, key ) {

		if ( this.channels.has( channelIndex ) ) {

			return this.channels.get( channelIndex ).state[ key ];

		}

		return undefined;

	}

	pushItem( channelIndex, item ) {

		if ( this.channels.has( channelIndex ) ) {

			const ch = this.channels.get( channelIndex );
			ch.items.push( item );
			ch.version ++;

			this.dispatchEvent( { type: 'itemadded', channel: channelIndex, item: item } );

		}

		return this;

	}

	getItems( channelIndex ) {

		return this.channels.has( channelIndex ) ? this.channels.get( channelIndex ).items : [];

	}

	clearChannel( channelIndex ) {

		if ( this.channels.has( channelIndex ) ) {

			const ch = this.channels.get( channelIndex );
			ch.state = {};
			ch.items.length = 0;
			ch.version ++;

			this.dispatchEvent( { type: 'channelclear', channel: channelIndex } );

		}

		return this;

	}

	copy( source ) {

		super.copy( source );

		this.depth = source.depth;
		this.activeChannel = source.activeChannel;

		this.channels.clear();

		source.channels.forEach( ( val, key ) => {

			this.channels.set( key, {
				name: val.name,
				state: JSON.parse( JSON.stringify( val.state ) ),
				items: JSON.parse( JSON.stringify( val.items ) ),
				version: val.version
			} );

		} );

		return this;

	}

	dispose() {

		super.dispose();
		this.channels.clear();

	}

}

export { MultiChannelTarget };
