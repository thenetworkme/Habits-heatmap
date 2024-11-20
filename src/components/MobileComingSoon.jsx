import React from 'react';
import { useMediaQuery } from 'react-responsive';

const MobileComingSoon = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 }); // Detecta pantallas móviles

  return (
    isMobile && (
      <div style={styles.container}>
        <h2 style={styles.text}>Estamos trabajando en ello...</h2>
      </div>
    )
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  text: {
    color: '#333',
    fontSize: '1.5rem',
    textAlign: 'center',
  },
};

export default MobileComingSoon;
