import React from 'react';
import { PageDirection } from '../Flipbook';
export declare function Controls({ controlsPageNumbers, controlsClassName, buttonClassName, pagesClassName, ellipsisClassName, flip, flipTo, pageWindowStart, isFlipping, pages, }: {
    controlsPageNumbers: boolean;
    controlsClassName: string | undefined;
    buttonClassName: string | undefined;
    pagesClassName: string | undefined;
    ellipsisClassName: string | undefined;
    flip: (side: PageDirection) => void;
    flipTo: (index: number) => void;
    pageWindowStart: number;
    isFlipping: boolean;
    pages: React.ReactNode[];
}): React.JSX.Element;
