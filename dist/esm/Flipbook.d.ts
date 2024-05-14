import React from 'react';
export declare enum PageDirection {
    LEFT = 0,
    RIGHT = 1
}
export declare function Flipbook({ pageSize, pages, controls, controlsClassName, buttonClassName, pagesClassName, ellipsisClassName, onPageChange, }: {
    pageSize: {
        width: number;
        height: number;
    };
    pages: React.ReactNode[];
    controls?: boolean;
    controlsClassName?: string;
    buttonClassName?: string;
    pagesClassName?: string;
    ellipsisClassName?: string;
    onPageChange?: (pageWindowStart: number) => void;
}): React.JSX.Element;
