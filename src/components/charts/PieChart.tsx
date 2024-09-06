import React, { useMemo } from 'react';
import { Chart as ChartJS, TooltipItem, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useAppSelector } from '../../features/hooks';
import { Transaction } from '../../interface/Transaction';
import { ChartProps } from '../../interface/Chart';
import { formatString } from '../dashboard/Dashboard';

ChartJS.register(ArcElement, Tooltip, Legend);

type CategoryTotals = Record<string, number>;

const PieChart: React.FC<ChartProps> = ({ selectedAccountId, filter }) => {
  const storedData: Transaction[] = useAppSelector((state) => state.plaid.transactions);

  const categoryTotals: CategoryTotals = {};

  const filteredTransactions = useMemo(() => {
    const now = new Date();
    return storedData.filter((td) => !selectedAccountId || td.account_id === selectedAccountId)
      .filter((tx) => {
        const transactionDate = new Date(tx.date);
        switch (filter) {
          case "week":
            return transactionDate >= new Date(new Date().setDate(now.getDate() - 7));
          case "month":
            return transactionDate >= new Date(new Date().setMonth(now.getMonth() - 1));
          case "year":
            return transactionDate >= new Date(new Date().setFullYear(now.getFullYear() - 1));
          default:
            return true;
        }
      });
  }, [storedData, selectedAccountId, filter]);

  filteredTransactions.forEach((transaction) => {
    const category = formatString(transaction.personal_finance_category.primary);
    const amount = Math.abs(transaction.amount);

    if (category) {
      if (!categoryTotals[category]) {
        categoryTotals[category] = amount;
      } else {
        categoryTotals[category] += amount;
      }
    }
  });

  const categories: string[] = Object.keys(categoryTotals);
  const amounts: number[] = Object.values(categoryTotals);

  const changeAmount = (amount: number) => {
    return (amount < 0 ? "-" : "") + "$" + Math.abs(amount).toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: 'Categories',
        data: amounts,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        hoverOffset: 4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: TooltipItem<'pie'>) => {
            const label = context.label || 'Unknown';
            const value = context.raw as number;
            return `${label}: ${changeAmount(value)}`;
          },
        }
      },
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          color: 'black',
          boxWidth: 20,
        }
      }
    }
  };

  return (
    <div className='chart-container'>
      <h3>Spending by Category</h3>
      <div className='pie-chart'>

      <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PieChart;