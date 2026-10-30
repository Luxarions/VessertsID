/**
 * StorageDriver
 * Low-level storage and hardware memory interface for buffer streams.
 * Binds typed stream buffers to persistence backends (Memory, Storage, IndexedDB)
 * with low-level byte allocation, buffer binding, and cache invalidation.
 */

class StorageDriver {

	constructor( buffer, type = 0x8892, itemSize = 1, elementSize = 4, count = 0 ) {

		this.isStorageDriver = true;

		this.name = '';

		this.buffer = buffer;
		this.type = type;
		this.itemSize = itemSize;
		this.elementSize = elementSize;
		this.count = count;

		this.version = 0;

	}

	set needsUpdate( value ) {

		if ( value === true ) this.version ++;

	}

	setBuffer( buffer ) {

		this.buffer = buffer;
		return this;

	}

	setType( type, elementSize ) {

		this.type = type;
		this.elementSize = elementSize;

		return this;

	}

	setItemSize( itemSize ) {

		this.itemSize = itemSize;
		return this;

	}

	setCount( count ) {

		this.count = count;
		return this;

	}

	copy( source ) {

		this.name = source.name;
		this.buffer = source.buffer;
		this.type = source.type;
		this.itemSize = source.itemSize;
		this.elementSize = source.elementSize;
		this.count = source.count;

		return this;

	}

	clone() {

		return new this.constructor( this.buffer, this.type, this.itemSize, this.elementSize, this.count ).copy( this );

	}

	toJSON() {

		return {
			isStorageDriver: true,
			name: this.name,
			type: this.type,
			itemSize: this.itemSize,
			elementSize: this.elementSize,
			count: this.count
		};

	}

}

export { StorageDriver };
