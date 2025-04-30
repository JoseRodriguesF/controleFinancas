import React, { useState, useEffect } from 'react';
import { saveData, loadData } from '../utils/storage';

const categoryLabels = {
  food: 'Alimentação',
  housing: 'Moradia',
  transport: 'Transporte',
  health: 'Saúde',
  education: 'Educação',
  leisure: 'Lazer',
  others: 'Outros',
};

const initialFormState = {
  description: '',
  value: '',
  category: 'food',
  priority: 'media',
};

const priorityLabels = {
  alta: 'Alta',
  media: 'Média',
  baixa: 'Baixa',
};

const FixedExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const loadedExpenses = loadData('fixedExpenses') || [];
    setExpenses(loadedExpenses);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { description, value, category, priority } = form;

    if (!description || !value) return;

    const newExpense = {
      id: editingId ?? Date.now(), // sempre gerar novo se não estiver editando
      description,
      value: parseFloat(value),
      category,
      priority,
    };

    const updatedExpenses = editingId
      ? expenses.map(exp => (exp.id === editingId ? newExpense : exp))
      : [...expenses, newExpense];

    setExpenses(updatedExpenses);
    saveData('fixedExpenses', updatedExpenses);
    resetForm();
  };

  const handleEdit = ({ id, description, value, category, priority }) => {
    setForm({ description, value, category, priority });
    setEditingId(id);
  };

  const handleDelete = (id) => {
    const updatedExpenses = expenses.filter(exp => exp.id !== id);
    setExpenses(updatedExpenses);
    saveData('fixedExpenses', updatedExpenses);
  };

  const resetForm = () => {
    setForm(initialFormState);
    setEditingId(null);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Gastos Fixos</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {['description', 'value'].map((field) => (
          <div key={field}>
            <label className="block font-medium text-gray-700 capitalize">
              {field === 'description' ? 'Descrição' : 'Valor'}:
            </label>
            <input
              type={field === 'value' ? 'number' : 'text'}
              step={field === 'value' ? '0.01' : undefined}
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        ))}

        <div>
          <label className="block font-medium text-gray-700">Categoria:</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {Object.entries(categoryLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Prioridade:</label>
          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {Object.entries(priorityLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
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
              onClick={resetForm}
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
            <th className="px-4 py-2 text-left border-b">Prioridade</th>
            <th className="px-4 py-2 text-left border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(({ id, description, value, category, priority }) => (
            <tr key={id} className="border-b">
              <td className="px-4 py-2">{description}</td>
              <td className="px-4 py-2">
                {value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </td>
              <td className="px-4 py-2">{categoryLabels[category]}</td>
              <td className="px-4 py-2">{priorityLabels[priority]}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleEdit({ id, description, value, category, priority })}
                  className="bg-yellow-500 text-white px-4 py-1 rounded-md hover:bg-yellow-600 transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(id)}
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
