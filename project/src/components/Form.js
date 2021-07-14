import React, { useEffect, useState } from "react";
import * as yup from "yup";
import axios from "axios";

function Form() {

  const [users, setUsers] = useState([])

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

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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

  const validateChange = (e) => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch((err) => {
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  };

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setIsButtonDisabled(!valid);
    });
  }, [formState]);

  //Form submission function
  const formSubmit = (e) => {
    e.preventDefault();
    
    axios.post("https://reqres.in/api/users", formState)
    .then(response => {
        console.log(response.data);
        setUsers(response.data);
        setFormState({
            name: "",
            email: "",
            password: "",
            terms: "",
        });
    }).catch(err => console.log(err.response));
  };

  //onChange function
  const inputChange = (e) => {
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };
    validateChange(e)
    setFormState(newFormData);
  };
  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={formSubmit}>
        
          <label htmlFor="nameInput">
            Name:<span> </span>
            <input
              type="text"
              id="nameInput"
              name="name"
              onChange={inputChange}
              value={formState.name}
            />
            {(errors.name.length > 0) ? <p className="error">{errors.name}</p>: null}
          </label>
        
        <br></br>
        
          <label htmlFor="emailInput">
            Email:<span> </span>
            <input
              type="email"
              id="emailInput"
              name="email"
              onChange={inputChange}
              value={formState.email}
            />
            {(errors.email.length > 0) ? <p className="error">{errors.email}</p>: null}
          </label>
        
        <br></br>
          <label htmlFor="passwordInput">
            Password:<span></span>
            <input
              type="password"
              id="passwordInput"
              name="password"
              onChange={inputChange}
              value={formState.password}
            />
             {(errors.password.length > 0) ? <p className="error">{errors.password}</p>: null}
          </label>
        
          <br></br>
          <label htmlFor="terms">
            Approve Terms of Service:<span> </span>
            <input
              type="checkbox"
              id="terms"
              name="terms"
              onChange={inputChange}
              checked={formState.terms}
            />
          </label>
        
        <pre>{JSON.stringify(users,null, 2)}</pre>
        <button disabled={isButtonDisabled} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
export default Form;
