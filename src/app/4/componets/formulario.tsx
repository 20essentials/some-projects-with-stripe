'use client';

import { useActionState } from 'react';
import { UserIcon } from './user-icon';
import { EmailIcon } from './email-icon';
import './form.css';
import { createStripeCustomer } from '../action/create-customer';
import { CreateStripeCustomerState } from '../types/types';

const INITIAL_STATE: CreateStripeCustomerState = {
  success: null,
  error: null
};

export function Formulario() {
  const [state, formAction, isPending] = useActionState<
    CreateStripeCustomerState,
    FormData
  >(createStripeCustomer, INITIAL_STATE);

  return (
    <form action={formAction} className='form z-50 relative'>
      <div className='flex-column'>
        <label>Username </label>
      </div>
      <div className='inputForm'>
        <UserIcon />
        <input
          type='text'
          name='username'
          className='input'
          placeholder='Enter your username'
          required
        />
      </div>
      <div className='flex-column'>
        <label>Email </label>
      </div>
      <div className='inputForm'>
        <EmailIcon />
        <input
          type='email'
          name='email'
          className='input'
          placeholder='Enter your Email'
          required
        />
      </div>
      <button type='submit' className='button-submit' disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Customer'}
      </button>
      {state?.error && <p className='error'>{state.error}</p>}
      {state?.success && <p className='success'>{state.success}</p>}
    </form>
  );
}
