import { useState } from 'react';
import { clamp } from '../utils/util';
export function useInterpolatingValue(pageSize, initialValue) {
    const [value, setValue] = useState(initialValue);
    const to = (val, onInterpolationEnd) => {
        const step = clamp((Math.abs(val - value) / pageSize.width) * 0.05, 0, 0.05);
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
//# sourceMappingURL=useInterpolatingValue.js.map