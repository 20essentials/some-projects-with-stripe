import { UserIcon } from './user-icon';
import { EmailIcon } from './email-icon';
import './form.css';

export function Formulario() {
  return (
    <form className='form z-50 relative'>
      <div className='flex-column'>
        <label>Username </label>
      </div>
      <div className='inputForm'>
        <UserIcon />
        <input type='text' className='input' placeholder='Enter your username' />
      </div>
      <div className='flex-column'>
        <label>Email </label>
      </div>
      <div className='inputForm'>
        <EmailIcon />
        <input type='text' className='input' placeholder='Enter your Email' />
      </div>
      <button type='submit' className='button-submit'>
        Create Customer
      </button>
    </form>
  );
}
