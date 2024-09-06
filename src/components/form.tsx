import { Formik, Form, Field } from 'formik'
import styled, { css } from 'styled-components'
import * as Yup from 'yup'
import { SelectComponent } from './select'
import '../index.css'
import { mockData } from './select.stories'

const formSchema = Yup.object().shape({
  statementMessage: Yup.string().max(12, '12 chars max').required(),
  receiverMessage: Yup.string().max(12, '12 chars max').required(),
  amount: Yup.number()
    .required()
    .min(1, 'Min amount is 1')
    .max(99999, 'Max amount is 99,999'),
  account: Yup.string().nullable().required(),
})

export const FormComponent = () => {
  return (
    <Formik
      initialValues={{
        statementMessage: '',
        receiverMessage: '',
        amount: 0,
        account: null,
      }}
      validationSchema={formSchema}
      onSubmit={(values, { resetForm }) => {
        alert(`You've submitted:\n${JSON.stringify(values)}`)
        resetForm()
      }}
    >
      {({ resetForm, errors, isValid, setFieldValue, values, touched }) => {
        return (
          <Form>
            <FormWrapper>
              <h3>Make a payment</h3>

              <FieldWrapper>
                Message in your statement* (12 chars max):
                <StyledField name="statementMessage" />
              </FieldWrapper>

              {touched.statementMessage && errors.statementMessage && (
                <div style={{ color: 'red' }}>{errors.statementMessage}</div>
              )}

              <FieldWrapper>
                Receiver message* (12 chars max):
                <StyledField name="receiverMessage" />
              </FieldWrapper>

              {touched.receiverMessage && errors.receiverMessage && (
                <div style={{ color: 'red' }}>{errors.receiverMessage}</div>
              )}

              <FieldWrapper>
                Amount*:
                <StyledField name="amount" type="number" />
              </FieldWrapper>

              {touched.amount && errors.amount && (
                <div style={{ color: 'red' }}>{errors.amount}</div>
              )}

              <FieldWrapper>
                Origin account*:
                <SelectComponent
                  placeholder="Select your account..."
                  options={mockData}
                  size="large"
                  style={{ borderRadius: '4px', minWidth: '100%' }}
                  onChange={(selectedOption) =>
                    setFieldValue('account', selectedOption.value, true)
                  }
                  value={mockData.find(
                    (option) => option.value === values.account,
                  )}
                />
              </FieldWrapper>

              {touched.account && errors.account && (
                <div style={{ color: 'red' }}>{errors.account}</div>
              )}

              <ButtonWrapper>
                <Button type="submit" variant="primary" disabled={!isValid}>
                  Submit payment
                </Button>

                <Button
                  variant="secondary"
                  onClick={() => {
                    resetForm()
                  }}
                >
                  Clear fields
                </Button>
              </ButtonWrapper>
            </FormWrapper>
          </Form>
        )
      }}
    </Formik>
  )
}

const fontSize = css`
  font-size: 16px;
`

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  max-width: 500px;
`

const FieldWrapper = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 4px;
`

const StyledField = styled(Field)`
  width: 100%;
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #ececec;

  ${fontSize};
`

const Button = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 16px;
  color: ${({ variant }) => (variant === 'primary' ? 'black' : 'white')};
  background-color: ${({ variant }) =>
    variant === 'primary' ? 'white' : 'black'};
  border-radius: 10px;
  width: 200px;

  ${fontSize};

  &:hover {
    cursor: pointer;
  }

  &[disabled] {
    cursor: not-allowed;
    background-color: #ececec;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;
`
