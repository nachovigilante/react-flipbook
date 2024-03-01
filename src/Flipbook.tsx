import React, { MouseEventHandler, createRef, useState } from 'react';
import { Page } from './components/Page';
import { FlippingPageRight } from './components/FlippingPageRight';
import { FlippingPageLeft } from './components/FlippingPageLeft';
import usePageWindow from './components/usePageWindow';
import { useInterpolatingValue } from './components/useInterpolatingValue';

export enum PageDirection {
    LEFT,
    RIGHT,
}

export function Flipbook({
    pageSize,
    pages,
}: {
    pageSize: { width: number; height: number };
    pages: React.ReactNode[];
}) {
    const bookRef = createRef<HTMLDivElement>();
    const DELTA = 0.00001;

    const {
        value: leftDragX,
        immediateTo: setLeftDragX,
        to: interpolateLeftDragX,
    } = useInterpolatingValue(pageSize, DELTA);

    const {
        value: leftDragY,
        immediateTo: setLeftDragY,
        to: interpolateLeftDragY,
    } = useInterpolatingValue(pageSize, pageSize.height - DELTA);

    const {
        value: rightDragX,
        immediateTo: setRightDragX,
        to: interpolateRightDragX,
    } = useInterpolatingValue(pageSize, pageSize.width * 2 - DELTA);

    const {
        value: rightDragY,
        immediateTo: setRightDragY,
        to: interpolateRightDragY,
    } = useInterpolatingValue(pageSize, pageSize.height - DELTA);

    const [isFlipping, setIsFlipping] = useState(false);
    const [draggingSide, setDraggingSide] = useState<PageDirection | null>(
        null
    );

    const { pageWindowStart, incrementWindow, decrementWindow } = usePageWindow(
        pages.length + 2
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

    const flip = (side: PageDirection) => {
        // console.log('flip');
        bookRef.current!.style.cursor = 'default';

        setIsFlipping(true);
        if (side === PageDirection.LEFT) {
            interpolateLeftDragX(
                pageSize.width * 2 - DELTA,
                () => {
                    decrementWindow();
                    setIsFlipping(false);
                },
                true
            );
            interpolateLeftDragY(pageSize.height - DELTA);
        } else {
            interpolateRightDragX(
                DELTA,
                () => {
                    incrementWindow();
                    setIsFlipping(false);
                },
                true
            );
            interpolateRightDragY(pageSize.height - DELTA);
        }
    };

    const reset = () => {
        bookRef.current!.style.cursor = 'default';
        interpolateLeftDragX(DELTA);
        interpolateLeftDragY(pageSize.height - DELTA);
        interpolateRightDragX(pageSize.width * 2 - DELTA);
        interpolateRightDragY(pageSize.height - DELTA);
    };

    // const immediateReset = () => {
    //     setLeftDragX(DELTA);
    //     setLeftDragY(pageSize.height - DELTA);
    //     setRightDragX(pageSize.width * 2 - DELTA);
    //     setRightDragY(pageSize.height - DELTA);
    // };

    const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
        if (isFlipping || !bookRef.current) return;

        const { x, y } = bookRef.current!.getBoundingClientRect();
        const realX = e.clientX - x;
        const realY = pageSize.height - (e.clientY - y);

        if (draggingSide === null) {
            if (realX < pageSize.width / 8 && realY < pageSize.height / 8) {
                interpolateLeftDragX(pageSize.width / 10);
                interpolateLeftDragY(pageSize.height - pageSize.width / 16);
                bookRef.current.style.cursor = 'grab';
            } else if (
                realX > pageSize.width * 2 - pageSize.width / 8 &&
                realY < pageSize.height / 8
            ) {
                interpolateRightDragX(pageSize.width * 2 - pageSize.width / 10);
                interpolateRightDragY(pageSize.height - pageSize.width / 16);
                bookRef.current.style.cursor = 'grab';
            } else {
                reset();
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

    return (
        <>
            {/* <div
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    display: 'flex',
                    gap: '8px',
                }}
            >
                <button
                    onClick={() => flip(PageDirection.LEFT)}
                    disabled={pageWindowStart <= -2 || isFlipping}
                >{`<-`}</button>
                <button
                    onClick={() => flip(PageDirection.RIGHT)}
                    disabled={pageWindowStart >= pages.length - 2 || isFlipping}
                >
                    {`->`}
                </button>
            </div> */}
            <div
                style={{
                    width: pageSize.width * 2,
                    height: pageSize.height,
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
                />
                <FlippingPageRight
                    pageSize={pageSize}
                    dragX={rightDragX}
                    dragY={rightDragY}
                    rightPageChildren={paddedPages[pageWindowStart + 3]}
                    leftPageChildren={paddedPages[pageWindowStart + 4]}
                    invisible={pageWindowStart >= pages.length - 2}
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
