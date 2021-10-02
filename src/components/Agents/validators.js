const nameValidation = (fieldValue) => {
  if (/[^a-zA-Z -]/.test(fieldValue)) {
    return "Invalid characters in Name";
  }
  if (fieldValue.trim().length < 3) {
    return "Username Name needs to be at least three characters";
  }
  return null;
};

const phoneValidation = (fieldValue) => {
  if (/^[6-9]\d{9}$/.test(fieldValue)) {
    return null;
  } else {
    return "Enter proper Phone";
  }
};

const emailValidation = (email) => {
  if (
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  ) {
    return null;
  } else return "Please enter a valid email";
};

const addressValidation = (addr) => {
  if (addr.length < 5) return "Please enter a valid address";
};

const passwordValidation = (pass) => {
  if (pass.length < 8) return "Please enter a valid password min 8 char";
};

export {
  passwordValidation,
  addressValidation,
  emailValidation,
  phoneValidation,
  nameValidation,
};
