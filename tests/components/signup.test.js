// @ts-nocheck
import SignupComponent from '$lib/component/SignupComponent.svelte'
import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, test, expect } from 'vitest'

describe("SignupComponent", () => {

  test('renders name, email, password inputs and create account button', () => {
    render(SignupComponent, { form: {} })

    const nameInput = screen.getByPlaceholderText(/enter your full name/i)
    const emailInput = screen.getByPlaceholderText(/enter your email/i)
    const passwordInput = screen.getByPlaceholderText(/create a password/i)
    const button = screen.getByRole('button', { name: /create account/i })

    expect(nameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  test('user can type into all input fields', async () => {
    const user = userEvent.setup()
    render(SignupComponent, { form: {} })

    const nameInput = screen.getByPlaceholderText(/enter your full name/i)
    const emailInput = screen.getByPlaceholderText(/enter your email/i)
    const passwordInput = screen.getByPlaceholderText(/create a password/i)

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(passwordInput, 'mypassword')

    expect(nameInput).toHaveValue('John Doe')
    expect(emailInput).toHaveValue('john@example.com')
    expect(passwordInput).toHaveValue('mypassword')
  })

  test('shows success message if form.success is true', () => {
    render(SignupComponent, { form: { success: true } })

    const successMsg = screen.getByText(/signup successful/i)
    const goToLoginLink = screen.getByRole('link', { name: /go to login/i })

    expect(successMsg).toBeInTheDocument()
    expect(goToLoginLink).toBeInTheDocument()
  })

  test('shows error message if form.error exists', () => {
    render(SignupComponent, { form: { error: 'Email already exists' } })

    const errorMsg = screen.getByText(/email already exists/i)
    const errorIcon = screen.getByText(/⚠️/i)

    expect(errorMsg).toBeInTheDocument()
    expect(errorIcon).toBeInTheDocument()
  })

})
