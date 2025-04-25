import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <ul className="flex justify-center space-x-6">
        <li>
          <Link
            to="/"
            className="text-white font-semibold hover:text-gray-200 transition duration-300"
          >
            Saldo
          </Link>
        </li>
        <li>
          <Link
            to="/earnings"
            className="text-white font-semibold hover:text-gray-200 transition duration-300"
          >
            Ganhos
          </Link>
        </li>
        <li>
          <Link
            to="/expenses"
            className="text-white font-semibold hover:text-gray-200 transition duration-300"
          >
            Gastos
          </Link>
        </li>
        <li>
          <Link
            to="/chart"
            className="text-white font-semibold hover:text-gray-200 transition duration-300"
          >
            Gráfico
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
