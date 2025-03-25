import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './components/App.jsx';
<<<<<<< HEAD

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
=======
import { AppProvider } from './providers/AppContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
>>>>>>> 18c22ae (Second commit)
  </React.StrictMode>
);
