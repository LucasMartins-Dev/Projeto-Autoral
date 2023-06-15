interface Error {
  name: string;
  message: string;
  email?: string;
}

function conflictError(message: string): Error {
  return {
    name: "ConflictError",
    message,
  };
}

function duplicatedEmailError(email: string): Error {
  return {
    name: "DuplicatedEmailError",
    message: "There is already a user with the given email",
    email,
  };
}

function unauthorizedError(): Error {
  return {
    name: "UnauthorizedError",
    message: "You must be signed in to continue",
  };
}

function notFoundError(): Error {
  return {
    name: "NotFoundError",
    message: "No results for this search!",
  };
}

function invalidCredentialsError(): Error {
  return {
    name: "InvalidCredentialsError",
    message: "Email or password is incorrect",
  };
}

function invalidDayError(): Error {
  return {
    name: "InvalidDayError",
    message: "The day must be Monday to Friday",
  };
}

function invalidHourError(): Error {
  return {
    name: "InvalidHourError",
    message: "The hour must be an integer and between 8 and 17",
  };
}

function invalidDateError(): Error {
  return {
    name: "InvalidDateError",
    message: "There is already an appointment scheduled at that time",
  };
}

export {
  invalidDateError,
  invalidHourError,
  invalidDayError,
  conflictError,
  duplicatedEmailError,
  unauthorizedError,
  notFoundError,
  invalidCredentialsError,
};
