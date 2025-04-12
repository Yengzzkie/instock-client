const HandleError = (form) => {
  const formData = {};
  const errors = {};

  for (let element of form) {
    if (element.name) {
      const value = element.value.trim();
      formData[element.name] = value;
      errors[element.name] = !value;
    }
  }

  return { formData, errors };
};
 
export default HandleError;