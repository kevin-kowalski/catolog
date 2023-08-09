import { InfoProps } from '../types/types.js';

function Info({ currentModel }: InfoProps) {

  /* Constants */

  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateFormatted = new Date(currentModel.date!).toLocaleDateString(undefined, dateOptions) ?? '';

  /* Render component */

  return (<>
    {!currentModel && (
      <div className="info loading">
        <h3>Loading..</h3>
      </div>
    )}
    {currentModel && (
      <div className="info">
        <h3 className='title'>{currentModel.title}</h3>
        <p className="date">{dateFormatted}</p>
      </div>
    )}
  </>);
}

export default Info;
