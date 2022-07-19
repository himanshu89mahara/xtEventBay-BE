export const formattedErros = (err) => {
  const formattedErrors = {};
  if (err.name == "ValidationError") {
    for (const field in err.errors) {
      formattedErrors[field] = err.errors[field].message;
    }
  }
  return formattedErrors;
};
