import React, { useMemo } from 'react'
import { Transaction } from '../../interface/Transaction'
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, TooltipItem, Tooltip } from 'chart.js'
import { TransactionsProps } from '../Transactions';

Chart.register(ArcElement, Tooltip);


type CategoryTotals = Record<string, number>;


const DoughnutChart: React.FC<TransactionsProps> = ({ selectedAccountId, filter }) => {
    const storedData = localStorage.getItem('transactions') as string
    const parseData = JSON.parse(storedData)
    const transactionData: Transaction[] = parseData.transactions
    console.log("doughnut:",transactionData)

    const categoryTotals: CategoryTotals = {};
    
    const filteredTransactions = useMemo(() => {
        const now = new Date();
        return transactionData.filter((td) => !selectedAccountId || td.account_id === selectedAccountId)
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
    },[transactionData, selectedAccountId])

    filteredTransactions.forEach((transaction) => {
        const category = transaction.category[0];
        const amount = transaction.amount;

        if (!categoryTotals[category]) {
            categoryTotals[category] = amount;
        } else {
            categoryTotals[category] += amount
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
                label: "categories",
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
                hoverOffset: 4,
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            animateRotate: true,
            animateScale: true,
        },
        plugins: {
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (context: TooltipItem<'doughnut'>) => {
                        const label = context.label || 'Unknown';
                        const value = context.raw as number;
                        return `${label}: ${changeAmount(value)}`;
                    }
                }
            }
        }
    }

  return (
    <div className='chart-container'>
    <div style={{ width: '50%', height: '50%' }}>
        <h2>Spending by Category</h2>
      <Doughnut data={chartData} options={options}/>
    </div>
    </div>
  )
}

export default DoughnutChart
