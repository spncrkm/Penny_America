import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { ChartProps } from '../../interface/Chart'
import { useGetBudgetsQuery, useGetCategoriesQuery } from '../../features/api/pennyApi'
import { Category } from '../../interface/Categories'

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale)

export interface Budget {
  amount: string;
  category: number;
  id: number;
  recurring: string;
  subcategory: number;
  user: {
    id: number;
    username: string;
  };
}

const BarChart: React.FC<ChartProps> = () => {
  const { data: budgetData, isLoading: budgetsLoading } = useGetBudgetsQuery();
  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesQuery();

  const [categoryMapping, setCategoryMapping] = useState<{ [key: number]: string }>({})

  useEffect(() => {
    if (categoriesData) {
      const categoryMap: { [key: number]: string } = categoriesData.reduce((acc: { [key: number]: string }, category: Category) => {
        acc[category.id] = category.name;
        return acc;
      }, {});
      setCategoryMapping(categoryMap);
    }
  }, [categoriesData]);

  if (budgetsLoading || categoriesLoading) return <p>Loading...</p>

  const budgetArray = Array.isArray(budgetData) ? budgetData : [];

  const labels = budgetArray.map(budget => categoryMapping[budget.category] || `Category ${budget.category}`)
  const dataValues = budgetArray.map(budget => parseFloat(budget.amount));

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Budget Amount',
        data: dataValues,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        axis: 'y',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Budget by Category',
      },
    },
  };
  

  return (
    <div className='barchart-container'>
      <Bar data={chartData} options={options} />
    </div>
  )
}

export default BarChart;
