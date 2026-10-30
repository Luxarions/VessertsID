/**
 * StreamBuffer
 * High-performance typed data container for timeline items and metrics streams.
 * Manages item sizing, offsets, typed array allocation, and dynamic range updates.
 */

class StreamBuffer {

	constructor( array, itemSize, normalized = false ) {

		if ( Array.isArray( array ) ) {

			throw new TypeError( '[StreamBuffer] Array should be a Typed Array.' );

		}

		this.isStreamBuffer = true;

		this.name = '';

		this.array = array;
		this.itemSize = itemSize;
		this.count = array !== undefined ? array.length / itemSize : 0;
		this.normalized = normalized === true;

		this.usage = 0; // Dynamic/Static stream usage hint
		this.updateRange = { offset: 0, count: - 1 };

		this.version = 0;

	}

	set needsUpdate( value ) {

		if ( value === true ) this.version ++;

	}

	setUsage( value ) {

		this.usage = value;
		return this;

	}

	copy( source ) {

		this.name = source.name;
		this.array = new source.array.constructor( source.array );
		this.itemSize = source.itemSize;
		this.count = source.count;
		this.normalized = source.normalized;

		this.usage = source.usage;

		return this;

	}

	copyAt( index1, attribute, index2 ) {

		index1 *= this.itemSize;
		index2 *= attribute.itemSize;

		for ( let i = 0, l = this.itemSize; i < l; i ++ ) {

			this.array[ index1 + i ] = attribute.array[ index2 + i ];

		}

		return this;

	}

	copyArray( array ) {

		this.array.set( array );
		return this;

	}

	set( value, offset = 0 ) {

		this.array.set( value, offset );
		return this;

	}

	get( index, offset = 0 ) {

		return this.array[ index * this.itemSize + offset ];

	}

	setComponent( index, offset, value ) {

		this.array[ index * this.itemSize + offset ] = value;
		return this;

	}

	clone() {

		return new this.constructor( this.array, this.itemSize ).copy( this );

	}

	toJSON() {

		return {
			itemSize: this.itemSize,
			type: this.array.constructor.name,
			array: Array.from( this.array ),
			normalized: this.normalized
		};

	}

}

export { StreamBuffer };
