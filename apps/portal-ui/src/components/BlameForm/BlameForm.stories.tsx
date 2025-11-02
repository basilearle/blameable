import type { Meta, StoryObj } from '@storybook/react';

import BlameForm from './BlameForm';

const meta = {
  component: BlameForm,
} satisfies Meta<typeof BlameForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isPending: false,
    onAssignBlame: () => console.log('assigning blame!'),
    showDeclineBlameButton: true,
    title: 'Assign Blame to a Person!',
    description: 'Wow! We can assign blame anywhere, anytime, over the internet!',
    assignButtonLabel: 'Assign Blame',
    declineButtonLabel: 'Decline Blame',
  },
};
