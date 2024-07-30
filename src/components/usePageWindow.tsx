import { useEffect, useReducer } from 'react';

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
                return state + 2;
            } else {
                if (state === -2) return state;
                return state - 2;
            }
        },
        -2
    );

    // This call cannot be in the reducer because it would cause the component to
    // update another component in the middle of a render cycle. This is not allowed by React.
    useEffect(() => {
        onPageChange(pageWindowStart);
    }, [pageWindowStart]);

    const incrementWindow = () => dispatch({ type: 'INCREMENT' });
    const decrementWindow = () => dispatch({ type: 'DECREMENT' });

    return {
        pageWindowStart,
        incrementWindow,
        decrementWindow,
    };
}
