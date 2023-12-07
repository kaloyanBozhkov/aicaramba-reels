const value = (currentValue, defaultValue) => currentValue === undefined ? defaultValue : currentValue.toFixed(4);
const transformStyles = (values) => {
    let translate;
    let scale;
    let rotate;
    if (values.translateX || values.translateY)
        translate = `translate(${value(values.translateX, 0)}px, ${value(values.translateY, 0)}px)`;
    // We need to specifically check for undefined here, because 0 is a valid,
    // and more importantly non-default(!) scale value.
    if (values.scaleX !== undefined || values.scaleY !== undefined)
        scale = `scale(${value(values.scaleX, 1)}, ${value(values.scaleY, 1)})`;
    if (values.rotate)
        rotate = `rotate(${value(values.rotate, 0)}deg)`;
    if (!translate && !scale && !rotate) {
        return null;
    }
    let transform = '';
    if (translate)
        transform += translate;
    if (scale)
        transform += ` ${scale}`;
    if (rotate)
        transform += ` ${rotate}`;
    return transform.trim();
};
export default transformStyles;
