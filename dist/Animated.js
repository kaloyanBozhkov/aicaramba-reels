import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import reduceComputedValues from './reducer/AnimationReducer';
import stylesFromValues from './styles/AnimatedStyles';
const animatedStylesFromAnimations = (animations, currentFrame, fps) => {
    const currentAnimations = animations.filter((animation) => animation.in <= currentFrame);
    const computedValues = currentAnimations.map((animation) => { var _a; return (_a = animation.valuesAt(currentFrame, fps)) !== null && _a !== void 0 ? _a : {}; });
    const animatedValues = reduceComputedValues(computedValues);
    return stylesFromValues(animatedValues);
};
/**
 * The `Animated` component renders a container that can be animated.
 */
const Animated = (props) => {
    var _a;
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const animationFrame = frame - ((_a = props.delay) !== null && _a !== void 0 ? _a : 0);
    const animatedStyles = useMemo(() => animatedStylesFromAnimations(props.animations, animationFrame, fps), [animationFrame, fps, props.animations]);
    const isBeforeInPoint = props.in && frame < props.in;
    const isAfterOutPoint = props.out && frame > props.out;
    if (isBeforeInPoint || isAfterOutPoint) {
        return null;
    }
    return (_jsx("div", { className: props.className, style: Object.assign(Object.assign(Object.assign({}, props.style), animatedStyles), { position: props.absolute ? 'absolute' : undefined }), children: props.children }));
};
export default Animated;
