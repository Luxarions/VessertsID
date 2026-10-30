/**
 * InstancedFeedGraph
 * Graph structure representing repetitive, high-volume virtual feed items.
 * Extends GraphTopology with instanceCount management for virtual list rendering.
 */

import { GraphTopology } from './GraphTopology.js';

class InstancedFeedGraph extends GraphTopology {

	constructor() {

		super();

		this.isInstancedFeedGraph = true;

		this.type = 'InstancedFeedGraph';
		this.instanceCount = Infinity;

	}

	copy( source ) {

		super.copy( source );

		this.instanceCount = source.instanceCount;

		return this;

	}

	clone() {

		return new this.constructor().copy( this );

	}

	toJSON() {

		const data = super.toJSON !== undefined ? super.toJSON() : {};

		data.instanceCount = this.instanceCount;
		data.isInstancedFeedGraph = true;

		return data;

	}

}

export { InstancedFeedGraph };
