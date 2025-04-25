import React, { useState, useEffect } from 'react';
import { saveData, loadData } from '../utils/storage';

const FixedExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('food');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const loadedExpenses = loadData('fixedExpenses') || [];
    setExpenses(loadedExpenses);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !value) return;

    const newExpense = {
      id: editingId || Date.now(),
      description,
      value: parseFloat(value),
      category
    };

    let updatedExpenses;
    if (editingId) {
      updatedExpenses = expenses.map(expense =>
        expense.id === editingId ? newExpense : expense
      );
      setEditingId(null);
    } else {
      updatedExpenses = [...expenses, newExpense];
    }

    setExpenses(updatedExpenses);
    saveData('fixedExpenses', updatedExpenses);

    setDescription('');
    setValue('');
    setCategory('food');
  };

  const handleEdit = (expense) => {
    setDescription(expense.description);
    setValue(expense.value);
    setCategory(expense.category);
    setEditingId(expense.id);
  };

  const handleDelete = (id) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    saveData('fixedExpenses', updatedExpenses);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Gastos Fixos</h2>

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
          <label className="block font-medium text-gray-700">Categoria:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="food">Alimentação</option>
            <option value="housing">Moradia</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
            <option value="education">Educação</option>
            <option value="leisure">Lazer</option>
            <option value="others">Outros</option>
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
                setCategory('food');
              }}
              className="bg-gray-300 text-black px-6 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <h3 className="text-2xl font-semibold mt-8 mb-4">Lista de Gastos</h3>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left border-b">Descrição</th>
            <th className="px-4 py-2 text-left border-b">Valor</th>
            <th className="px-4 py-2 text-left border-b">Categoria</th>
            <th className="px-4 py-2 text-left border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => (
            <tr key={expense.id} className="border-b">
              <td className="px-4 py-2">{expense.description}</td>
              <td className="px-4 py-2">{expense.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td className="px-4 py-2">
                {expense.category === 'food' && 'Alimentação'}
                {expense.category === 'housing' && 'Moradia'}
                {expense.category === 'transport' && 'Transporte'}
                {expense.category === 'health' && 'Saúde'}
                {expense.category === 'education' && 'Educação'}
                {expense.category === 'leisure' && 'Lazer'}
                {expense.category === 'others' && 'Outros'}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleEdit(expense)}
                  className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(expense.id)}
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

export default FixedExpenses;
