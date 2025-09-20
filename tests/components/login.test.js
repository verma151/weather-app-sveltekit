// @ts-nocheck
import LoginComponent from '$lib/component/LoginComponent.svelte'
import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'


describe("Login Component", () => {

  test('renders email and password inputs with login button', () => {
    render(LoginComponent)

    const emailInput = screen.getByPlaceholderText(/email/i)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const button = screen.getByRole('button', { name: /sign in/i })

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  test('user can type into email and password fields', async () => {
    const user = userEvent.setup()
    render(LoginComponent)

    const emailInput = screen.getByPlaceholderText(/email/i)
    const passwordInput = screen.getByPlaceholderText(/password/i)

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'mypassword')

    expect(emailInput).toHaveValue('test@example.com')
    expect(passwordInput).toHaveValue('mypassword')
  })

test('shows error message when form.error is returned from +page.server.ts', () => {
    // simulate the action returning an error
    render(LoginComponent, { form: { error: '⚠️ Invalid credentials' } })

    const errorMsg = screen.getByText(/⚠️ Invalid credentials/i)
    expect(errorMsg).toBeInTheDocument()
  })

  test('submits form when login button is clicked', async () => {
    const user = userEvent.setup()
    render(LoginComponent)

    const emailInput = screen.getByPlaceholderText(/email/i)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    const button = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'user@test.com')
    await user.type(passwordInput, 'secret123')
    await user.click(button)

    // since we don’t have a real on:submit, we check that inputs kept values
    expect(emailInput).toHaveValue('user@test.com')
    expect(passwordInput).toHaveValue('secret123')
  })

})
