export class UnauthorizedError extends Error {}
export class BadRequestError extends Error {}
export class ServerError extends Error {}
export class ApiError extends Error {}
export class YoutubeError extends Error {}
export class CryptoError extends Error {}

export const ErrorMessages = {
  ANA_E2EE_MSG_ACC_INVALID:
    "You have entered an invalid FSC code/password, please try again.",
  ANA_E2EE_PRE_SESSION_NOT_FOUND:
    "Your pre-login session has timed out. Please refresh the app.",
  ANA_E2EE_MSG_ACC_TERM: "Your AgIA account has been terminated.",
  ANA_E2EE_MSG_DENIED:
    "You have entered an invalid FSC code/password, please try again.",
  ANA_E2EE_MSG_ACC_LOCK:
    'Your AgIA account is locked. Press "Unlock" to unlock your account.',
  ANA_ACCESS_TOKEN_TIMED_OUT: "You have been logged out due to inactivity",
  ANA_REFRESH_TOKEN_TIMED_OUT: "You have been logged out due to inactivity",
};
