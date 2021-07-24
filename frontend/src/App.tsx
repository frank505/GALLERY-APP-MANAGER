import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './routes/route';

const App:React.FunctionComponent = () => {
  return (
    <div data-testid="app-data-id">
      <Routes/>
    </div>
  );
}

export default App;
