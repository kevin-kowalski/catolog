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
      <h1>Wee Three</h1>
      <div className="models">
        {modelList && (
          <p>
            featuring a catalogue of whopping {modelList.length} items in the
            database
          </p>
        )}
        <Link to={`wee`}>Enter</Link>
        {modelList && <p>to view them all</p>}
      </div>
    </div>
  );
}

export default Home;
