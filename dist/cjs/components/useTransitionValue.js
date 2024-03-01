"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTransitionValue = void 0;
const react_1 = require("react");
function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}
const useTransitionValue = (from = 0, options // options are ... optional
) => {
    const settings = Object.assign({
        // default options
        from,
        to: 100,
        duration: 200,
        autoStart: false,
        easing: easeOutExpo,
        onDone: () => { },
        onStep: () => { },
    }, options);
    const [value, setValue] = (0, react_1.useState)(settings.from);
    const animationFrame = (0, react_1.useRef)();
    const startTime = (0, react_1.useRef)();
    const currentValue = (0, react_1.useRef)(from);
    const currentTo = (0, react_1.useRef)(settings.to);
    const start = (0, react_1.useCallback)((to = settings.to, { 
    // allow override of intial options
    from = currentValue.current, duration = settings.duration, easing = settings.easing, onDone = () => { }, onStep = () => { }, } = {}) => {
        if (typeof to !== 'number') {
            throw new Error("please supply a 'to' value");
        }
        const loop = () => {
            animationFrame.current = requestAnimationFrame(onFrame);
        };
        const onFrame = () => {
            // time elapsed since start of transition
            const elapsed = Date.now() - startTime.current;
            // total distance between start and target value
            const distance = to - from;
            // distance traveled so far between start and target value
            const traveled = (distance / duration) * elapsed;
            // percentage traveled so far
            const percentage = (100 / distance) * traveled;
            // factor (between 0 - 1) traveled so far
            const factor = percentage / 100;
            // elapsed may be greater than duration which can happen if animationFrame/loop 'overshoots' duration time (it fires async after all)
            const isFinished = elapsed >= duration;
            const newEasedValue = isFinished
                ? to
                : from + easing(factor) * distance;
            currentValue.current = newEasedValue;
            setValue(newEasedValue);
            currentTo.current = to;
            settings.onStep();
            onStep();
            if (isFinished) {
                settings.onDone();
                onDone();
            }
            else {
                loop();
            }
        };
        if (animationFrame.current)
            cancelAnimationFrame(animationFrame.current);
        // dont start loop if allready at target value (would cause distance equaling 0 and by 0 division error)
        if (from === to)
            return;
        startTime.current = Date.now();
        loop();
    }, [
        settings.duration,
        settings.easing,
        settings.onDone,
        settings.onStep,
        settings.to,
    ]);
    // const pauseTime = useRef<number>()
    const pause = (0, react_1.useCallback)(() => {
        if (animationFrame.current) {
            // pauseTime.current = Date.now()
            cancelAnimationFrame(animationFrame.current);
        }
    }, []);
    const resume = (0, react_1.useCallback)((options) => {
        // if (pauseTime.current && startTime.current) {
        // const restDuration = pauseTime.current - startTime.current
        start(currentTo.current, options);
        // }
    }, []);
    const immediateTo = (0, react_1.useCallback)((to) => {
        if (animationFrame.current) {
            cancelAnimationFrame(animationFrame.current);
        }
        currentValue.current = to;
        setValue(to);
    }, [setValue]);
    (0, react_1.useEffect)(() => {
        if (settings.autoStart) {
            start();
        }
    }, [settings.autoStart]);
    (0, react_1.useEffect)(() => {
        return () => {
            // TODO: fix animationFrame.current! wokraround
            cancelAnimationFrame(animationFrame.current);
        };
    }, []);
    return { value, start, controls: { pause, resume }, immediateTo };
};
exports.useTransitionValue = useTransitionValue;
exports.default = useTransitionValue;
//# sourceMappingURL=useTransitionValue.js.map