import React from 'react';
import { PageDirection } from '../Flipbook';
export function Controls({ controlsClassName, buttonClassName, pagesClassName, ellipsisClassName, flip, flipTo, pageWindowStart, isFlipping, pages, }) {
    return (React.createElement("div", { className: controlsClassName, style: controlsClassName
            ? {}
            : {
                position: 'absolute',
                top: '20px',
                left: '20px',
                display: 'flex',
                gap: '8px',
            } },
        React.createElement("button", { onClick: () => flip(PageDirection.LEFT), disabled: pageWindowStart <= -2 || isFlipping, className: buttonClassName }, `<-`),
        React.createElement("div", { className: pagesClassName },
            pageWindowStart > 0 && (React.createElement("p", { className: ellipsisClassName }, "...")),
            pages
                .map((_, i) => i)
                .filter((i) => {
                if (pageWindowStart <= 0)
                    return i < 5;
                if (pageWindowStart >= pages.length - 5)
                    return i >= pages.length - 5;
                return (i + 1 >= pageWindowStart &&
                    i + 1 <= pageWindowStart + 4);
            })
                .map((i) => (React.createElement("button", { key: i, onClick: () => flipTo(i + 1), disabled: isFlipping }, i + 1))),
            pageWindowStart <= pages.length - 5 && (React.createElement("p", { className: ellipsisClassName }, "..."))),
        React.createElement("button", { onClick: () => flip(PageDirection.RIGHT), disabled: pageWindowStart >= pages.length - 2 || isFlipping, className: buttonClassName }, `->`)));
}
//# sourceMappingURL=Controls.js.map