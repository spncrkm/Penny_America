import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { useAppSelector } from '../../features/hooks';
import { Transaction } from '../../interface/Transaction';
import { TransactionsProps } from '../Transactions';
import {
  ChartData,
  ChartOptions,
  TooltipItem,
  registerables,
} from 'chart.js';

// Register the necessary components for Chart.js
import Chart from 'chart.js/auto';

Chart.register(...registerables);

type DateAmounts = Record<string, number>;

const LineChart: React.FC<TransactionsProps> = ({ selectedAccountId, filter }) => {
  const storedData: Transaction[] = useAppSelector((state) => state.plaid.transactions);

  const dateAmounts: DateAmounts = {};

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
    const date = transaction.date;
    const amount = Math.abs(transaction.amount);

    if (date) {
      if (!dateAmounts[date]) {
        dateAmounts[date] = amount;
      } else {
        dateAmounts[date] += amount;
      }
    }
  });

  const dates: string[] = Object.keys(dateAmounts).sort();
  const amounts: number[] = dates.map(date => dateAmounts[date]);

  const changeAmount = (amount: number) => {
    return "$" + Math.abs(amount).toFixed(2);
  };

  // Explicit typing for chartData
  const chartData: ChartData<'line', number[], string> = {
    labels: dates,
    datasets: [
      {
        label: 'Transactions Over Time',
        data: amounts,
        borderColor: '#36A2EB',
        fill: false,
        tension: 0.1
      }
    ]
  };

  // Explicit typing for options
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            const label = context.label || 'Unknown';
            const value = context.raw as number;
            return `${label}: ${changeAmount(value)}`;
          },
        }
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: 'black',
          boxWidth: 20,
        }
      }
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount ($)'
        }
      }
    }
  };

  return (
    <div className='linechart-container'>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
