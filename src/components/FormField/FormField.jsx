import "../FormField/FormField.scss";

const FormField = ({input}) => {
  {/* 
    Usage:
    
    1. import the component (e.g. import FormField from "../FormField/FormField.jsx";)
    2. Create an element by using the code below

    <FormField input={{
      label: "",
      class: "", // modifiers. (e.g. error)
      type: "", // choices: select, input, number, textarea, search, radio
      name: "", 
      placeholder: "",
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
        <label className="form-label" {...(input.type !== "radio" ? { htmlFor: input.name } : {})}>
          {input.label}
        </label>

        {input.type === "select" ? (
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
                  className={`form-input`}
                  type="radio"
                  name={input.name}
                  value={option.value}
                  defaultChecked={input.value === option.value}
                  onChange={input.onChange}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        ) : (
          <></>
        )}
        
        {input.class.includes('error') && (
          <span className="error">This field is required</span>
        )}
      </div>
    </>
  );
}
 
export default FormField;