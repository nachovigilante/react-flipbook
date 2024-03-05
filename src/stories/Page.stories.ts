import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, expect } from '@storybook/test';

import { Page } from './Page';

const meta = {
    title: 'Flipbook',
    component: Page,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {};
