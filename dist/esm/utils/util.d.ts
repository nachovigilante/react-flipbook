export declare const clamp: (num: number, min: number, max: number) => number;
export declare const calculateFlipping: (pageSize: {
    width: number;
    height: number;
}, draggingPosition: {
    x: number;
    y: number;
}) => {
    foldedLength: number;
    foldedHeight: number;
    topFoldedLength: number;
    virtualCorner: {
        x: number;
        y: number;
    };
    correctedAngle: number;
};
