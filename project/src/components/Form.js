import React, { useState } from "react";

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
  
  const formSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
  };
  const inputChange = (e) => {
    setFormState({ name: e.target.value });
  };

  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={formSubmit}>
        <p>
          <label htmlFor="nameInput" name="name">
            Name:<span> </span>
            <input type="text" id="nameInput" />
          </label>
        </p>

        <p>
          <label htmlFor="emailInput" name="email">
            Email:<span> </span>
            <input type="email" id="emailInput" />
          </label>
        </p>
        <p>
          <label htmlFor="passwordInput" name="password">
            Password:<span></span>
            <input type="password" id="passwordInput" />
          </label>
        </p>
        <p>
          <label htmlFor="terms" name="terms">
            Approve Terms of Service:<span> </span>
            <input type="checkbox" id="terms" checked={false} />
          </label>
        </p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default Form;