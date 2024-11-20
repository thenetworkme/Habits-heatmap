import React, { useState, useEffect } from 'react';
import {
  format,
  eachDayOfInterval,
  startOfYear,
  endOfYear,
  getDay,
} from 'date-fns';
import ModalNumero from './ModalNumero';

const HeatmapCalendar = ({ year, colorScale, habitName }) => {
  const daysOfYear = eachDayOfInterval({
    start: startOfYear(new Date(year, 0, 1)),
    end: endOfYear(new Date(year, 11, 31)),
  });

  const [data, setData] = useState({});
  const [modalData, setModalData] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [maxValue, setMaxValue] = useState(0);

  useEffect(() => {
    // Actualizar el valor máximo siempre que los datos cambien
    const max = Math.max(...Object.values(data), 0);
    setMaxValue(max);
  }, [data]);

  const getColor = (value) => {
    if (value === undefined || value === null || maxValue === 0) {
      return '#f5f5f5'; // Gris para los días sin datos
    }

    const normalizedValue = Math.max(0, Math.min(1, value / maxValue));

    for (let [threshold, color] of colorScale) {
      if (normalizedValue <= threshold) return color;
    }

    return colorScale[colorScale.length - 1][1]; // Último color si el valor es máximo
  };

  const openModal = (date) => {
    setModalData({ date, value: data[date] || 0 });
  };

  const saveData = (value) => {
    if (value === undefined || value === null || value === 0) {
      setModalData(null); // Si no se ingresa un valor, cerrar el modal sin cambios
      return;
    }

    const updatedData = { ...data, [modalData.date]: value };
    setData(updatedData);

    if (value > maxValue) setMaxValue(value);
    setModalData(null);
  };

  const getMaxStreak = () => {
    const sortedDates = Object.keys(data)
      .filter((date) => data[date] > 0) // Filtrar días con valores positivos
      .sort((a, b) => new Date(a) - new Date(b)); // Ordenar fechas en orden ascendente

    let maxStreak = 0;
    let currentStreak = 0;
    let previousDate = null;

    sortedDates.forEach((date) => {
      const currentDate = new Date(date);

      if (
        previousDate &&
        (currentDate - previousDate) / (1000 * 60 * 60 * 24) === 1
      ) {
        currentStreak++; // Incrementar racha si el día es consecutivo
      } else {
        currentStreak = 1; // Reiniciar racha si no es consecutivo
      }

      maxStreak = Math.max(maxStreak, currentStreak);
      previousDate = currentDate;
    });

    return maxStreak;
  };

  const months = Array.from({ length: 12 }, (_, i) => ({
    name: format(new Date(year, i, 1), 'MMM'),
    days: daysOfYear.filter((date) => date.getMonth() === i),
  }));

  return (
    <div className="flex justify-center items-center">
      <div className="relative flex flex-col space-y-2 bg-white p-6 rounded-lg border">
        <h2 className="text-2xl font-semibold font-poppins mb-4">
          {habitName}
        </h2>

        <div className="flex space-x-2">
          <div className="flex flex-col items-end space-y-1 text-xs font-medium text-gray-600 mt-5">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
              <div key={i} className="h-4 leading-4 text-right">
                {day}
              </div>
            ))}
          </div>

          {months.map((month, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-xs font-medium mb-1">{month.name}</div>
              <div className="grid grid-rows-7 gap-1">
                {month.days.map((date) => {
                  const value = data[format(date, 'yyyy-MM-dd')] || 0;
                  const dayOfWeek = (getDay(date) + 6) % 7;

                  return (
                    <div
                      key={date}
                      className="relative w-4 h-4 rounded-sm cursor-pointer transition-all duration-200"
                      style={{
                        backgroundColor: getColor(value),
                        gridRowStart: dayOfWeek + 1,
                        border:
                          hoveredDate === format(date, 'yyyy-MM-dd')
                            ? '1px solid #000000'
                            : 'none',
                      }}
                      onClick={() => openModal(format(date, 'yyyy-MM-dd'))}
                      onMouseEnter={() =>
                        setHoveredDate(format(date, 'yyyy-MM-dd'))
                      }
                      onMouseLeave={() => setHoveredDate(null)}
                    >
                      {hoveredDate === format(date, 'yyyy-MM-dd') &&
                        value > 0 && (
                          <div className="absolute top-[-32px] left-1/2 w-48 -translate-x-1/2 bg-gray-800 text-white text-md px-3 py-2 rounded-lg shadow-sm z-10 font-poppins">
                            {format(date, 'EEE MMM dd yyyy')}: {value}
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-lg font-semibold text-gray-800">
          Streaks: {getMaxStreak()}
        </div>

        {modalData && (
          <ModalNumero
            modalData={modalData}
            setModalData={setModalData}
            saveData={saveData}
          />
        )}
      </div>
    </div>
  );
};

export default HeatmapCalendar;
