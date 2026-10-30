/**
 * InstancedPostAttribute
 * Attribute data container for instanced feed items.
 * Extends StreamBuffer to handle per-instance interaction states
 * (isLiked, isBookmarked, isMuted, itemHeight) across thousands of feed items.
 */

import { StreamBuffer } from './StreamBuffer.js';

class InstancedPostAttribute extends StreamBuffer {

	constructor( array, itemSize, normalized = false, meshPerAttribute = 1 ) {

		super( array, itemSize, normalized );

		this.isInstancedPostAttribute = true;

		this.meshPerAttribute = meshPerAttribute;

	}

	copy( source ) {

		super.copy( source );

		this.meshPerAttribute = source.meshPerAttribute;

		return this;

	}

	toJSON() {

		const data = super.toJSON();

		data.meshPerAttribute = this.meshPerAttribute;
		data.isInstancedPostAttribute = true;

		return data;

	}

}

export { InstancedPostAttribute };
