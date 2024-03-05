import React from 'react';
import { Flipbook } from '../Flipbook';

import './page.css';

export const Page: React.FC = () => {
    const pageSize = {
        width: 500,
        height: 650,
    };

    const pages = Array.from({ length: 10 }, (_, i) => (
        <h1 key={i} className="page">
            {i + 1}
        </h1>
    ));

    return (
        <div className="container">
            <Flipbook pageSize={pageSize} pages={pages} />
        </div>
    );
};
