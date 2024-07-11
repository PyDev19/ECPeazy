import { type AuthError, type User } from 'firebase/auth';

export function is_auth_error(value: User | AuthError): value is AuthError {
    return (value as AuthError).message !== undefined;
}
  