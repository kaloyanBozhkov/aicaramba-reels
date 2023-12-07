import SmoothSpring from '../springs/SmoothSpring';
import interpolateAnimation from './AnimationInterpolation';
/**
 * The `Move` animation translates an element horizontally, vertically or both.
 */
const Move = (options) => {
    var _a;
    return {
        in: (_a = options.start) !== null && _a !== void 0 ? _a : 0,
        valuesAt: (frame, fps) => {
            const spring = SmoothSpring(frame, fps, options);
            const translateX = interpolateAnimation(spring, options.x, options.initialX);
            const translateY = interpolateAnimation(spring, options.y, options.initialY);
            return { translateX, translateY };
        },
    };
};
export default Move;
