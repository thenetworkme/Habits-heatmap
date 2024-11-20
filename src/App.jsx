import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import HeatmapCalendar from './components/Heatmap';
import HabitsCreation from './components/HabitsCreation';
function App() {
  return (
    <div className="">
      <HabitsCreation />
    </div>
  );
}

export default App;
