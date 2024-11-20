import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import HeatmapCalendar from './components/Heatmap';
import HabitsCreation from './components/HabitsCreation';
import StarsBackground from './components/StarsBackground';
function App() {
  return (
    <div className="app-container">
      <StarsBackground />
      <HabitsCreation />
    </div>
  );
}

export default App;
