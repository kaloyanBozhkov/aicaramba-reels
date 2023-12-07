import { interpolate } from 'remotion';
const DEFAULT_DURATION_IN_FRAMES = 15;
/**
 * The `Fade` animation animates the opacity of an element.
 */
const Fade = (options) => {
    var _a, _b;
    const duration = (_a = options.duration) !== null && _a !== void 0 ? _a : DEFAULT_DURATION_IN_FRAMES;
    const start = (_b = options.start) !== null && _b !== void 0 ? _b : 0;
    return {
        in: start,
        valuesAt: (frame) => {
            var _a;
            const opacity = interpolate(frame, [start, start + duration], [(_a = options.initial) !== null && _a !== void 0 ? _a : 1, options.to]);
            return { opacity };
        },
    };
};
export default Fade;
