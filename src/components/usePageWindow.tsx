import { useReducer } from 'react';

export default function usePageWindow(
    pageCount: number,
    onPageChange: (pageWindowStart: number) => void
) {
    const [pageWindowStart, dispatch] = useReducer(
        (
            state: number,
            action: {
                type: 'INCREMENT' | 'DECREMENT';
            }
        ) => {
            if (action.type === 'INCREMENT') {
                if (state >= pageCount - 4) return state;
                onPageChange(state + 2);
                return state + 2;
            } else {
                if (state === -2) return state;
                onPageChange(state - 2);
                return state - 2;
            }
        },
        0
    );

    const incrementWindow = () => dispatch({ type: 'INCREMENT' });
    const decrementWindow = () => dispatch({ type: 'DECREMENT' });

    return {
        pageWindowStart,
        incrementWindow,
        decrementWindow,
    };
}
