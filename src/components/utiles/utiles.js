import { toast } from 'react-toastify';
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

export const AddContactSuccessNot = () =>
  toast.success('Your contact is added!');
export const AddContactErrorNot = () => toast.error('Your contact is added!');

export const EditContactSuccessNot = () =>
  toast.success('Your contact is edited!');
export const EditContactErrorNot = () => toast.error('Your contact is edited!');

export const DeleteContactSuccessNot = () =>
  toast.success('Your contact is deleted!');
export const DeleteContactErrorNot = () =>
  toast.error('Your contact is deleted!');

export const patternName =
  "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$";

export const patternNumber =
  '+?d{1,4}?[-.s]?(?d{1,3}?)?[-.s]?d{1,4}[-.s]?d{1,4}[-.s]?d{1,9}';
