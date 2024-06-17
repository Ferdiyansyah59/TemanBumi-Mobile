import ScreenDimensions from './dimensions';

const WIDTH = ScreenDimensions.width;
const X = (x) => {
  return WIDTH * x;
};

const TEXT = {
  xxs: WIDTH < 600 ? X(0.024) : X(0.028),
  xs: WIDTH < 600 ? X(0.028) : X(0.025),

  xsm: WIDTH < 400 ? X(0.03) : WIDTH >= 600 ? X(0.029) : X(0.031),

  sm: WIDTH < 400 ? X(0.034) : WIDTH >= 600 ? X(0.027) : X(0.037),
  md: WIDTH < 400 ? X(0.04) : WIDTH >= 600 ? X(0.037) : X(0.044),
  lg: WIDTH < 400 ? X(0.05) : WIDTH >= 600 ? X(0.04) : X(0.05),
  xl: WIDTH < 600 ? X(0.06) : X(0.045),
};

export default TEXT;
