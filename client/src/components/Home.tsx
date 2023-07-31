import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <h1>Wee Three</h1>
      <Link to={`wee`}>Enter</Link>
    </div>
  );
}

export default Home;
