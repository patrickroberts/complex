import Complex from '../complex';

const realpart = ({ real }: Complex) => (Object.is(real, -0) ? '-0' : `${real}`);
const imagpart = ({ imag }: Complex) => ((imag || 1 / imag) < 0 ? `-${-imag}` : `+${imag}`);

const toString = (z: Complex): string => `${realpart(z)}${imagpart(z)}*i`;

export default toString;
