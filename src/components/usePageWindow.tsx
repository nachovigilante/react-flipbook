import { useReducer } from 'react';

export default function usePageWindow(pageCount: number) {
    const [pageWindowStart, dispatch] = useReducer(
        (
            state: number,
            action: {
                type: 'INCREMENT' | 'DECREMENT';
            }
        ) => {
            if (action.type === 'INCREMENT') {
                if (state >= pageCount - 4) return state;
                return state + 2;
            } else {
                if (state === -2) return state;
                return state - 2;
            }
        },
        0
    );

    const incrementWindow = () => {
        // console.log('INCREMENT');
        dispatch({ type: 'INCREMENT' });
    };
    const decrementWindow = () => {
        // console.log('DECREMENT');
        dispatch({ type: 'DECREMENT' });
    };

    return {
        pageWindowStart,
        incrementWindow,
        decrementWindow,
    };
}
