# React Flipbook

A React component that allows you to display a flipbook style animation.

## Installation

```bash
npm install react-flipbook
```

## Usage

```jsx
import React from 'react';
import { Flipbook } from 'react-flipbook';

export default function App() {
    const pageSize = {
        width: 600,
        height: 750,
    };

    const pages = Array.from({ length: 10 }, (_, i) => <div>{i + 1}</div>);

    return <Flipbook pageSize={pageSize} pages={pages} />;
}
```

**Important:** You can use any component as a page, not just a `div`.

## Props

| Name     | Description                                                              | Type                              |
| -------- | ------------------------------------------------------------------------ | --------------------------------- |
| pageSize | The size of the pages. It should have a `width` and a `height` property. | `{width: number; height: number}` |
| pages    | The pages to be displayed. Note that the order matters.                  | `React.ReactNode[]`               |

## License

MIT License
