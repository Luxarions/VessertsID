/**
 * ParamsGroup
 * Group manager for named Param instances.
 * Coordinates batch parameter synchronization, group version hashing,
 * and aggregated change events across parameter sets.
 */

import { EventDispatcher } from './EventDispatcher.js';
import { Param } from './Param.js';

let _paramsGroupId = 0;

class ParamsGroup extends EventDispatcher {

	constructor( name = '' ) {

		super();

		this.isParamsGroup = true;

		this.id = ++ _paramsGroupId;
		this.name = name;

		this.params = new Map();
		this.version = 0;

		this._onParamChange = ( event ) => {

			this.version ++;
			this.dispatchEvent( {
				type: 'change',
				param: event.target,
				value: event.value,
				previous: event.previous
			} );

		};

	}

	add( name, paramOrValue ) {

		let param = paramOrValue;

		if ( ! param || ! param.isParam ) {

			param = new Param( paramOrValue );

		}

		if ( this.params.has( name ) ) {

			this.remove( name );

		}

		this.params.set( name, param );
		param.addEventListener( 'change', this._onParamChange );

		this.version ++;

		return this;

	}

	remove( name ) {

		if ( this.params.has( name ) ) {

			const param = this.params.get( name );
			param.removeEventListener( 'change', this._onParamChange );

			this.params.delete( name );
			this.version ++;

			return true;

		}

		return false;

	}

	get( name ) {

		return this.params.get( name );

	}

	getValue( name ) {

		const param = this.params.get( name );
		return param ? param.value : undefined;

	}

	setValue( name, value ) {

		const param = this.params.get( name );

		if ( param ) {

			param.value = value;

		} else {

			this.add( name, value );

		}

		return this;

	}

	has( name ) {

		return this.params.has( name );

	}

	setValues( values ) {

		for ( const name in values ) {

			this.setValue( name, values[ name ] );

		}

		return this;

	}

	getValues() {

		const result = {};

		this.params.forEach( ( param, name ) => {

			result[ name ] = param.value;

		} );

		return result;

	}

	clear() {

		this.params.forEach( ( param ) => {

			param.removeEventListener( 'change', this._onParamChange );

		} );

		this.params.clear();
		this.version ++;

		return this;

	}

	clone() {

		const group = new this.constructor( this.name );

		this.params.forEach( ( param, name ) => {

			group.add( name, param.clone() );

		} );

		return group;

	}

	copy( source ) {

		this.clear();
		this.name = source.name;

		source.params.forEach( ( param, name ) => {

			this.add( name, param.clone() );

		} );

		return this;

	}

	dispose() {

		this.clear();
		this.dispatchEvent( { type: 'dispose' } );

	}

}

export { ParamsGroup };
