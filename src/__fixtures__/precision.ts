export default (x: number): number => 14 - Math.floor(Math.log10(Math.abs(x || 0.1)));
