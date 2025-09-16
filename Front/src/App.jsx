import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; // <- shto këtë
import store from './store'; // <- importo store-in

import routes, { RenderRoutes } from './routes';

const App = () => {
  return (
    <Provider store={store}> {/* <-- SHTO KËTË */}
      <BrowserRouter basename={import.meta.env.VITE_APP_BASE_NAME}>
        {RenderRoutes(routes)}
      </BrowserRouter>
    </Provider>
  );
};

export default App;
