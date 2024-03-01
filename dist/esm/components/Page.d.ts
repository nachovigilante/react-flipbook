import React from 'react';
type PageProps = {
    width: number;
    height: number;
    side: 'left' | 'right';
    children: React.ReactNode;
    angle?: number;
    clipPath?: string;
    marginLeft?: number;
    transformOrigin?: string;
    zIndex?: number;
    invisible?: boolean;
};
export declare function Page({ children, width, height, side, angle, clipPath, marginLeft, transformOrigin, zIndex, invisible, }: PageProps): React.JSX.Element;
export {};
