import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// اینجا باید هم initialState و هم reducer را import کنید
import { DataLayer, initialState, reducer } from './context/DataLayer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* حالا reducer به درستی پاس داده می‌شود */}
    <DataLayer initialState={initialState} reducer={reducer}>
      <App />
    </DataLayer>
  </React.StrictMode>
);