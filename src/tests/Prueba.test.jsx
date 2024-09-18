// src/tests/Prueba.test.jsx
import { render, screen } from '@testing-library/react';
import { useState } from 'react';

function sum(a, b) {
  return a + b
}

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})