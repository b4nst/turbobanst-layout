'use strict';

const { uncurryThis } = require('internal/util');

const TypedArrayPrototype = Object.getPrototypeOf(Uint8Array.prototype);

const TypedArrayProto_toStringTag =
    uncurryThis(
      Object.getOwnPropertyDescriptor(TypedArrayPrototype,
                                      Symbol.toStringTag).get);

// Cached to make sure no userland code can tamper with it.
const isArrayBufferView = ArrayBuffer.isView;

function isTypedArray(value) {
  return TypedArrayProto_toStringTag(value) !== undefined;
}

function isUint8Array(value) {
  return TypedArrayProto_toStringTag(value) === 'Uint8Array';
}

function isUint8ClampedArray(value) {
  return TypedArrayProto_toStringTag(value) === 'Uint8ClampedArray';
}

function isUint16Array(value) {
  return TypedArrayProto_toStringTag(value) === 'Uint16Array';
}

function isUint32Array(value) {
  return TypedArrayProto_toStringTag(value) === 'Uint32Array';
}

function isInt8Array(value) {
  return TypedArrayProto_toStringTag(value) === 'Int8Array';
}

function isInt16Array(value) {
  return TypedArrayProto_toStringTag(value) === 'Int16Array';
}

function isInt32Array(value) {
  return TypedArrayProto_toStringTag(value) === 'Int32Array';
}

function isFloat32Array(value) {
  return TypedArrayProto_toStringTag(value) === 'Float32Array';
}

function isFloat64Array(value) {
  return TypedArrayProto_toStringTag(value) === 'Float64Array';
}

function isBigInt64Array(value) {
  return TypedArrayProto_toStringTag(value) === 'BigInt64Array';
}

function isBigUint64Array(value) {
  return TypedArrayProto_toStringTag(value) === 'BigUint64Array';
}

module.exports = {
  ...internalBinding('types'),
  isArrayBufferView,
  isTypedArray,
  isUint8Array,
  isUint8ClampedArray,
  isUint16Array,
  isUint32Array,
  isInt8Array,
  isInt16Array,
  isInt32Array,
  isFloat32Array,
  isFloat64Array,
  isBigInt64Array,
  isBigUint64Array
};