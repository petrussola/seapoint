import { ConfigProviderProps, Select } from 'antd'
import { SelectCommonPlacement } from 'antd/es/_util/motion'
import {
  EuroCircleOutlined,
  PoundCircleOutlined,
  DollarCircleOutlined,
} from '@ant-design/icons'
import '../index.css'

export type OptionType = {
  value: string
  label: string
  accountName: string
  currency: 'EUR' | 'GBP' | 'USD'
  balance: 10
  lastFourDigits: string
}

type SelectComponentParams = {
  options: OptionType[]
  placeholder?: string
  disabled?: boolean
  value?: OptionType
  showSearch?: boolean
  size?: ConfigProviderProps['componentSize']
  onChange?: (value: OptionType) => void
  placement?: SelectCommonPlacement
  autoFocus?: boolean
  withIcon?: boolean
  style?: any
}

export const SelectComponent = ({
  options,
  placeholder = 'Select...',
  disabled = false,
  value,
  showSearch = false,
  size = 'middle',
  onChange,
  placement,
  autoFocus = false,
  withIcon = true,
  style,
}: SelectComponentParams) => {
  return (
    <Select
      options={options}
      style={{ width: '100%', ...style }}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      showSearch={showSearch}
      filterOption={(input, option) => {
        return (option?.accountName || '')
          .toLowerCase()
          .includes(input.toLowerCase())
      }}
      size={size}
      labelInValue
      onChange={onChange}
      placement={placement}
      popupMatchSelectWidth={false}
      autoFocus={autoFocus}
      optionRender={(option) => {
        return (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: withIcon
                ? 'auto auto 1fr auto'
                : 'auto 1fr auto',
              gap: '16px',
            }}
          >
            {withIcon && getCurrencyIcon(option.data.currency)}

            <p>{option.data.accountName}</p>

            <p>{`Ending in ${option.data.lastFourDigits}`}</p>

            <p>{`${option.data.balance} ${option.data.currency}`}</p>
          </div>
        )
      }}
    />
  )
}

const getCurrencyIcon = (currency: OptionType['currency']) => {
  const defaultProps = {
    style: {
      fontSize: '16px',
    },
  }

  switch (currency) {
    case 'EUR':
      return <EuroCircleOutlined {...defaultProps} />
    case 'GBP':
      return <PoundCircleOutlined {...defaultProps} />
    case 'USD':
      return <DollarCircleOutlined {...defaultProps} />
    default:
      return exhaustiveCheck(currency)
  }
}

const exhaustiveCheck = (arg: never) => arg
