import { render, screen } from '@testing-library/react'
import { FormComponent } from './form'

describe('FormComponent', () => {
  it('should render component', async () => {
    render(<FormComponent />)

    expect(
      await screen.findByLabelText(
        'Message in your statement* (12 chars max):',
      ),
    ).toBeInTheDocument()
    expect(
      await screen.findByLabelText('Receiver message* (12 chars max):'),
    ).toBeInTheDocument()
    expect(await screen.findByLabelText('Amount*:')).toBeInTheDocument()
    expect(await screen.findByText('Origin account*:')).toBeInTheDocument()
    expect(
      await screen.findByRole('button', { name: 'Submit payment' }),
    ).toBeDisabled()
    expect(
      await screen.findByRole('button', { name: 'Clear fields' }),
    ).toBeInTheDocument()
    expect(
      await screen.findByRole('button', { name: 'Mock failed payment' }),
    ).toBeInTheDocument()
  })
})
