import React, {
    MouseEventHandler,
    createRef,
    useState,
} from 'react';
import { Page } from './components/Page';
import { FlippingPageRight } from './components/FlippingPageRight';
import { FlippingPageLeft } from './components/FlippingPageLeft';
import usePageWindow from './components/usePageWindow';
import useTransitionValue from './components/useTransitionValue';
import { Controls } from './components/Controls';

export enum PageDirection {
    LEFT,
    RIGHT,
}

export type ControlFunctions = {
    flipLeft: () => void;
    flipRight: () => void;
    flipToPage: (index: number) => void;
};

export function Flipbook({
    pageSize,
    pages,
    controls,
    controlsPageNumbers,
    controlsClassName,
    buttonClassName,
    pagesClassName,
    ellipsisClassName,
    onPageChange,
}: {
    pageSize: { width: number; height: number };
    pages: React.ReactNode[];
    controls?: boolean;
    controlsPageNumbers?: boolean;
    controlsClassName?: string;
    buttonClassName?: string;
    pagesClassName?: string;
    ellipsisClassName?: string;
    onPageChange?: (pageWindowStart: number) => void;
}) {
    const bookRef = createRef<HTMLDivElement>();
    const DELTA = 0.00001;
    const [isAnimating, setIsAnimating] = useState(false);

    const {
        value: leftDragX,
        start: interpolateLeftDragX,
        immediateTo: setLeftDragX,
    } = useTransitionValue(DELTA);
    const {
        value: leftDragY,
        start: interpolateLeftDragY,
        immediateTo: setLeftDragY,
    } = useTransitionValue(pageSize.height - DELTA);
    const {
        value: rightDragX,
        start: interpolateRightDragX,
        immediateTo: setRightDragX,
    } = useTransitionValue(pageSize.width * 2 - DELTA);
    const {
        value: rightDragY,
        start: interpolateRightDragY,
        immediateTo: setRightDragY,
    } = useTransitionValue(pageSize.height - DELTA);

    const [isFlipping, setIsFlipping] = useState(false);
    const [draggingSide, setDraggingSide] = useState<PageDirection | null>(
        null
    );

    const { pageWindowStart, incrementWindow, decrementWindow } = usePageWindow(
        pages.length + 2,
        (pageWindowStart: number) => {
            onPageChange && onPageChange(pageWindowStart);
        }
    );

    const paddedPages = [
        <div
            key="padding-left"
            style={{ width: pageSize.width, height: pageSize.height }}
        />,
        ...pages,
        <div
            key="padding-right"
            style={{ width: pageSize.width, height: pageSize.height }}
        />,
    ];

    const flip = (side: PageDirection, count = 1) => {
        if (isFlipping) return;

        if (count === 0) return;

        setIsFlipping(true);
        if (side === PageDirection.LEFT) {
            interpolateLeftDragX(pageSize.width * 2 - DELTA, {
                onDone: () => {
                    decrementWindow();
                    setIsFlipping(false);
                    immediateReset();
                    // console.log(count);
                    if (count > 0) {
                        flip(PageDirection.LEFT, count - 1);
                    }
                },
                duration: 500,
            });
            interpolateLeftDragY(pageSize.height - pageSize.height / 8, {
                onDone: () => {
                    interpolateLeftDragY(pageSize.height - DELTA, {
                        duration: 200,
                    });
                },
                duration: 100,
            });
        } else {
            interpolateRightDragX(DELTA, {
                onDone: () => {
                    incrementWindow();
                    setIsFlipping(false);
                    immediateReset();
                    // console.log(count);
                    if (count > 0) {
                        flip(PageDirection.RIGHT, count - 1);
                    }
                },
                duration: 500,
            });
            interpolateRightDragY(pageSize.height - pageSize.height / 8, {
                onDone: () => {
                    interpolateRightDragY(pageSize.height - DELTA, {
                        duration: 200,
                    });
                },
                duration: 100,
            });
        }
    };

    const flipTo = (index: number) => {
        const indexPageWindowStart = index % 2 ? index - 3 : index - 2;

        flip(
            indexPageWindowStart > pageWindowStart
                ? PageDirection.RIGHT
                : PageDirection.LEFT,
            Math.abs(indexPageWindowStart - pageWindowStart) / 2
        );
    };

    const reset = () => {
        bookRef.current!.style.cursor = 'default';
        interpolateLeftDragX(DELTA);
        interpolateLeftDragY(pageSize.height - DELTA);
        interpolateRightDragX(pageSize.width * 2 - DELTA);
        interpolateRightDragY(pageSize.height - DELTA);
    };

    const immediateReset = () => {
        setLeftDragX(DELTA);
        setLeftDragY(pageSize.height - DELTA);
        setRightDragX(pageSize.width * 2 - DELTA);
        setRightDragY(pageSize.height - DELTA);
    };

    const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
        if (isFlipping || !bookRef.current || isAnimating) return;

        const { x, y } = bookRef.current!.getBoundingClientRect();
        const realX = e.clientX - x;
        const realY = pageSize.height - (e.clientY - y);

        if (draggingSide === null) {
            if (realX < pageSize.width / 8 && realY < pageSize.height / 8) {
                interpolateLeftDragX(pageSize.width / 10);
                interpolateLeftDragY(pageSize.height - pageSize.width / 16);
                bookRef.current.style.cursor = 'grab';
                setIsAnimating(true);
                setTimeout(() => {
                    setIsAnimating(false);
                }, 100);
            } else if (
                realX > pageSize.width * 2 - pageSize.width / 8 &&
                realY < pageSize.height / 8
            ) {
                interpolateRightDragX(pageSize.width * 2 - pageSize.width / 10);
                interpolateRightDragY(pageSize.height - pageSize.width / 16);
                bookRef.current.style.cursor = 'grab';
                setIsAnimating(true);
                setTimeout(() => {
                    setIsAnimating(false);
                }, 100);
            } else {
                reset();
                setIsAnimating(true);
                setTimeout(() => {
                    setIsAnimating(false);
                }, 100);
            }
        } else {
            if (e.buttons !== 1) {
                setDraggingSide(null);
                reset();
                return;
            }
            bookRef.current.style.cursor = 'grabbing';

            if (draggingSide === PageDirection.LEFT) {
                setLeftDragX(e.clientX - x);
                setLeftDragY(e.clientY - y);
            } else {
                setRightDragX(e.clientX - x);
                setRightDragY(e.clientY - y);
            }
        }
    };

    const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
        if (isFlipping || !bookRef.current) return;
        const { x, y } = bookRef.current!.getBoundingClientRect();
        const realX = e.clientX - x;
        const realY = pageSize.height - (e.clientY - y);

        if (realX < pageSize.width / 4 && realY < pageSize.height / 4) {
            setDraggingSide(PageDirection.LEFT);
        } else if (
            realX > pageSize.width * 2 * (3 / 4) &&
            realY < pageSize.height / 4
        ) {
            setDraggingSide(PageDirection.RIGHT);
        } else {
            setDraggingSide(null);
        }
    };

    const handleMouseUp = () => {
        if (isFlipping) return;
        if (
            draggingSide === PageDirection.LEFT &&
            leftDragX > pageSize.width / 2
        ) {
            flip(PageDirection.LEFT);
        } else if (
            draggingSide === PageDirection.RIGHT &&
            rightDragX < (pageSize.width * 3) / 2
        ) {
            flip(PageDirection.RIGHT);
        } else {
            reset();
        }
        setDraggingSide(null);
    };

    const [xTranslationLeft, setXTranslationLeft] = useState(0);
    const [xTranslationRight, setXTranslationRight] = useState(0);

    return (
        <>
            {controls && (
                <Controls
                    controlsPageNumbers={controlsPageNumbers || false}
                    controlsClassName={controlsClassName}
                    buttonClassName={buttonClassName}
                    pagesClassName={pagesClassName}
                    ellipsisClassName={ellipsisClassName}
                    flip={flip}
                    flipTo={flipTo}
                    pageWindowStart={pageWindowStart}
                    isFlipping={isFlipping}
                    pages={pages}
                />
            )}
            <div
                style={{
                    width: pageSize.width * 2,
                    height: pageSize.height,
                    transform:
                        pageWindowStart === -2
                            ? `translateX(${xTranslationRight}px)`
                            : pageWindowStart === 0
                            ? `translateX(${xTranslationLeft}px)`
                            : pageWindowStart === pages.length - 4
                            ? `translateX(${
                                  pageSize.width / 2 + xTranslationRight
                              }px)`
                            : pageWindowStart === pages.length - 2
                            ? `translateX(${
                                  pageSize.width / 2 + xTranslationLeft
                              }px)`
                            : `none`,
                }}
                ref={bookRef}
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
            >
                <Page
                    {...pageSize}
                    side="left"
                    invisible={pageWindowStart <= 0}
                >
                    {paddedPages[pageWindowStart]}
                </Page>
                <FlippingPageLeft
                    pageSize={pageSize}
                    dragX={leftDragX}
                    dragY={leftDragY}
                    rightPageChildren={paddedPages[pageWindowStart + 1]}
                    leftPageChildren={paddedPages[pageWindowStart + 2]}
                    invisible={pageWindowStart <= -2}
                    setXTranslation={setXTranslationLeft}
                />
                <FlippingPageRight
                    pageSize={pageSize}
                    dragX={rightDragX}
                    dragY={rightDragY}
                    rightPageChildren={paddedPages[pageWindowStart + 3]}
                    leftPageChildren={paddedPages[pageWindowStart + 4]}
                    invisible={pageWindowStart >= pages.length - 2}
                    setXTranslation={setXTranslationRight}
                />
                <Page
                    {...pageSize}
                    side="right"
                    invisible={pageWindowStart >= pages.length - 4}
                >
                    {paddedPages[pageWindowStart + 5]}
                </Page>
            </div>
        </>
    );
}
