import { Formik, Form, Field } from 'formik'
import styled, { css } from 'styled-components'
import * as Yup from 'yup'
import { exhaustiveCheck, mockData, SelectComponent } from './select'
import '../index.css'
import { useState } from 'react'

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
  const [isComplete, setIsComplete] = useState(false)
  const [isError, setIsError] = useState(false)

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
        setIsComplete(true)
      }}
    >
      {({
        resetForm,
        errors,
        isValid,
        setFieldValue,
        values,
        touched,
        setTouched,
      }) => {
        return (
          <Form>
            <FormWrapper>
              <h3>Make a payment</h3>

              {isComplete && <Box>Payment complete</Box>}

              {isError && (
                <Box error>
                  Payment failed. Please try again or contact support.
                </Box>
              )}

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
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    resetForm()
                  }}
                >
                  Clear fields
                </Button>

                <Button
                  type="button"
                  variant="danger"
                  onClick={() => {
                    setTouched({
                      statementMessage: true,
                      receiverMessage: true,
                      amount: true,
                      account: true,
                    })

                    if (isValid && Object.entries(values).length === 0) {
                      setIsError(true)
                    }
                  }}
                >
                  Mock failed payment
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

const Button = styled.button<{ variant: 'primary' | 'secondary' | 'danger' }>`
  padding: 16px;
  color: ${({ variant }) => getColor(variant)};
  background-color: ${({ variant }) => getBackgroundColor(variant)};
  border-radius: 10px;
  width: 200px;
  border: 2px solid #ececec;

  ${fontSize};

  &:hover {
    cursor: pointer;
  }

  &[disabled] {
    cursor: not-allowed;
    background-color: gray;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;
`

const Box = styled.div<{ error?: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 16px;
  border: 1px solid green;
  background-color: ${({ error }) => (error ? 'red' : 'lightgreen')};
  border-radius: 4px;
  width: 100%;
`

const getBackgroundColor = (variant: 'primary' | 'secondary' | 'danger') => {
  switch (variant) {
    case 'primary':
      return 'black'
    case 'secondary':
      return 'white'
    case 'danger':
      return 'red'
    default:
      return exhaustiveCheck(variant)
  }
}

const getColor = (variant: 'primary' | 'secondary' | 'danger') => {
  switch (variant) {
    case 'primary':
      return 'white'
    case 'secondary':
      return 'black'
    case 'danger':
      return 'black'
    default:
      return exhaustiveCheck(variant)
  }
}
