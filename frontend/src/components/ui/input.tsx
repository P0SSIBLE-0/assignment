import  { ReactElement, forwardRef } from 'react';

// Update props to include standard input attributes but omit our explicit ones
type InputProps = {
  placeholder: string;
  type: string;
} ;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type, ...rest }, ref): ReactElement => { // Accept rest props and ref
    return (
      <input
        ref={ref} // Apply the ref here
        className='input'
        type={type}
        placeholder={placeholder}
        autoComplete='off'
        {...rest} 
      />
    );
  }
);


export default Input;
