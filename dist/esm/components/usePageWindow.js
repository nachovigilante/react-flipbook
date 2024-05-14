import { useReducer } from 'react';
export default function usePageWindow(pageCount, onPageChange) {
    const [pageWindowStart, dispatch] = useReducer((state, action) => {
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
//# sourceMappingURL=usePageWindow.js.map