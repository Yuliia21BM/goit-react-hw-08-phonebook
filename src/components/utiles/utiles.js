import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export const Notification = addedName =>
  toast.warn(`"${addedName}" is already in contacts`);

export const LoginSuccessNot = () => toast.success('You are loged in');
export const LoginErrorNot = () =>
  toast.error('Something went wrog! Try again');
export const SignUpSuccessNot = () => toast.success('You are registred');
export const SignUErrorNot = () =>
  toast.error('Something went wrog! Try again');
export const LogOutSuccessNot = () => toast.success('You are loged out!');
export const LogOutErrorNot = () =>
  toast.error('Something went wrog! Try again');

export const patternName =
  "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";

export const patternNumber =
  '+?d{1,4}?[-.s]?(?d{1,3}?)?[-.s]?d{1,4}[-.s]?d{1,4}[-.s]?d{1,9}';

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  });
  return debouncedValue;
}
