import React, { useEffect, useState } from "react";
import * as yup from "yup";

function Form() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  const [isButtonDisabled , setIsButtonDisabled] = useState(false)

  const formSchema = yup.object().shape({
    name: yup.string().required("Needs name."),
    email: yup.string().email("Must be a valid email address").required(),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    terms: yup.boolean().oneOf([true], "Must accept Terms of Service."),
  });

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      console.log("valid", valid);
      setIsButtonDisabled(!valid)
    });
  }, [formState]);

//Form submission function
  const formSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
  };

//onChange function
  const inputChange = (e) => {
    const newFormData ={
        ...formState,
        [e.target.name]: (e.target.type === "checkbox") ? e.target.checked : e.target.value
    }
    setFormState(newFormData);
  };



  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={formSubmit}>
        <p>
          <label htmlFor="nameInput" >
            Name:<span> </span>
            <input type="text" id="nameInput" name="name" onChange={inputChange} value={formState.name}/>
          </label>
        </p>

        <p>
          <label htmlFor="emailInput" >
            Email:<span> </span>
            <input type="email" id="emailInput" name="email" onChange={inputChange} value={formState.email}/>
          </label>
        </p>
        <p>
          <label htmlFor="passwordInput" >
            Password:<span></span>
            <input type="password" id="passwordInput" name="password" onChange={inputChange} value={formState.password}/>
          </label>
        </p>
        <p>
          <label htmlFor="terms" >
            Approve Terms of Service:<span> </span>
            <input type="checkbox" id="terms" name="terms" onChange={inputChange} checked={formState.terms}/>
          </label>
        </p>
        <button disabled={isButtonDisabled} type="submit">Submit</button>
      </form>
    </div>
  );
}
export default Form;
