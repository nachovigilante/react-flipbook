"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flipbook = exports.PageDirection = void 0;
const react_1 = __importStar(require("react"));
const Page_1 = require("./components/Page");
const FlippingPageRight_1 = require("./components/FlippingPageRight");
const FlippingPageLeft_1 = require("./components/FlippingPageLeft");
const usePageWindow_1 = __importDefault(require("./components/usePageWindow"));
const useTransitionValue_1 = __importDefault(require("./components/useTransitionValue"));
const Controls_1 = require("./components/Controls");
var PageDirection;
(function (PageDirection) {
    PageDirection[PageDirection["LEFT"] = 0] = "LEFT";
    PageDirection[PageDirection["RIGHT"] = 1] = "RIGHT";
})(PageDirection || (exports.PageDirection = PageDirection = {}));
function Flipbook({ pageSize, pages, controls, controlsPageNumbers, controlsClassName, buttonClassName, pagesClassName, ellipsisClassName, onPageChange, }) {
    const bookRef = (0, react_1.createRef)();
    const DELTA = 0.00001;
    const [isAnimating, setIsAnimating] = (0, react_1.useState)(false);
    const { value: leftDragX, start: interpolateLeftDragX, immediateTo: setLeftDragX, } = (0, useTransitionValue_1.default)(DELTA);
    const { value: leftDragY, start: interpolateLeftDragY, immediateTo: setLeftDragY, } = (0, useTransitionValue_1.default)(pageSize.height - DELTA);
    const { value: rightDragX, start: interpolateRightDragX, immediateTo: setRightDragX, } = (0, useTransitionValue_1.default)(pageSize.width * 2 - DELTA);
    const { value: rightDragY, start: interpolateRightDragY, immediateTo: setRightDragY, } = (0, useTransitionValue_1.default)(pageSize.height - DELTA);
    const [isFlipping, setIsFlipping] = (0, react_1.useState)(false);
    const [draggingSide, setDraggingSide] = (0, react_1.useState)(null);
    const { pageWindowStart, incrementWindow, decrementWindow } = (0, usePageWindow_1.default)(pages.length + 2, (pageWindowStart) => {
        onPageChange && onPageChange(pageWindowStart);
    });
    const paddedPages = [
        react_1.default.createElement("div", { key: "padding-left", style: { width: pageSize.width, height: pageSize.height } }),
        ...pages,
        react_1.default.createElement("div", { key: "padding-right", style: { width: pageSize.width, height: pageSize.height } }),
    ];
    const flip = (side, count = 1) => {
        // bookRef.current!.style.cursor = 'default';
        if (count === 0)
            return;
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
        }
        else {
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
    const flipTo = (index) => {
        const indexPageWindowStart = index % 2 ? index - 3 : index - 2;
        console.log(indexPageWindowStart, pageWindowStart, Math.abs(indexPageWindowStart - pageWindowStart) / 2);
        flip(indexPageWindowStart > pageWindowStart
            ? PageDirection.RIGHT
            : PageDirection.LEFT, Math.abs(indexPageWindowStart - pageWindowStart) / 2);
    };
    const reset = () => {
        bookRef.current.style.cursor = 'default';
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
    const handleMouseMove = (e) => {
        if (isFlipping || !bookRef.current || isAnimating)
            return;
        const { x, y } = bookRef.current.getBoundingClientRect();
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
            }
            else if (realX > pageSize.width * 2 - pageSize.width / 8 &&
                realY < pageSize.height / 8) {
                interpolateRightDragX(pageSize.width * 2 - pageSize.width / 10);
                interpolateRightDragY(pageSize.height - pageSize.width / 16);
                bookRef.current.style.cursor = 'grab';
                setIsAnimating(true);
                setTimeout(() => {
                    setIsAnimating(false);
                }, 100);
            }
            else {
                reset();
                setIsAnimating(true);
                setTimeout(() => {
                    setIsAnimating(false);
                }, 100);
            }
        }
        else {
            if (e.buttons !== 1) {
                setDraggingSide(null);
                reset();
                return;
            }
            bookRef.current.style.cursor = 'grabbing';
            if (draggingSide === PageDirection.LEFT) {
                setLeftDragX(e.clientX - x);
                setLeftDragY(e.clientY - y);
            }
            else {
                setRightDragX(e.clientX - x);
                setRightDragY(e.clientY - y);
            }
        }
    };
    const handleMouseDown = (e) => {
        if (isFlipping || !bookRef.current)
            return;
        const { x, y } = bookRef.current.getBoundingClientRect();
        const realX = e.clientX - x;
        const realY = pageSize.height - (e.clientY - y);
        if (realX < pageSize.width / 4 && realY < pageSize.height / 4) {
            setDraggingSide(PageDirection.LEFT);
        }
        else if (realX > pageSize.width * 2 * (3 / 4) &&
            realY < pageSize.height / 4) {
            setDraggingSide(PageDirection.RIGHT);
        }
        else {
            setDraggingSide(null);
        }
    };
    const handleMouseUp = () => {
        if (isFlipping)
            return;
        if (draggingSide === PageDirection.LEFT &&
            leftDragX > pageSize.width / 2) {
            flip(PageDirection.LEFT);
        }
        else if (draggingSide === PageDirection.RIGHT &&
            rightDragX < (pageSize.width * 3) / 2) {
            flip(PageDirection.RIGHT);
        }
        else {
            reset();
        }
        setDraggingSide(null);
    };
    const [xTranslationLeft, setXTranslationLeft] = (0, react_1.useState)(0);
    const [xTranslationRight, setXTranslationRight] = (0, react_1.useState)(0);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        controls && (react_1.default.createElement(Controls_1.Controls, { controlsPageNumbers: controlsPageNumbers || false, controlsClassName: controlsClassName, buttonClassName: buttonClassName, pagesClassName: pagesClassName, ellipsisClassName: ellipsisClassName, flip: flip, flipTo: flipTo, pageWindowStart: pageWindowStart, isFlipping: isFlipping, pages: pages })),
        react_1.default.createElement("div", { style: {
                width: pageSize.width * 2,
                height: pageSize.height,
                transform: pageWindowStart === -2
                    ? `translateX(${xTranslationRight}px)`
                    : pageWindowStart === 0
                        ? `translateX(${xTranslationLeft}px)`
                        : pageWindowStart === pages.length - 4
                            ? `translateX(${pageSize.width / 2 + xTranslationRight}px)`
                            : pageWindowStart === pages.length - 2
                                ? `translateX(${pageSize.width / 2 + xTranslationLeft}px)`
                                : `none`,
            }, ref: bookRef, onMouseMove: handleMouseMove, onMouseDown: handleMouseDown, onMouseUp: handleMouseUp },
            react_1.default.createElement(Page_1.Page, Object.assign({}, pageSize, { side: "left", invisible: pageWindowStart <= 0 }), paddedPages[pageWindowStart]),
            react_1.default.createElement(FlippingPageLeft_1.FlippingPageLeft, { pageSize: pageSize, dragX: leftDragX, dragY: leftDragY, rightPageChildren: paddedPages[pageWindowStart + 1], leftPageChildren: paddedPages[pageWindowStart + 2], invisible: pageWindowStart <= -2, setXTranslation: setXTranslationLeft }),
            react_1.default.createElement(FlippingPageRight_1.FlippingPageRight, { pageSize: pageSize, dragX: rightDragX, dragY: rightDragY, rightPageChildren: paddedPages[pageWindowStart + 3], leftPageChildren: paddedPages[pageWindowStart + 4], invisible: pageWindowStart >= pages.length - 2, setXTranslation: setXTranslationRight }),
            react_1.default.createElement(Page_1.Page, Object.assign({}, pageSize, { side: "right", invisible: pageWindowStart >= pages.length - 4 }), paddedPages[pageWindowStart + 5]))));
}
exports.Flipbook = Flipbook;
//# sourceMappingURL=Flipbook.js.map