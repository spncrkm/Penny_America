import React, { useMemo } from 'react'
import { Transaction } from '../../interface/Transaction'
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, TooltipItem, Tooltip, Legend } from 'chart.js'
import { useAppSelector } from '../../features/hooks';
import { ChartProps } from '../../interface/Chart';
import { formatString } from '../dashboard/Dashboard';

Chart.register(ArcElement, Tooltip, Legend);


type CategoryTotals = Record<string, number>;


const DoughnutChart: React.FC<ChartProps> = ({ selectedAccountId, filter }) => {
    const storedData: Transaction[] = useAppSelector((state) => state.plaid.transactions)


    const { categories, amounts } = useMemo(() => {
      const totals: CategoryTotals = {};
      const now = new Date();

      const filteredTransactions =  storedData
          .filter((td) => td.account_id === selectedAccountId)
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

            filteredTransactions.forEach((transaction: { personal_finance_category: { primary: string }; amount: number; }) => {
                const category = formatString(transaction.personal_finance_category.primary);
                const amount = transaction.amount;
                
                if (category) {
                if (!totals[category]) {
                    totals[category] = amount;
                } else {
                    totals[category] += amount
                }
            }
            })
            return {
              categories: Object.keys(totals),
              amounts: Object.values(totals)
            }
    }, [storedData, selectedAccountId, filter]);

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
                hoverOffset: 8,
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
            },
        }
    };

    if (!selectedAccountId || categories.length === 0) {
      return <h2 className='chart-placeholder'>PennyAM</h2>
    }

  return (
    <div className='chart-container'>
        <h3>Spending by Category</h3>
        <div className='doughnut-chart'>
      <Doughnut data={chartData} options={options}/>

        </div>
    </div>
  )
}

export default DoughnutChart
