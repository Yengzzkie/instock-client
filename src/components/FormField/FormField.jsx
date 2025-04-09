const FormField = ({input}) => {
  {/* 
    Usage:
    
    1. import the component (e.g. import "../FormField/FormField.scss";)
    2. Create an element by using the code below

    <FormField input={{
      label: "",
      class: "", // modifiers. (e.g. error)
      type: "", // choices: dropdown, input, search
      name: "", 
      value: "",
      // onChange: "", // function name

      // options - used only for [type:"dropdown"], otherwise remove this
      options: [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
      ]
      }}
    />
  */}

  return (
    <>
      <div className="form__group">
        <label className="form-label" htmlFor={input.name}>{input.label}</label>
        {input.type === "dropdown" ? (
          <select
            className={`form-input ${input.class}`}
            id={input.name}
            name={input.name}
            defaultValue={input.value}
            onChange={input.onChange}
          >
            {input.options?.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            className={`form-input ${input.class}`}
            type={input.type}
            id={input.name}
            name={input.name}
            placeholder={input.placeholder}
            defaultValue={input.value}
            onChange={input.onChange}
          />
        )}
        
        {input.class.includes('error') && (
          <span className="error">This field is required</span>
        )}
      </div>
    </>
  );
}
 
export default FormField;