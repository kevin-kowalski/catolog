import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAll } from '../apiService';
import { IElement } from './utils/WeeTypes';

function Home() {
  const [modelList, setModelList] = useState<IElement[]>([]);

  useEffect(() => {
    getAll().then((res) => {
      setModelList(res);
    });
  }, []);

  return (
    <div className="home">
      <section>
        <h1>wee three</h1>
        <div className="models">
          {modelList && (
            <p>
              featuring a gallery of whopping <br />
              {modelList.length} items in the database
            </p>
          )}
          <Link to={`wee`}>enter</Link>
          {modelList && <p>to view them all</p>}
        </div>
      </section>
    </div>
  );
}

export default Home;
