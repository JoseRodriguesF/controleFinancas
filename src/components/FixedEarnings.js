import React, { useState, useEffect } from 'react';
import { saveData, loadData } from '../utils/storage';

const FixedEarnings = () => {
  const [earnings, setEarnings] = useState([]);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [frequency, setFrequency] = useState('monthly');
  const [importance, setImportance] = useState('média');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const loadedEarnings = loadData('fixedEarnings') || [];
    setEarnings(loadedEarnings);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !value) return;

    const newEarning = {
      id: editingId || Date.now(),
      description,
      value: parseFloat(value),
      frequency,
      importance
    };

    let updatedEarnings;
    if (editingId) {
      updatedEarnings = earnings.map(earning =>
        earning.id === editingId ? newEarning : earning
      );
      setEditingId(null);
    } else {
      updatedEarnings = [...earnings, newEarning];
    }

    setEarnings(updatedEarnings);
    saveData('fixedEarnings', updatedEarnings);

    setDescription('');
    setValue('');
    setFrequency('monthly');
    setImportance('média');
  };

  const handleEdit = (earning) => {
    setDescription(earning.description);
    setValue(earning.value);
    setFrequency(earning.frequency);
    setImportance(earning.importance || 'média');
    setEditingId(earning.id);
  };

  const handleDelete = (id) => {
    const updatedEarnings = earnings.filter(earning => earning.id !== id);
    setEarnings(updatedEarnings);
    saveData('fixedEarnings', updatedEarnings);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Ganhos Fixos</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium text-gray-700">Descrição:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Valor:</label>
          <input
            type="number"
            step="0.01"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Frequência:</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="daily">Diário</option>
            <option value="weekly">Semanal</option>
            <option value="monthly">Mensal</option>
            <option value="yearly">Anual</option>
          </select>
        </div>

        

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            {editingId ? 'Atualizar' : 'Adicionar'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setDescription('');
                setValue('');
                setFrequency('monthly');
                setImportance('média');
              }}
              className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h3 className="text-2xl font-semibold mt-8 mb-4">Lista de Ganhos</h3>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left border-b">Descrição</th>
            <th className="px-4 py-2 text-left border-b">Valor</th>
            <th className="px-4 py-2 text-left border-b">Frequência</th>
            <th className="px-4 py-2 text-left border-b">Importância</th>
            <th className="px-4 py-2 text-left border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {earnings.map(earning => (
            <tr key={earning.id} className="border-b">
              <td className="px-4 py-2">{earning.description}</td>
              <td className="px-4 py-2">{earning.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td className="px-4 py-2">
                {earning.frequency === 'daily' && 'Diário'}
                {earning.frequency === 'weekly' && 'Semanal'}
                {earning.frequency === 'monthly' && 'Mensal'}
                {earning.frequency === 'yearly' && 'Anual'}
              </td>
              <td className="px-4 py-2 capitalize">{earning.importance}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleEdit(earning)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(earning.id)}
                  className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition ml-2"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FixedEarnings;
