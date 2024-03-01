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
    interactive?: boolean;
};

export function Page({
    children,
    width,
    height,
    side,
    angle,
    clipPath,
    marginLeft,
    transformOrigin,
    zIndex,
    invisible,
    interactive,
}: PageProps) {
    return (
        <div
            style={{
                position: 'absolute',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: width,
                height: height,
                backgroundColor: 'gray',
                marginLeft: marginLeft
                    ? marginLeft
                    : side === 'left'
                    ? 0
                    : width,
                transform: `rotateZ(${angle}deg)`,
                clipPath: clipPath,
                transformOrigin: transformOrigin,
                zIndex: zIndex || 0,
                boxShadow: `inset ${
                    side === 'left' ? '-' : ''
                }5px 0px 35px 0 rgb(36 10 3 / 50%)`,
                border: '1px solid black',
                visibility: invisible ? 'hidden' : 'visible',
            }}
            data-interactive={interactive}
        >
            {children}
        </div>
    );
}
