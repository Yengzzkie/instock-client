import "../FormField/FormField.scss";

const FormField = ({input}) => {
  {/* 
    HOW TO USE:
    
    1. Import the required components
      - import FormField from "../FormField/FormField.jsx";
      - import HandleError from "../FormField/HandleError.jsx";

    2. In handleSubmit() function, add this:
      // this will perform the error handling.
      // `errors` will return an object of boolean whether a certain input is empty or not.
      // `data` will return the actual value of the input fields.
      const { data, errors } = HandleError(e.target.elements);

      // setting the object `errors` to setIsError() which will be used in the FormField component
      // this will perform the changing of layout dynamically
      setIsError(errors);

      // checking whether we are getting the value of the inputs
      console.log(data);
      
    3. Create an element by using the code below.
      // Refer to InventoryEdit component for a much cleaner code
      <FormField input={{
        label: "",
        class: "", // modifiers. (e.g. error)
        type: "", // choices: select, input, number, textarea, search, radio
        name: "", 
        placeholder: "",
        // onChange: "", // function name

        // options - used only for type:["select", "radio"], otherwise remove this
        // add this in jsx file for retrieving the options dynamically
        options: [
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
        ]

        // Add this in jsx file and strictly do not change these
        error: isError[params.name],
        onChange: handleOnChange
        }}
      />
  */}

  if(input.error){
    input.class = "error";
  }  

  return (
    <>
      <div className="form__group">
        <label className="form-label" {...(input.type !== "radio" ? { htmlFor: input.name } : {})}> {/* if input is radiobutton, remove `for` attribute */}
          {input.label}
        </label>
        
        {input.type === "select" ? (
          <select
            className={`form-input ${input.class}`}
            id={input.name}
            name={input.name}
            value={input.value}
            onChange={input.onChange}
          >
            {input.options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : input.type === "textarea" ? (
          <textarea
            className={`form-input textarea ${input.class}`}
            id={input.name}
            name={input.name}
            placeholder={input.placeholder}
            defaultValue={input.value}
            onChange={input.onChange}
          />
        ) : input.type === "input" ? (
          <input
            className={`form-input ${input.class}`}
            id={input.name}
            type={input.type}
            name={input.name}
            placeholder={input.placeholder}
            defaultValue={input.value}
            onChange={input.onChange}
          />
        ) : input.type === "number" ? (
          <input
            className={`form-input ${input.class}`}
            id={input.name}
            type={input.type}
            name={input.name}
            min="0"
            placeholder={input.placeholder}
            defaultValue={input.value}
            onChange={input.onChange}
          />
        ) : input.type === "radio" ? (
          <div className={`form-radio-group ${input.class}`}>
            {input.options?.map((option, index) => (
              <label key={index}>
                <input
                  className={`form-input ${input.value} ${option.value}`}
                  type="radio"
                  name={input.name}
                  value={option.value}
                  checked={input.value === option.value}
                  onChange={input.onChange}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        ) : (
          <>
            {/* display nothing if input is not in the following {select, input, number, textarea, search, radio} */}
          </>
        )}
        
        {input.class.includes('error') && (
          <span className="error">This field is required</span>
        )}
      </div>
    </>
  );
}
 
export default FormField;