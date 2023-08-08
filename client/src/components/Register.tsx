import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/apiService";

function Register () {

  /**
   * State variables
   */

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const navigate = useNavigate();

  /**
   * Handler functions
   */

  // When the user submits the log-in form
  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
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

  /**
   * Render component
   */

  return (<>
    <h1>Register</h1>
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={handleChangeEmail}></input>
      <input type="password" value={password} onChange={handleChangePassword}></input>
      <button type="submit">Register</button>
    </form>
    {error && (
      <p>Error: {error}</p>
    )}
  </>)
}

export default Register;