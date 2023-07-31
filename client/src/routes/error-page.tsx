import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const errStatus = (error as { statusText?: string })?.statusText ?? '';
  const errMessage = (error as Error)?.message ?? '';

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errStatus || errMessage}</i>
      </p>
    </div>
  );
}
