import React from 'react';
export declare function FlippingPageRight({ pageSize, dragX, dragY, leftPageChildren, rightPageChildren, invisible, }: {
    pageSize: {
        width: number;
        height: number;
    };
    dragX: number;
    dragY: number;
    leftPageChildren: React.ReactNode;
    rightPageChildren: React.ReactNode;
    invisible?: boolean;
}): React.JSX.Element;
