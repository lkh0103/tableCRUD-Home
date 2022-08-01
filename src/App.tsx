import React from 'react';
import './App.css';
import LoggerProvider from './components/LoggerProvider';
import Template1 from './templates/Template1';

function App() {
  return (

    <LoggerProvider handler={(args: any) => console.log('Lỗi', ...args)}>
      <div className="App">
        <Template1 />
      </div >
    </LoggerProvider>

  );
}

export default App;

