import React from 'react';
import { Button, Row, Col } from 'antd'; // Importamos Button, Row y Col de Ant Design

const ColorPicker = ({ onChange }) => {
  const colors = ['#a3c9f1', '#a8d8a3', '#f1a3a3', '#f1f1a3']; // Colores pastel

  return (
    <Row gutter={[16, 16]} justify="center">
      {/* Utilizamos el grid de Ant Design */}
      {colors.map((color) => (
        <Col key={color}>
          <Button
            style={{
              backgroundColor: color, // Establecemos el color de fondo
              width: '30px', // Reducimos el tamaño del botón
              height: '30px', // Reducimos el tamaño del botón
              borderRadius: '50%', // Hacemos el botón circular
              border: `1px solid ${color}`, // Borde discontinuo con el mismo color del fondo
              padding: 0, // Quitamos el padding para que sea más pequeño
            }}
            ghost // Usamos el estilo ghost de Ant Design
            onClick={() => onChange(color)} // Llamamos la función onChange cuando se hace click
            className="color-button" // Añadimos una clase para el hover
          />
        </Col>
      ))}
    </Row>
  );
};

export default ColorPicker;
