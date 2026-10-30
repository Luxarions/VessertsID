/**
 * MathUtils
 * Comprehensive mathematical utility functions, conversions, and algorithms.
 */

const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;

function generateUUID() {

	if ( typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function' ) {

		return crypto.randomUUID();

	}

	let d = Date.now();
	let d2 = ( typeof performance !== 'undefined' && performance.now && ( performance.now() * 1000 ) ) || 0;

	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function ( c ) {

		let r = Math.random() * 16;

		if ( d > 0 ) {

			r = ( d + r ) % 16 | 0;
			d = Math.floor( d / 16 );

		} else {

			r = ( d2 + r ) % 16 | 0;
			d2 = Math.floor( d2 / 16 );

		}

		return ( c === 'x' ? r : ( r & 0x3 | 0x8 ) ).toString( 16 );

	} );

}

function clamp( value, min, max ) {

	return Math.max( min, Math.min( max, value ) );

}

function euclideanModulo( n, m ) {

	return ( ( n % m ) + m ) % m;

}

function mapLinear( x, a1, a2, b1, b2 ) {

	return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );

}

function lerp( x, y, t ) {

	return ( 1 - t ) * x + t * y;

}

function damp( x, y, lambda, dt ) {

	return lerp( x, y, 1 - Math.exp( - lambda * dt ) );

}

function pingpong( x, length = 1 ) {

	return length - Math.abs( euclideanModulo( x, ( 2 * length ) ) - length );

}

function smoothstep( x, min, max ) {

	if ( x <= min ) return 0;
	if ( x >= max ) return 1;

	x = ( x - min ) / ( max - min );

	return x * x * ( 3 - 2 * x );

}

function smootherstep( x, min, max ) {

	if ( x <= min ) return 0;
	if ( x >= max ) return 1;

	x = ( x - min ) / ( max - min );

	return x * x * x * ( x * ( x * 6 - 15 ) + 10 );

}

function randInt( low, high ) {

	return low + Math.floor( Math.random() * ( high - low + 1 ) );

}

function randFloat( low, high ) {

	return low + Math.random() * ( high - low );

}

function randFloatSpread( range ) {

	return range * ( 0.5 - Math.random() );

}

function degToRad( degrees ) {

	return degrees * DEG2RAD;

}

function radToDeg( radians ) {

	return radians * RAD2DEG;

}

function isPowerOfTwo( value ) {

	return ( value & ( value - 1 ) ) === 0 && value !== 0;

}

function ceilPowerOfTwo( value ) {

	return Math.pow( 2, Math.ceil( Math.log( value ) / Math.LN2 ) );

}

function floorPowerOfTwo( value ) {

	return Math.pow( 2, Math.floor( Math.log( value ) / Math.LN2 ) );

}

const MathUtils = {
	DEG2RAD: DEG2RAD,
	RAD2DEG: RAD2DEG,
	generateUUID: generateUUID,
	clamp: clamp,
	euclideanModulo: euclideanModulo,
	mapLinear: mapLinear,
	lerp: lerp,
	damp: damp,
	pingpong: pingpong,
	smoothstep: smoothstep,
	smootherstep: smootherstep,
	randInt: randInt,
	randFloat: randFloat,
	randFloatSpread: randFloatSpread,
	degToRad: degToRad,
	radToDeg: radToDeg,
	isPowerOfTwo: isPowerOfTwo,
	ceilPowerOfTwo: ceilPowerOfTwo,
	floorPowerOfTwo: floorPowerOfTwo
};

export {
	DEG2RAD,
	RAD2DEG,
	generateUUID,
	clamp,
	euclideanModulo,
	mapLinear,
	lerp,
	damp,
	pingpong,
	smoothstep,
	smootherstep,
	randInt,
	randFloat,
	randFloatSpread,
	degToRad,
	radToDeg,
	isPowerOfTwo,
	ceilPowerOfTwo,
	floorPowerOfTwo,
	MathUtils
};
