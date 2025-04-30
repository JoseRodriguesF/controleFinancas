import React, { useState, useEffect } from 'react';
import { saveData, loadData } from '../utils/storage';

const Balance = () => {
  const [balance, setBalance] = useState(0);
  const [manualBalance, setManualBalance] = useState('');
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const loadedBalance = loadData('balance');
    setBalance(loadedBalance || 0);
  }, []);

  const handleSaveManualBalance = () => {
    const newBalance = parseFloat(manualBalance) || 0;
    setBalance(newBalance);
    saveData('balance', newBalance);
    setShowEdit(false);
    setManualBalance('');
  };

  return (
    <div className="max-w-lg mx-auto mt-12 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 shadow-lg rounded-3xl p-8">
      <h2 className="text-3xl font-semibold text-white text-center mb-6">Saldo Atual</h2>

      <div className="flex flex-col gap-6 items-center">
        <p className="text-xl text-white">
          Saldo:{' '}
          <span className="font-bold text-yellow-300">
            {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </p>

        
        <div className="flex justify-center items-center gap-4 w-full">
          {!showEdit ? (
            <button
              onClick={() => setShowEdit(true)}
              className="bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-yellow-600 transition duration-300 ease-in-out w-40"
            >
              Editar Saldo
            </button>
          ) : (
            <div className="flex gap-4 items-center">
              <input
                type="number"
                step="0.01"
                value={manualBalance}
                onChange={(e) => setManualBalance(e.target.value)}
                placeholder="Novo saldo"
                className="bg-white text-gray-800 border-2 border-indigo-500 rounded-lg p-3 w-40 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
              <button
                onClick={handleSaveManualBalance}
                className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition duration-300 ease-in-out w-32"
              >
                Salvar
              </button>
              <button
                onClick={() => setShowEdit(false)}
                className="bg-gray-300 text-black px-6 py-3 rounded-full hover:bg-gray-400 transition duration-300 ease-in-out w-32"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Balance;
