/**
 * Layers
 * 32-bit bitmask channel manager.
 * Used for audience scoping, privacy filtering, and content gating in social media.
 * Designed in the exact Three.js architectural standard.
 */

class Layers {

	constructor() {

		this.mask = 1 | 0;

	}

	set( channel ) {

		this.mask = ( 1 << channel | 0 ) >>> 0;

	}

	enable( channel ) {

		this.mask |= ( 1 << channel | 0 ) >>> 0;

	}

	enableAll() {

		this.mask = 0xffffffff | 0;

	}

	disable( channel ) {

		this.mask &= ~( ( 1 << channel | 0 ) >>> 0 );

	}

	disableAll() {

		this.mask = 0;

	}

	toggle( channel ) {

		this.mask ^= ( 1 << channel | 0 ) >>> 0;

	}

	test( layers ) {

		return ( this.mask & layers.mask ) !== 0;

	}

	isEnabled( channel ) {

		return ( this.mask & ( ( 1 << channel | 0 ) >>> 0 ) ) !== 0;

	}

}

export { Layers };
