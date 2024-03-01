type useTransitionOptions = {
    from: number;
    to: number;
    duration: number;
    autoStart: boolean;
    easing: Function;
    onDone: () => {};
    onStep: () => {};
};
declare const useTransitionValue: (from?: number, options?: Partial<useTransitionOptions>) => {
    value: number;
    start: (to?: number, { from, duration, easing, onDone, onStep, }?: {
        from?: number | undefined;
        duration?: number | undefined;
        easing?: Function | undefined;
        onDone?: (() => void) | undefined;
        onStep?: (() => void) | undefined;
    }) => void;
    controls: {
        pause: () => void;
        resume: (options: Partial<useTransitionOptions>) => void;
    };
    immediateTo: (to: number) => void;
};
export default useTransitionValue;
export { useTransitionValue };
