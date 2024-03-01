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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlippingPageLeft = void 0;
const react_1 = __importStar(require("react"));
const Page_1 = require("./Page");
const util_1 = require("../utils/util");
function FlippingPageLeft({ pageSize, dragX, dragY, leftPageChildren, rightPageChildren, invisible, }) {
    const [rightClipPath, setRightClipPath] = (0, react_1.useState)('');
    const [leftClipPath, setLeftClipPath] = (0, react_1.useState)('');
    const [correctedAngle, setCorrectedAngle] = (0, react_1.useState)(0);
    const [foldedLength, setFoldedLength] = (0, react_1.useState)(0);
    const [foldedHeight, setFoldedHeight] = (0, react_1.useState)(0);
    const [topFoldedLength, setTopFoldedLength] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        const { foldedLength, foldedHeight, topFoldedLength, correctedAngle } = (0, util_1.calculateFlipping)(pageSize, {
            x: dragX,
            y: dragY,
        });
        setFoldedLength(foldedLength);
        setFoldedHeight(foldedHeight);
        setTopFoldedLength(topFoldedLength);
        setCorrectedAngle(correctedAngle);
    }, [dragX, dragY, pageSize.width, pageSize.height]);
    (0, react_1.useEffect)(() => {
        setRightClipPath(`polygon(
                ${pageSize.width - topFoldedLength}px ${pageSize.height - foldedHeight}px,
                ${pageSize.width}px 0px,
                ${pageSize.width}px ${pageSize.height}px,
                ${pageSize.width - foldedLength}px ${pageSize.height}px
            )`);
        setLeftClipPath(`polygon(
                ${topFoldedLength}px 0px,
                ${pageSize.width}px 0px,
                ${pageSize.width}px ${pageSize.height}px,
                ${foldedLength}px ${pageSize.height}px,
                ${topFoldedLength}px ${pageSize.height - foldedHeight}px
            )`);
    }, [
        topFoldedLength,
        foldedHeight,
        pageSize.width,
        pageSize.height,
        foldedLength,
    ]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Page_1.Page, Object.assign({}, pageSize, { side: "left", clipPath: leftClipPath, zIndex: 1, invisible: invisible }), leftPageChildren),
        react_1.default.createElement("div", { style: {
                position: 'absolute',
                zIndex: 50,
                filter: 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))',
            } },
            react_1.default.createElement(Page_1.Page, Object.assign({}, pageSize, { side: "right", clipPath: rightClipPath, marginLeft: -pageSize.width + foldedLength * 2, angle: correctedAngle, transformOrigin: pageSize.width -
                    foldedLength +
                    'px ' +
                    pageSize.height +
                    'px', zIndex: 2, invisible: invisible }), rightPageChildren))));
}
exports.FlippingPageLeft = FlippingPageLeft;
//# sourceMappingURL=FlippingPageLeft.js.map