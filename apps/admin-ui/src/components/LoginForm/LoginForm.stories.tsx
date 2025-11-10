import type { Meta, StoryObj } from '@storybook/react';

import LoginForm from './LoginForm';

const meta = {
  component: LoginForm,
} satisfies Meta<typeof LoginForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    formTitle: 'Blameable Login',
    emailLabel: 'email',
    emailPlaceholder: 'cool@blameable.me',
    emailError: 'please enter a valid email.',
    passwordLabel: 'password',
    passwordPlaceholder: 'p@55w0rd',
    passwordError: 'please enter a valid password.',
    submitButtonLabel: 'log me in.',
    forgotPasswordLabel: 'forgot your password?',
    onFormSubmit: () => {
      console.log('login form submitted!');
    },
  },
};
