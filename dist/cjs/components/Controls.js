"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controls = void 0;
const react_1 = __importDefault(require("react"));
const Flipbook_1 = require("../Flipbook");
function Controls({ controlsClassName, buttonClassName, pagesClassName, ellipsisClassName, flip, flipTo, pageWindowStart, isFlipping, pages, }) {
    return (react_1.default.createElement("div", { className: controlsClassName, style: controlsClassName
            ? {}
            : {
                position: 'absolute',
                top: '20px',
                left: '20px',
                display: 'flex',
                gap: '8px',
            } },
        react_1.default.createElement("button", { onClick: () => flip(Flipbook_1.PageDirection.LEFT), disabled: pageWindowStart <= -2 || isFlipping, className: buttonClassName }, `<-`),
        react_1.default.createElement("div", { className: pagesClassName },
            pageWindowStart > 0 && (react_1.default.createElement("p", { className: ellipsisClassName }, "...")),
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
                .map((i) => (react_1.default.createElement("button", { key: i, onClick: () => flipTo(i + 1), disabled: isFlipping }, i + 1))),
            pageWindowStart <= pages.length - 5 && (react_1.default.createElement("p", { className: ellipsisClassName }, "..."))),
        react_1.default.createElement("button", { onClick: () => flip(Flipbook_1.PageDirection.RIGHT), disabled: pageWindowStart >= pages.length - 2 || isFlipping, className: buttonClassName }, `->`)));
}
exports.Controls = Controls;
//# sourceMappingURL=Controls.js.map