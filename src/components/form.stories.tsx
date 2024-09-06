import { Meta, StoryObj } from '@storybook/react/*'
import { FormComponent } from './form'

const meta = {
  component: FormComponent,
  parameters: {
    layout: 'padded'
  }
} satisfies Meta

export default meta

export const Basic: StoryObj = {}
