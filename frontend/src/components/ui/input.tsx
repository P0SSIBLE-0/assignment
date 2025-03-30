import React, { ReactElement, forwardRef } from 'react';

// Update props to include standard input attributes but omit our explicit ones
type InputProps = {
  placeholder: string;
  type: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'placeholder'>; // Extend standard props

// Use forwardRef to pass the ref down to the input
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type, ...rest }, ref): ReactElement => { // Accept rest props and ref
    return (
      <input
        ref={ref} // Apply the ref here
        className='input' // Keep existing className or add yours
        type={type}
        placeholder={placeholder}
        autoComplete='off'
        {...rest} // Spread the rest of the props (includes name, onChange, onBlur from register)
      />
    );
  }
);

Input.displayName = 'Input'; // Optional: Set display name for DevTools

export default Input; // Export the wrapped component
