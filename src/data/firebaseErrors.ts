export const firebaseAuthErrorMessages: { [key: string]: string } = {
  // Common errors
  'auth/invalid-email':
    'The email address is invalid. Please check and try again.',
  'auth/user-disabled':
    'This account has been disabled. Please contact support for assistance.',
  'auth/user-not-found':
    "No user found with this email. Please sign up if you don't have an account.",
  'auth/wrong-password':
    'Incorrect password. Please try again or reset your password.',

  // Registration errors
  'auth/email-already-in-use':
    'An account with this email already exists. Try logging in instead.',
  'auth/weak-password':
    'The password is too weak. Please use a stronger password with at least 6 characters.',
  'auth/operation-not-allowed':
    'This sign-in method is currently disabled. Please contact support for more information.',

  // Password reset errors
  'auth/invalid-action-code':
    'The reset link is invalid or expired. Please request a new reset link.',
  'auth/expired-action-code':
    'This reset link has expired. Request a new link to reset your password.',
  'auth/user-token-expired': 'Your session has expired. Please log in again.',

  // Email verification errors
  'auth/invalid-verification-code':
    'The verification code is invalid. Please check your email for the correct code.',
  'auth/missing-verification-code':
    'The verification code is missing. Please enter it to continue.',

  // Provider-related errors
  'auth/account-exists-with-different-credential':
    'An account with the same email exists with a different sign-in method. Try signing in with that provider.',
  'auth/credential-already-in-use':
    'This credential is already linked to another account.',

  // Quota errors
  'auth/too-many-requests':
    'We have detected unusual activity on your account. Please wait a few minutes and try again.',

  // User token issues
  'auth/id-token-expired': 'Your session has expired. Please log in again.',
  'auth/id-token-revoked':
    'Your session is no longer valid. Please log in again.',

  // Phone authentication errors
  'auth/invalid-phone-number':
    'The phone number entered is invalid. Please check the format and try again.',
  'auth/missing-phone-number':
    'A phone number is required. Please enter it and try again.',
  'auth/quota-exceeded':
    'SMS quota exceeded. Please try again later or use another method.',
  'auth/captcha-check-failed':
    'Captcha verification failed. Please complete the captcha to proceed.',

  // Miscellaneous errors
  'auth/network-request-failed':
    'Network error occurred. Please check your internet connection and try again.',
  'auth/internal-error':
    'An internal error occurred. Please try again or contact support.',
  'auth/invalid-credential':
    'The provided credentials are invalid. Please check and try again.',
  'auth/requires-recent-login':
    'Sensitive operation requires recent login. Please log in again to proceed.',

  // Custom error for unknown cases
  'auth/unknown':
    'An unknown error occurred. Please try again later or contact support if the issue persists.',
};

export const getErrorMessage = (errorCode: string): string => {
  return (
    firebaseAuthErrorMessages[errorCode] ||
    firebaseAuthErrorMessages['auth/unknown']
  );
};
