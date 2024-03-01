export default function usePageWindow(pageCount: number): {
    pageWindowStart: number;
    incrementWindow: () => void;
    decrementWindow: () => void;
};
