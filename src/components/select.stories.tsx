import { Meta, StoryObj } from '@storybook/react/*'
import { OptionType, SelectComponent } from './select'

export const mockData: OptionType[] = [
  {
    value: 'MAIN_ACCOUNT',
    accountName: 'MAIN-ACCOUNT',
    label: 'Main account',
    currency: 'EUR',
    balance: 10,
    lastFourDigits: '4892',
  },
  {
    value: 'RECURRING_EXPENSES',
    accountName: 'RECURRING-EXPENSES',
    label: 'Recurring expenses',
    currency: 'USD',
    balance: 10,
    lastFourDigits: '1761',
  },
  {
    value: 'EMERGENCY_FUNDS',
    accountName: 'EMERGENCY-FUNDS',
    label: 'Emergency funds',
    currency: 'EUR',
    balance: 10,
    lastFourDigits: '8828',
  },
  {
    value: 'ACCOUNT_IN_POUNDS',
    accountName: 'ACCOUNT-IN-POUNDS',
    label: 'Account in pounds',
    currency: 'GBP',
    balance: 10,
    lastFourDigits: '0963',
  },
]

type Args = Parameters<typeof SelectComponent>[0]
type Story = StoryObj<Args>

const meta = {
  component: SelectComponent,
  parameters: {
    layout: 'padded',
  },
  args: {
    options: mockData,
    onChange: (option) => console.log(option.value),
  },
} satisfies Meta<Args>

export default meta

export const Basic: Story = {}

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Select the account you wish to pay from..',
  },
}

export const WithDefaultValue: Story = {
  args: {
    value: mockData[0],
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const WithSearch: Story = {
  args: {
    showSearch: true,
    placeholder: 'You can start typing here...',
  },
}

export const WithSizes: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', rowGap: '24px' }}>
        <SelectComponent
          options={mockData}
          size="large"
          placeholder="This is size large"
        />

        <SelectComponent
          options={mockData}
          size="middle"
          placeholder="This is size medium"
        />

        <SelectComponent
          options={mockData}
          size="small"
          placeholder="This is size small"
        />
      </div>
    )
  },
}

export const WithPlacements: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', rowGap: '24px' }}>
        <SelectComponent
          options={mockData}
          placeholder="Dropdown opens on the top left"
          placement="topLeft"
        />

        <SelectComponent
          options={mockData}
          placeholder="Dropdown opens on the top right"
          placement="topRight"
        />

        <SelectComponent
          options={mockData}
          placeholder="Dropdown opens on the bottom left (default)"
        />

        <SelectComponent
          options={mockData}
          placeholder="Dropdown opens on the bottom right"
          placement="bottomRight"
        />
      </div>
    )
  },
  parameters: {
    layout: 'centered',
  },
}

export const WithoutIcon: Story = {
  args: {
    withIcon: false,
  },
}
