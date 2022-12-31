import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import TruckContainer from './containers/TruckContainer';
import LocationContainer from './containers/LocationContainer';
import DepoContainer from './containers/DepoContainer';
import DepartureContainer from './containers/DepartureContainer';
import CusOrderContainer from './containers/CusOrderContainer';

test('renders truck header', () => {
  render(<TruckContainer />);
  const linkElement = screen.getByText(/SCM Application - Truck/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders location header', () => {
  render(<LocationContainer />);
  const linkElement = screen.getByText(/SCM Application - Location/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders depo header', () => {
  render(<DepoContainer />);
  const linkElement = screen.getByText(/SCM Application - Depo/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders departure header', () => {
  render(<DepartureContainer />);
  const linkElement = screen.getByText(/SCM Application - Departure/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders order header', () => {
  render(<CusOrderContainer />);
  const linkElement = screen.getByText(/SCM Application - Customer Order/i);
  expect(linkElement).toBeInTheDocument();
});