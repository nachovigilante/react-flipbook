import React from 'react';
import { Flipbook } from '../Flipbook';

import './page.css';

export const Page: React.FC = () => {
    const pageSize = {
        width: 500,
        height: 650,
    };

    const pages = Array.from({ length: 10 }, (_, i) => (
        <div
            key={i}
            className="page"
            style={{
                backgroundColor: `hsl(${i * 36}, 100%, 50%)`,
            }}
        >
            <h1>{i + 1}</h1>
            {Array.from({ length: 10 }, (_, j) => (<div style={{
                backgroundColor: `hsl(${j * 36}, 100%, 50%)`,
                width: '100%',
                height: '50px',
                textAlign: 'center',
                lineHeight: '50px',
            }}>{j + 1}</div>))}
        </div>
    ));

    return (
        <div className="container">
            <Flipbook
                pageSize={pageSize}
                pages={pages}
                onPageChange={(pageWindowStart: number) =>
                    console.log(pageWindowStart)
                }
                controls
            />
        </div>
    );
};
