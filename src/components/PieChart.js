import React, { useEffect, useRef } from 'react';
import { loadData } from '../utils/storage';
import Chart from 'chart.js/auto';

const PieChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const earnings = loadData('fixedEarnings') || [];
    const expenses = loadData('fixedExpenses') || [];

    const totalEarnings = earnings.reduce((sum, earning) => sum + earning.value, 0);
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.value, 0);

    const data = {
      labels: ['Ganhos', 'Gastos'],
      datasets: [{
        data: [totalEarnings, totalExpenses],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderWidth: 1
      }]
    };

    const options = {
      responsive: true, // Garante que o gráfico seja responsivo
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.raw || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} (${percentage}%)`;
            }
          }
        }
      }
    };

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: options
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="container p-4">
      <h2 className="text-2xl font-semibold mb-4">Gráfico de Ganhos vs Gastos</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="chart-container">
            <canvas
              ref={chartRef}
              className="border-2 border-gray-200 shadow-md rounded-lg"
              style={{
                width: '100%',   
                height: 'auto',  
                maxHeight: '500px',  
              }}
            ></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChart;
