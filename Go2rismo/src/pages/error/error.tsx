import React from 'react';
import { useRouteError } from 'react-router-dom';

type Error = {
  statusText: string;
  message: string;
};

export function Error() {
  const error = useRouteError() as Error;

  return (
    <div id="error-page" className="text-white">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
