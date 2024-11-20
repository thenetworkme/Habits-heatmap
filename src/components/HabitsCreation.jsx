import React, { useState } from 'react';
import HeatmapCalendar from './Heatmap';

const HabitsCreation = () => {
  const [habitName, setHabitName] = useState('');
  const [habits, setHabits] = useState([]); // Mantener una lista de hábitos

  const handleInputChange = (event) => {
    setHabitName(event.target.value);
  };

  const handleButtonClick = () => {
    if (habitName.trim() !== '') {
      setHabits((prevHabits) => [...prevHabits, habitName]); // Agregar el nuevo hábito a la lista
      setHabitName(''); // Limpiar el campo de texto
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 py-8">
      <div className="flex flex-col items-center space-y-4">
        <input
          type="text"
          value={habitName}
          onChange={handleInputChange}
          placeholder="Nombre del hábito"
          className="px-4 py-2 rounded-md border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleButtonClick}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none"
        >
          Crear Heatmap
        </button>
      </div>

      {/* Mostrar los heatmaps para cada hábito creado */}
      {habits.length > 0 && (
        <div className="mt-8 space-y-6">
          {habits.map((habit, index) => (
            <div key={index} className="text-center">
              <HeatmapCalendar
                year={2024}
                habitName={habit}
                colorScale={[
                  [0.2, '#ebedf0'],
                  [0.5, '#c6e48b'],
                  [0.7, '#7bc96f'],
                  [1, '#196127'],
                ]}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HabitsCreation;
