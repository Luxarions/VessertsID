/**
 * Vessert.js
 * Master entry point for VessertID library
 */

// Core
export { EventDispatcher } from './core/EventDispatcher.js';
export { Layers } from './core/Layers.js';
export { Clock } from './core/Clock.js';
export { Timer } from './core/Timer.js';
export { Entity } from './core/Entity.js';
export { StreamBuffer } from './core/StreamBuffer.js';
export { GraphTopology } from './core/GraphTopology.js';
export { FeedMatcher } from './core/FeedMatcher.js';
export { StateTarget } from './core/StateTarget.js';
export { MultiChannelTarget } from './core/MultiChannelTarget.js';
export { Param } from './core/Param.js';
export { ParamsGroup } from './core/ParamsGroup.js';
export { BatchBuffer } from './core/BatchBuffer.js';
export { BatchAttribute } from './core/BatchAttribute.js';
export { InstancedPostAttribute } from './core/InstancedPostAttribute.js';
export { InstancedFeedGraph } from './core/InstancedFeedGraph.js';
export { InstancedBatchBuffer } from './core/InstancedBatchBuffer.js';
export { StorageDriver } from './core/StorageDriver.js';

// Math
export * as MathUtils from './math/MathUtils.js';
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
	floorPowerOfTwo
} from './math/MathUtils.js';
