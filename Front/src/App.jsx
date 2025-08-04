import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import routes, { RenderRoutes } from './routes';

const App = () => {
  return (
    <BrowserRouter basename={import.meta.env.VITE_APP_BASE_NAME}>
        {RenderRoutes(routes)}
    </BrowserRouter>
  );
};

export default App;
