import React, { useState, useEffect } from 'react';

export default function ModalNumero({ modalData, setModalData, saveData }) {
  const [value, setValue] = useState(modalData.value);

  // Actualizar el valor cuando cambie modalData
  useEffect(() => {
    setValue(modalData.value);
  }, [modalData]);

  // Función para manejar la tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveData(value); // Guardar el dato
      setModalData(null); // Cerrar el modal
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 modal">
      <div className="bg-gray-200 rounded-lg p-8 space-y-6 w-80 max-w-lg shadow-lg">
        <h2 className="text-center text-xl font-semibold font-poppins">
          Edit Value - {modalData.date}
        </h2>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value))}
          onKeyDown={handleKeyPress} // Detecta la tecla presionada
          className="w-full border border-gray-300 rounded px-3 py-2 text-lg"
        />
        <button
          onClick={() => {
            saveData(value);
            setModalData(null); // Cerrar el modal
          }}
          className="w-full bg-gray-800 text-white rounded py-2 text-lg hover:bg-gray-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}
