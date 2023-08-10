import { useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

function LogOut () {

  /* Hooks */

  const signOut = useSignOut();
  const navigate = useNavigate();

  /* Handler function */

  // When the user clicks the log out button,
  // sign him out, using the singOut function
  function handleLogOut () {
    signOut();
    navigate('/login');
  }

  /* Render component */

  return (<>
    <button className="button" onClick={handleLogOut}>Log out</button>
  </>)
}

export default LogOut;