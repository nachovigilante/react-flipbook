import React from 'react';
export function Page({ children, width, height, side, angle, clipPath, marginLeft, transformOrigin, zIndex, invisible, }) {
    return (React.createElement("div", { style: {
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
            boxShadow: `inset ${side === 'left' ? '-' : ''}5px 0px 35px 0 rgb(36 10 3 / 50%)`,
            visibility: invisible ? 'hidden' : 'visible',
        } }, children));
}
//# sourceMappingURL=Page.js.map