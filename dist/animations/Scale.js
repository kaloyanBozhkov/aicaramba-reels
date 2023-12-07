import SmoothSpring from '../springs/SmoothSpring';
import interpolateAnimation from './AnimationInterpolation';
/**
 * The `Scale` animation scales an element horizontally, vertically or both, using a `transform`.
 */
const Scale = (options) => {
    var _a;
    return {
        in: (_a = options.start) !== null && _a !== void 0 ? _a : 0,
        valuesAt: (frame, fps) => {
            var _a, _b, _c, _d, _e;
            const spring = SmoothSpring(frame, fps, options);
            const initial = (_a = options.initial) !== null && _a !== void 0 ? _a : 1;
            const initialX = (_b = options.initialX) !== null && _b !== void 0 ? _b : initial;
            const initialY = (_c = options.initialY) !== null && _c !== void 0 ? _c : initial;
            const scaleX = interpolateAnimation(spring, (_d = options.x) !== null && _d !== void 0 ? _d : options.by, initialX);
            const scaleY = interpolateAnimation(spring, (_e = options.y) !== null && _e !== void 0 ? _e : options.by, initialY);
            return { scaleX, scaleY };
        },
    };
};
export default Scale;
