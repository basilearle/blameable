import type { Meta, StoryObj } from '@storybook/react';

import BlameError from './BlameError';

const meta = {
  component: BlameError,
} satisfies Meta<typeof BlameError>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Uh oh! Something went wrong...',
    description: 'This is an example of a generic error... in Storybook!',
    code: 'Generic: StoryBook',
  },
};
