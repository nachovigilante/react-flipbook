import React from 'react';
export declare enum PageDirection {
    LEFT = 0,
    RIGHT = 1
}
export declare function Flipbook({ pageSize, pages, }: {
    pageSize: {
        width: number;
        height: number;
    };
    pages: React.ReactNode[];
    flipSpeed?: number;
}): React.JSX.Element;
