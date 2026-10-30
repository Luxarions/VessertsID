/**
 * InstancedBatchBuffer
 * Interleaved data buffer designed for instanced batch metrics.
 * Combines heterogeneous metric streams with per-instance iteration rates.
 */

import { BatchBuffer } from './BatchBuffer.js';

class InstancedBatchBuffer extends BatchBuffer {

	constructor( array, stride, meshPerAttribute = 1 ) {

		super( array, stride );

		this.isInstancedBatchBuffer = true;

		this.meshPerAttribute = meshPerAttribute;

	}

	copy( source ) {

		super.copy( source );

		this.meshPerAttribute = source.meshPerAttribute;

		return this;

	}

	clone() {

		return new this.constructor( this.array, this.stride, this.meshPerAttribute ).copy( this );

	}

	toJSON() {

		const data = super.toJSON();

		data.meshPerAttribute = this.meshPerAttribute;
		data.isInstancedBatchBuffer = true;

		return data;

	}

}

export { InstancedBatchBuffer };
