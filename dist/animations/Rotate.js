import SmoothSpring from '../springs/SmoothSpring';
import interpolateAnimation from './AnimationInterpolation';
/**
 * The `Rotate` animation rotates an element along the Z-axis.
 */
const Rotate = (options) => {
    var _a;
    return {
        in: (_a = options.start) !== null && _a !== void 0 ? _a : 0,
        valuesAt: (frame, fps) => {
            var _a;
            const spring = SmoothSpring(frame, fps, options);
            const initial = (_a = options.initial) !== null && _a !== void 0 ? _a : 1;
            const rotate = interpolateAnimation(spring, options.degrees, initial);
            return { rotate };
        },
    };
};
export default Rotate;
