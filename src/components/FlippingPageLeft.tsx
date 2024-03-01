import React, { useEffect, useState } from 'react';
import { Page } from './Page';
import { calculateFlipping } from '../utils/util';

export function FlippingPageLeft({
    pageSize,
    dragX,
    dragY,
    leftPageChildren,
    rightPageChildren,
    invisible,
}: {
    pageSize: { width: number; height: number };
    dragX: number;
    dragY: number;
    leftPageChildren: React.ReactNode;
    rightPageChildren: React.ReactNode;
    invisible?: boolean;
}) {
    const [rightClipPath, setRightClipPath] = useState('');
    const [leftClipPath, setLeftClipPath] = useState('');

    const [correctedAngle, setCorrectedAngle] = useState(0);
    const [foldedLength, setFoldedLength] = useState(0);
    const [foldedHeight, setFoldedHeight] = useState(0);
    const [topFoldedLength, setTopFoldedLength] = useState(0);

    useEffect(() => {
        const { foldedLength, foldedHeight, topFoldedLength, correctedAngle } =
            calculateFlipping(pageSize, {
                x: dragX,
                y: dragY,
            });

        setFoldedLength(foldedLength);
        setFoldedHeight(foldedHeight);
        setTopFoldedLength(topFoldedLength);
        setCorrectedAngle(correctedAngle);
    }, [dragX, dragY, pageSize.width, pageSize.height]);

    useEffect(() => {
        setRightClipPath(
            `polygon(
                ${pageSize.width - topFoldedLength}px ${
                pageSize.height - foldedHeight
            }px,
                ${pageSize.width}px 0px,
                ${pageSize.width}px ${pageSize.height}px,
                ${pageSize.width - foldedLength}px ${pageSize.height}px
            )`
        );
        setLeftClipPath(
            `polygon(
                ${topFoldedLength}px 0px,
                ${pageSize.width}px 0px,
                ${pageSize.width}px ${pageSize.height}px,
                ${foldedLength}px ${pageSize.height}px,
                ${topFoldedLength}px ${pageSize.height - foldedHeight}px
            )`
        );
    }, [
        topFoldedLength,
        foldedHeight,
        pageSize.width,
        pageSize.height,
        foldedLength,
    ]);

    return (
        <>
            <Page
                {...pageSize}
                side="left"
                clipPath={leftClipPath}
                zIndex={1}
                invisible={invisible}
            >
                {leftPageChildren}
            </Page>
            <div
                style={{
                    position: 'absolute',
                    zIndex: 50,
                    filter: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))',
                }}
            >
                <Page
                    {...pageSize}
                    side="right"
                    clipPath={rightClipPath}
                    marginLeft={-pageSize.width + foldedLength * 2}
                    angle={correctedAngle}
                    transformOrigin={
                        pageSize.width -
                        foldedLength +
                        'px ' +
                        pageSize.height +
                        'px'
                    }
                    zIndex={2}
                    invisible={invisible}
                >
                    {rightPageChildren}
                </Page>
            </div>
        </>
    );
}
