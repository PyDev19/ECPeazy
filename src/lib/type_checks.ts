import { type AuthError } from 'firebase/auth';

export function is_auth_error(value: boolean | AuthError): value is AuthError {
    return (value as AuthError).message !== undefined;
}
  