import Complex from '../complex';
import { Component } from '../internal';

const norm = (z: Complex): number => {
  if (z._has & Component.ABS) {
    return z._abs * z._abs;
  }

  return z._real * z._real + z._imag * z._imag;
};

export default norm;
