// src/tests/Prueba.test.jsx
import { render, screen } from '@testing-library/react';
import { useState } from 'react';

// Componente Prueba
function Prueba() {
  const [text, setText] = useState('Hola');
  return <div>{text}</div>;  
}

// Pruebas para el componente Prueba
test('renders the Prueba component correctly', () => {
  render(<Prueba />);
  const textElement = screen.getByText(/Hola/i);
  expect(textElement).toBeInTheDocument();
});
