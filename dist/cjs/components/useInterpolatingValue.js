"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInterpolatingValue = void 0;
const react_1 = require("react");
const util_1 = require("../utils/util");
function useInterpolatingValue(pageSize, initialValue) {
    const [value, setValue] = (0, react_1.useState)(initialValue);
    const to = (val, onInterpolationEnd) => {
        const step = (0, util_1.clamp)((Math.abs(val - value) / pageSize.width) * 0.05, 0, 0.05);
        const interval = setInterval(() => {
            if (value < val) {
                setValue((prev) => {
                    // console.log(prev, val);
                    if (prev >= val - pageSize.width * step * 1.2) {
                        clearInterval(interval);
                        onInterpolationEnd && onInterpolationEnd();
                        return val;
                    }
                    return prev + pageSize.width * step;
                });
            }
            else {
                setValue((prev) => {
                    // console.log(prev, val);
                    if (prev <= val + pageSize.width * step * 1.2) {
                        clearInterval(interval);
                        onInterpolationEnd && onInterpolationEnd();
                        return val;
                    }
                    return prev - pageSize.width * step;
                });
            }
        }, 10);
    };
    const immediateTo = (val) => {
        setValue(val);
    };
    return { value, to, immediateTo };
}
exports.useInterpolatingValue = useInterpolatingValue;
//# sourceMappingURL=useInterpolatingValue.js.map