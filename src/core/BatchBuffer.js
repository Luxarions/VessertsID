/**
 * BatchBuffer
 * Interleaved data buffer storing tightly-packed, heterogeneous metrics.
 * Combines multiple item data types (likes, comments, views, flags) into
 * a contiguous memory block with configurable stride and dynamic updates.
 */

class BatchBuffer {

	constructor( array, stride ) {

		if ( Array.isArray( array ) ) {

			throw new TypeError( '[BatchBuffer] Array should be a Typed Array.' );

		}

		this.isBatchBuffer = true;

		this.array = array;
		this.stride = stride;
		this.count = array !== undefined ? array.length / stride : 0;

		this.usage = 0;
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

		this.array = new source.array.constructor( source.array );
		this.stride = source.stride;
		this.count = source.count;
		this.usage = source.usage;

		return this;

	}

	copyAt( index1, attribute, index2 ) {

		index1 *= this.stride;
		index2 *= attribute.stride;

		for ( let i = 0, l = this.stride; i < l; i ++ ) {

			this.array[ index1 + i ] = attribute.array[ index2 + i ];

		}

		return this;

	}

	set( value, offset = 0 ) {

		this.array.set( value, offset );
		return this;

	}

	clone() {

		return new this.constructor( this.array, this.stride ).copy( this );

	}

	toJSON() {

		return {
			stride: this.stride,
			type: this.array.constructor.name,
			array: Array.from( this.array )
		};

	}

}

export { BatchBuffer };
