import { Link, useNavigate } from "react-router-dom";
import Single from "./Single";
import LogOut from "./authentication/LogOut";

function SinglePage () {

  /* Hook */

  const navigate = useNavigate();

  /* Handler function */

  function handleClickBack () {
    navigate('/');
  }

  /* Render component */

  return (<>
    <div className="header">
      <div className="controls-group">
        <Link to={'/'}><h1 className="page-title button">Catolog</h1></Link>
        <LogOut />
      </div>
      <div className="controls-group">
        <div className="button" onClick={handleClickBack}>Back</div>
      </div>
    </div>
    <div className="single-wrapper">
      <Single model={null}/>
    </div>
  </>)
}

export default SinglePage;