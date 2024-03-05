"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
const react_1 = __importDefault(require("react"));
function Page({ children, width, height, side, angle, clipPath, marginLeft, transformOrigin, zIndex, invisible, interactive, }) {
    return (react_1.default.createElement("div", { style: {
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
        }, "data-interactive": interactive }, children));
}
exports.Page = Page;
//# sourceMappingURL=Page.js.map