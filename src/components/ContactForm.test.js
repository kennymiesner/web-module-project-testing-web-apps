import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
  render(<ContactForm />)
});

test('renders the contact form header', ()=> {
  render(<ContactForm />)
  const header = screen.queryByText(/contact form/i)    
  expect(header).toBeInTheDocument()
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  render(<ContactForm />)
  const firstNameInput = screen.getByLabelText(/First Name/i)
  userEvent.type(firstNameInput, 'ABC')
  const firstNameError = screen.getByText(/Error: firstName must have at least 5 characters./i)
  expect(firstNameError).toBeInTheDocument()
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm />)    
  const submitButton = screen.getByRole('button')
  userEvent.click(submitButton)
  const errors = screen.getAllByTestId('error')
  expect(errors.length).toBe(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm />)    
  const firstNameInput = screen.getByLabelText(/First Name/i)
  userEvent.type(firstNameInput, 'Kenny')
  const lastNameInput = screen.getByLabelText(/Last Name/i)
  userEvent.type(lastNameInput, 'Miesner')
  const submitButton = screen.getByRole('button')
  userEvent.click(submitButton)
  const emailError = screen.getByText(/Error: email must be a valid email address./i)
  expect(emailError).toBeInTheDocument()
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />)    
  const emailInput = screen.getByLabelText(/Email/i)    
  userEvent.type(emailInput, 'abc123.com')
  const emailError = screen.getByText(/Error: email must be a valid email address./i)
  expect(emailError).toBeInTheDocument()
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />)        
  const firstNameInput = screen.getByLabelText(/First Name/i)
  userEvent.type(firstNameInput, 'Kenny')
  const emailInput = screen.getByLabelText(/Email/i)    
  userEvent.type(emailInput, 'kennymiesner@gmail.com')
  const submitButton = screen.getByRole('button')
  userEvent.click(submitButton)
  const lastNameError = screen.getByText(/Error: lastName is a required field./i)
  expect(lastNameError).toBeInTheDocument()
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});