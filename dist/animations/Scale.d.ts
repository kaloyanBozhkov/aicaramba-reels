import Animation from './Animation';
import AnimationOptions from './AnimationOptions';
export interface ScaleOptions extends AnimationOptions {
    /**
     * The element will be proportionately scaled up or down by this factor.
     *
     * **Examples:**
     * - `1` means the element will stay the same size.
     * - `2` means the element will scale up to be twice as big.
     * - `0.5` means the element will scale down to be half as big.
     */
    by?: number;
    /** The element will be scaled up or down horizontally by this factor. */
    x?: number;
    /** The element will be scaled up or down vertically by this factor. */
    y?: number;
    /** The proportional scale factor that is used at the start of the animation. _Defaults to `1`._ */
    initial?: number;
    /** The x scale factor that is used at the start of the animation. _Defaults to the value of `initial`._ */
    initialX?: number;
    /** The y scale factor that is used at the start of the animation. _Defaults to the value of `initial`._ */
    initialY?: number;
}
/**
 * The `Scale` animation scales an element horizontally, vertically or both, using a `transform`.
 */
declare const Scale: (options: ScaleOptions) => Animation;
export default Scale;
//# sourceMappingURL=Scale.d.ts.map