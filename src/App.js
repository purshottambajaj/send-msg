// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Chat from './components/Chat';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Chat />
      </div>
    </Provider>
  );
}

export default App;
