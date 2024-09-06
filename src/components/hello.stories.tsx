import { Meta, StoryObj } from '@storybook/react/*'
import { Hello } from './hello'

type Args = Parameters<typeof Hello>[0]

const meta = {
  component: Hello,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<Args>

export default meta

export const Basic: StoryObj = {}

export const WithName: StoryObj = {
  args: {
    name: 'John',
  },
}
