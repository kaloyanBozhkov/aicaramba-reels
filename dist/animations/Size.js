import SmoothSpring from '../springs/SmoothSpring';
import interpolateAnimation from './AnimationInterpolation';
/**
 * The `Size` animation changes the width or height of an element.
 */
const Size = (options) => {
    var _a;
    return {
        in: (_a = options.start) !== null && _a !== void 0 ? _a : 0,
        valuesAt: (frame, fps) => {
            const values = {};
            const spring = SmoothSpring(frame, fps, options);
            if (options.width)
                values.width = interpolateAnimation(spring, options.width, options.initialWidth);
            if (options.height)
                values.height = interpolateAnimation(spring, options.height, options.initialHeight);
            return values;
        },
    };
};
export default Size;
