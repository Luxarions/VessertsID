/**
 * Param
 * Reactive parameter variable wrapper.
 * Holds typed values, tracks dirty states, caches previous values,
 * and notifies listeners of changes.
 */

import { EventDispatcher } from './EventDispatcher.js';

let _paramId = 0;

class Param extends EventDispatcher {

	constructor( value ) {

		super();

		this.isParam = true;

		this.id = ++ _paramId;

		this._value = value;
		this._previousValue = undefined;

		this.version = 0;

	}

	get value() {

		return this._value;

	}

	set value( value ) {

		if ( this._value !== value ) {

			this._previousValue = this._value;
			this._value = value;

			this.version ++;

			this.dispatchEvent( {
				type: 'change',
				value: value,
				previous: this._previousValue
			} );

		}

	}

	get previousValue() {

		return this._previousValue;

	}

	set needsUpdate( val ) {

		if ( val === true ) {

			this.version ++;
			this.dispatchEvent( { type: 'change', value: this._value, previous: this._previousValue } );

		}

	}

	clone() {

		return new this.constructor( this._value );

	}

	copy( source ) {

		this._value = source.value;
		this._previousValue = source.previousValue;
		this.version ++;

		return this;

	}

	toJSON() {

		return {
			id: this.id,
			value: this._value,
			version: this.version
		};

	}

}

export { Param };
