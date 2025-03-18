import ScreenDimensions from './dimensions';

const WIDTH = ScreenDimensions.width;
const X = (x) => {
  return WIDTH * x;
};

const TEXT = {
  // HP KECIL :  HP GEDE  : HP SEDENG

  xxs: WIDTH < 400 ? X(0.02) : WIDTH >= 600 ? X(0.017) : X(0.024),
  xs: WIDTH < 400 ? X(0.025) : WIDTH >= 600 ? X(0.02) : X(0.028),

  xsm: WIDTH < 400 ? X(0.025) : WIDTH >= 600 ? X(0.025) : X(0.032),

  sm: WIDTH < 400 ? X(0.03) : WIDTH >= 600 ? X(0.024) : X(0.037),

  md: WIDTH < 400 ? X(0.04) : WIDTH >= 600 ? X(0.033) : X(0.044),
  lg: WIDTH < 400 ? X(0.045) : WIDTH >= 600 ? X(0.035) : X(0.05),
  xl: WIDTH < 600 ? X(0.06) : X(0.045),
};

export default TEXT;
