"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function usePageWindow(pageCount, onPageChange) {
    const [pageWindowStart, dispatch] = (0, react_1.useReducer)((state, action) => {
        if (action.type === 'INCREMENT') {
            if (state >= pageCount - 4)
                return state;
            onPageChange(state + 2);
            return state + 2;
        }
        else {
            if (state === -2)
                return state;
            onPageChange(state - 2);
            return state - 2;
        }
    }, -2);
    const incrementWindow = () => dispatch({ type: 'INCREMENT' });
    const decrementWindow = () => dispatch({ type: 'DECREMENT' });
    return {
        pageWindowStart,
        incrementWindow,
        decrementWindow,
    };
}
exports.default = usePageWindow;
//# sourceMappingURL=usePageWindow.js.map