export declare function useInterpolatingValue(pageSize: {
    width: number;
    height: number;
}, initialValue: number): {
    value: number;
    to: (val: number, onInterpolationEnd?: () => void) => void;
    immediateTo: (val: number) => void;
};
