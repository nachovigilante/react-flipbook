export default function usePageWindow(pageCount: number, onPageChange: (pageWindowStart: number) => void): {
    pageWindowStart: number;
    incrementWindow: () => void;
    decrementWindow: () => void;
};
