import logo from './visa-classic-card.png';
import './App.css';
import React from 'react';
import ApplicationForm from './ApplicationForm';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" aria-label='logo'/>
          <ApplicationForm />
      </header>
    </div>
  );
};

export default App;