import { useState } from "react";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../services/apiService";

function LogIn () {

  /* State variables */

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  /* Hooks */

  const signIn = useSignIn();
  const navigate = useNavigate();

  /* Handler functions */

  // When the user clicks the "Log in" button
  async function handleSubmit (event: React.MouseEvent<HTMLButtonElement>) {
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

  /* Render component */

  return (<>
    <div className="modal-wrapper">
      <div className="modal">
      <h3 className="heading">Log in</h3>
        <form>
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" value={email} onChange={handleChangeEmail}></input>
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" value={password} onChange={handleChangePassword}></input>
          {error && (
            <p>Error: {error}</p>
          )}
        </form>
        <button className="button primary" type="submit" onClick={handleSubmit}>Log in</button>
      </div>
    </div>
  </>)

}

export default LogIn;