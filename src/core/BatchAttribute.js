/**
 * BatchAttribute
 * Attribute view pointing to a specific offset slice within a BatchBuffer.
 * Allows reading and writing individual data components (e.g. likes, views)
 * without duplicating memory.
 */

class BatchAttribute {

	constructor( batchBuffer, itemSize, offset, normalized = false ) {

		this.isBatchAttribute = true;

		this.name = '';

		this.data = batchBuffer;
		this.itemSize = itemSize;
		this.offset = offset;
		this.normalized = normalized === true;

	}

	get count() {

		return this.data.count;

	}

	get array() {

		return this.data.array;

	}

	set needsUpdate( value ) {

		this.data.needsUpdate = value;

	}

	get( index, subOffset = 0 ) {

		return this.data.array[ index * this.data.stride + this.offset + subOffset ];

	}

	set( index, subOffset, value ) {

		this.data.array[ index * this.data.stride + this.offset + subOffset ] = value;
		return this;

	}

	setComponent( index, value ) {

		this.data.array[ index * this.data.stride + this.offset ] = value;
		return this;

	}

	getComponent( index ) {

		return this.data.array[ index * this.data.stride + this.offset ];

	}

	clone( batchBuffer ) {

		return new this.constructor( batchBuffer || this.data, this.itemSize, this.offset, this.normalized );

	}

	toJSON() {

		return {
			itemSize: this.itemSize,
			offset: this.offset,
			normalized: this.normalized
		};

	}

}

export { BatchAttribute };
