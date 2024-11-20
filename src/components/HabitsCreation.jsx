import React, { useState } from 'react';
import HeatmapCalendar from './Heatmap'; // Suponiendo que tienes un componente Heatmap
import ColorPicker from './ColorPicker';
import { Input, Button } from 'antd'; // Importamos Input y Button de Ant Design

const HabitsCreation = () => {
  const [habitName, setHabitName] = useState('');
  const [habits, setHabits] = useState([]);
  const [colorScale, setColorScale] = useState([
    [0, '#f5f5f5'], // Gris por defecto para los cuadros vacíos
    [0.1, '#e0f4ff'],
    [0.2, '#bae0f5'],
    [0.3, '#81c8f1'],
    [0.4, '#3ba2d3'],
    [0.5, '#1f8bb8'],
    [0.6, '#1a74b7'],
    [0.7, '#13598b'],
    [0.8, '#0a3c71'],
    [0.9, '#003b5c'],
    [1, '#001f3b'],
    [2, '#000a1a'],
    [3, '#003c14'],
  ]); // Escala de colores por defecto (azul)
  const [isHabitCreated, setIsHabitCreated] = useState(false);

  const handleInputChange = (event) => {
    setHabitName(event.target.value);
  };

  const handleButtonClick = () => {
    if (habitName.trim() !== '') {
      setHabits((prevHabits) => [...prevHabits, habitName]);
      setHabitName('');
      setIsHabitCreated(true);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleButtonClick();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 py-8">
      <div className="flex items-center space-x-2">
        {' '}
        {/* Contenedor con diseño flex */}
        <Input
          value={habitName}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Nombre del hábito"
          size="middle"
          style={{ width: '250px' }} // Ajustar ancho del input
        />
        <Button
          type="primary"
          size="small" // Tamaño pequeño del botón
          onClick={handleButtonClick}
          className="h-8"
        >
          Crear
        </Button>
      </div>

      <div>
        <ColorPicker onChange={setColorScale} />
      </div>

      {isHabitCreated && (
        <div>
          <HeatmapCalendar
            habitName={habits[habits.length - 1]}
            year={2024}
            colorScale={colorScale}
          />
        </div>
      )}
    </div>
  );
};

export default HabitsCreation;
