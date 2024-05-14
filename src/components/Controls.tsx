import React from 'react';
import { PageDirection } from '../Flipbook';

export function Controls({
    controlsPageNumbers,
    controlsClassName,
    buttonClassName,
    pagesClassName,
    ellipsisClassName,
    flip,
    flipTo,
    pageWindowStart,
    isFlipping,
    pages,
}: {
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
                className={buttonClassName}
            >
                {!buttonClassName && `<-`}
            </button>
            {controlsPageNumbers && (
                <div className={pagesClassName}>
                    {pageWindowStart > 0 && (
                        <p className={ellipsisClassName}>...</p>
                    )}
                    {pages
                        .map((_, i) => i)
                        .filter((i) => {
                            if (pageWindowStart <= 0) return i < 5;
                            if (pageWindowStart >= pages.length - 5)
                                return i >= pages.length - 5;
                            return (
                                i + 1 >= pageWindowStart &&
                                i + 1 <= pageWindowStart + 4
                            );
                        })
                        .map((i) => (
                            <button
                                key={i}
                                onClick={() => flipTo(i + 1)}
                                disabled={isFlipping}
                            >
                                {i + 1}
                            </button>
                        ))}
                    {pageWindowStart <= pages.length - 5 && (
                        <p className={ellipsisClassName}>...</p>
                    )}
                </div>
            )}
            <button
                onClick={() => flip(PageDirection.RIGHT)}
                disabled={pageWindowStart >= pages.length - 2 || isFlipping}
                className={buttonClassName + 'transform rotate-180'}
            >
                {!buttonClassName && `->`}
            </button>
        </div>
    );
}
