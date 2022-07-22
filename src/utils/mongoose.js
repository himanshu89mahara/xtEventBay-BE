export const formattedErros = (err) => {
  const formattedErrors = {};
  if (err.name == "ValidationError") {
    for (const field in err.errors) {
      formattedErrors[field] = err.errors[field].message;
    }
  }
  return formattedErrors;
};

export const dateIsLessThan = (compareDate = new Date()) => {
  return (v) => {
    const endDate = new Date(compareDate);
    const startDate = new Date(v);
   
    if (startDate > endDate) {
      return false;
    } else {
      return true;
    }
  };
};
