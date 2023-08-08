import { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { logIn } from "../services/apiService";

function LogIn () {

  /**
   * State variables
   */

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const signIn = useSignIn();
  const navigate = useNavigate();

  /**
   * Handler functions
   */

  // When the user submits the log-in form
  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const response = await logIn({ email, password });

      // If the log in attempt was successful,
      // use the token in the server response
      // to sign the user in,
      // and redirect the user to the root,
      // otherwise show the error message
      if (response.token) {
        signIn({
          token: response.token,
          expiresIn: 3600,
          tokenType: 'Bearer',
          authState: { email }
        });
        navigate('/');
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
    <h1>Log in</h1>
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={handleChangeEmail}></input>
      <input type="password" value={password} onChange={handleChangePassword}></input>
      <button type="submit">Log in</button>
    </form>
    {error && (
      <p>Error: {error}</p>
    )}
  </>)

}

export default LogIn;