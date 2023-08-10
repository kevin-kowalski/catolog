import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/apiService";

function Register () {

  /* State variables */

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  /* Hook */

  const navigate = useNavigate();

  /* Handler functions */

  // When the user clicks the "Register" button
  async function handleSubmit (event: React.MouseEvent<HTMLButtonElement>) {
    try {
      event.preventDefault();
      const response = await register({ email, password });

      // If the registration was successful,
      // redirect the user to the login page,
      // otherwise show the error message
      if (response.user) {
        navigate('/login');
      } else {
        setError(response.message);
      }
    }
    catch (err) {
      console.log('Error:', err);
    }
  }

  // When the user types in the email input field,
  // set the email state variable to its value
  function handleChangeEmail (event: React.ChangeEvent<HTMLInputElement>) {
    const emailValue = event.currentTarget.value;
    setEmail(emailValue);
  }

  // When the user types in the password input field,
  // set the password state variable to its value
  function handleChangePassword (event: React.ChangeEvent<HTMLInputElement>) {
    const passwordValue = event.currentTarget.value;
    setPassword(passwordValue);
  }

  /* Render component */

  return (<>
    <div className="modal-wrapper">
      <div className="modal">
        <h3 className="heading">Register</h3>
        <form>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" value={email} onChange={handleChangeEmail}></input>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" value={password} onChange={handleChangePassword}></input>
        </form>
        <button className="button primary" type="submit" onClick={handleSubmit}>Register</button>
        {error && (
          <p>Error: {error}</p>
        )}
      </div>
    </div>
  </>)
}

export default Register;