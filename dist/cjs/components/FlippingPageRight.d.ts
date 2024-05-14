import React, { Dispatch, SetStateAction } from 'react';
export declare function FlippingPageRight({ pageSize, dragX, dragY, leftPageChildren, rightPageChildren, invisible, setXTranslation, }: {
    pageSize: {
        width: number;
        height: number;
    };
    dragX: number;
    dragY: number;
    leftPageChildren: React.ReactNode;
    rightPageChildren: React.ReactNode;
    invisible?: boolean;
    setXTranslation: Dispatch<SetStateAction<number>>;
}): React.JSX.Element;
