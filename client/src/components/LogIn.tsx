// import { useSignIn } from "react-auth-kit";

function LogIn () {
  // const signIn = useSignIn();

  // const onSubmit = (event) => {
  //   if(signIn(
  //     {
  //       token: res.data.token,
  //       expiresIn:res.data.expiresIn,
  //       tokenType: "Bearer",
  //       authState: res.data.authUserState,
  //     }
  //   ))
  // }

  /**
   * Handler function
   */

  // When the user submits the log-in form
  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

  }

  /**
   * Render component
   */

  return (<>
    <h1>Sign in</h1>
    <form onSubmit={handleSubmit}>
      <input type="email"></input>
      <input type="password"></input>
      <button type="submit">Log in</button>
    </form>
  </>)

}

export default LogIn;