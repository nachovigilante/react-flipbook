import React from 'react';
import { PageDirection } from '../Flipbook';

export function Controls({
    controlsClassName,
    flip,
    flipTo,
    pageWindowStart,
    isFlipping,
    pages,
}: {
    controlsClassName: string | undefined;
    flip: (side: PageDirection) => void;
    flipTo: (index: number) => void;
    pageWindowStart: number;
    isFlipping: boolean;
    pages: React.ReactNode[];
}) {
    return (
        <div
            className={controlsClassName}
            style={
                controlsClassName
                    ? {}
                    : {
                          position: 'absolute',
                          top: '20px',
                          left: '20px',
                          display: 'flex',
                          gap: '8px',
                      }
            }
        >
            <button
                onClick={() => flip(PageDirection.LEFT)}
                disabled={pageWindowStart <= -2 || isFlipping}
            >{`<-`}</button>
            {pages.map((_, i) => (
                <button
                    key={i}
                    onClick={() => flipTo(i + 1)}
                    disabled={isFlipping}
                >
                    {i + 1}
                </button>
            ))}
            <button
                onClick={() => flip(PageDirection.RIGHT)}
                disabled={pageWindowStart >= pages.length - 2 || isFlipping}
            >
                {`->`}
            </button>
        </div>
    );
}
