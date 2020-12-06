/** @internal */
const enum Component {
  REAL = 1,
  IMAG = REAL << 1,
  ABS = IMAG << 1,
  ARG = ABS << 1,
  CARTESIAN = REAL | IMAG,
  POLAR = ABS | ARG,
  ALL = CARTESIAN | POLAR,
}

export default Component;
