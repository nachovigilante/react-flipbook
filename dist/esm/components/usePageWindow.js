import { useReducer } from 'react';
export default function usePageWindow(pageCount) {
    const [pageWindowStart, dispatch] = useReducer((state, action) => {
        if (action.type === 'INCREMENT') {
            if (state >= pageCount - 4)
                return state;
            return state + 2;
        }
        else {
            if (state === -2)
                return state;
            return state - 2;
        }
    }, 0);
    const incrementWindow = () => dispatch({ type: 'INCREMENT' });
    const decrementWindow = () => dispatch({ type: 'DECREMENT' });
    return {
        pageWindowStart,
        incrementWindow,
        decrementWindow,
    };
}
//# sourceMappingURL=usePageWindow.js.map