/**
 * Timer
 * High-precision scheduler and timing controller.
 * Supports scale adjustment, delta time, fixed updates, and simulation loops.
 */

class Timer {

	constructor() {

		this._previousTime = 0;
		this._currentTime = 0;

		this._delta = 0;
		this._elapsed = 0;

		this._timescale = 1;

		this._useFixedDelta = false;
		this._fixedDelta = 16.67; // default ~60 FPS in milliseconds

		// Initialize time base
		this._currentTime = now();
		this._previousTime = this._currentTime;

	}

	getDelta() {

		return this._delta / 1000;

	}

	getElapsed() {

		return this._elapsed / 1000;

	}

	setTimescale( timescale ) {

		this._timescale = timescale;
		return this;

	}

	getTimescale() {

		return this._timescale;

	}

	reset() {

		this._currentTime = now();
		this._previousTime = this._currentTime;
		this._delta = 0;
		this._elapsed = 0;

		return this;

	}

	dispose() {

		return this;

	}

	update( timestamp ) {

		if ( this._useFixedDelta ) {

			this._delta = this._fixedDelta * this._timescale;
			this._elapsed += this._delta;
			this._currentTime += this._delta;

		} else {

			this._currentTime = timestamp !== undefined ? timestamp : now();
			this._delta = ( this._currentTime - this._previousTime ) * this._timescale;
			this._elapsed += this._delta;
			this._previousTime = this._currentTime;

		}

		return this;

	}

}

function now() {

	return ( typeof performance === 'undefined' ? Date : performance ).now();

}

export { Timer };
