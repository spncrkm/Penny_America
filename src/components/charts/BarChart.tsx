import React, { useMemo } from 'react'
import { Chart as ChartJS, BarElement, TooltipItem, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useAppSelector } from '../../features/hooks'
import { Transaction } from '../../interface/Transaction'
import { TransactionsProps } from '../Transactions'

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale)

type CategoryTotals = Record<string, number>;

const BarChart: React.FC<TransactionsProps> = ({ selectedAccountId, filter }) => {
  const storedData: Transaction[] = useAppSelector((state) => state.plaid.transactions)

  const categoryTotals: CategoryTotals = {};

  const filteredTransactions = useMemo(() => {
    const now = new Date();
    return storedData.filter((td) => !selectedAccountId || td.account_id === selectedAccountId)
    .filter((tx) => {
        const transactionDate = new Date(tx.date);
        switch (filter) {
          case "week":
            return transactionDate >= new Date(new Date().setDate(now.getDate() - 7))
          case "month":
            return transactionDate >= new Date(new Date().setMonth(now.getMonth() - 1))
          case "year":
            return transactionDate >= new Date(new Date().setFullYear(now.getFullYear() - 1))
          default:
            return true;
        }
      });
},[storedData, selectedAccountId, filter])

filteredTransactions.forEach((transaction: { category: any[]; amount: any; }) => {
  const category = transaction.category && transaction.category[0];
  const amount = Math.abs(transaction.amount);

  if (category) {
  if (!categoryTotals[category]) {
      categoryTotals[category] = amount;
  } else {
      categoryTotals[category] += amount
  }
}
})

console.log('Category Totals:', categoryTotals);

const categories: string[] = Object.keys(categoryTotals);
const amounts: number[] = Object.values(categoryTotals);  
console.log(categories)

const changeAmount = (amount: number | any) => {
  return (amount < 0 ? "-" : "") + "$" + Math.abs(amount).toFixed(2);
};

const chartData = {
  labels: categories,
  datasets: [
      {
          label: "Categories",
          axis: 'y',
          data: amounts,
          backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40'
          ],
          borderRadius: 5,
          hoverOffset: 8,
      }
  ]
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y' as const,
  plugins: {
      tooltip: {
          enabled: true,
          callbacks: {
              label: (context: TooltipItem<'bar'>) => {
                  const label = context.label || 'Unknown';
                  const value = context.raw as number;
                  return `${label}: ${changeAmount(value)}`;
              },
          }
      },
      legend: {
          display: true,
          position: 'top' as const,
          labels: {
              color: 'black',
              boxWidth: 20,
          }
      },
  }
}

  return (
    <div className='barchart-container'>
      <Bar data={chartData} options={options} />
    </div>
  )
}

export default BarChart;
