import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { ChartProps } from '../../interface/Chart'
import { useGetBudgetsQuery, useGetCategoriesQuery, useGetTransactionsQuery } from '../../features/api/pennyApi'
import { Category } from '../../interface/Budget'
import { formatString } from '../dashboard/Dashboard'
import { Transaction, TransactionProp } from '../../interface/Transaction'

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

interface ChartData {
  subcategory: string;
  budgetedAmount: number;
  spentAmount: number;
}

const BarChart: React.FC<ChartProps> = () => {
  const { data: budgetData, isLoading: budgetsLoading } = useGetBudgetsQuery();
  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const { data: transactionsData, isLoading: transactionsLoading } = useGetTransactionsQuery();

  const [categoryMapping, setCategoryMapping] = useState<{ [key: number]: string }>({});
  const [_, setSubcategoryMapping] = useState<{ [key: number]: string }>({})

  useEffect(() => {
    if (categoriesData) {
      const categoryMap: { [key: number]: string } = categoriesData.reduce((acc: { [key: number]: string }, category: Category) => {
        acc[category.id] = category.name;
        return acc;
      }, {});
      setCategoryMapping(categoryMap);

      const subcategoryMap: { [key: number]: string } = categoriesData.flatMap(cat =>
        cat.subcategories.map(sub => ({ [sub.id]: sub.name}))
      ).reduce((acc, cur) => ({ ...acc, ...cur }), {});
      setSubcategoryMapping(subcategoryMap)
    }
  }, [categoriesData]);

  const getCategoryName = (categoryId: number) => {
    return categoryMapping[categoryId] || "unknown category";
};

const getSubcategoryName = (subCategoryId: number) => {
  const subcategory = categoriesData?.flatMap(cat => cat.subcategories).find(c => c.id === subCategoryId)
  return subcategory ? formatString(subcategory.name) : "unknown";
}

const getStartDate = (recurring: string): Date => {
  const now = new Date();

  switch (recurring.toLowerCase()) {
    case 'daily':
      return new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
    case 'weekly':
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case 'monthly':
      return new Date(now.setMonth(now.getMonth() - 1))
    case 'yearly':
      return new Date(now.setFullYear(now.getFullYear() - 1));
    default:
      return new Date(now.setMonth(now.getMonth() - 1))
  }
}

const prepareChartData = (
  budgets: Budget[] | undefined,
  transactions: TransactionProp | undefined,
  categories: Category[] | undefined
): ChartData[] => {
  if (!budgets || !transactions || !categories) return [];

  return budgets.map(budget => {
    const startDate = getStartDate(budget.recurring);
    const currentDate = new Date();
    console.log("Start Date:", startDate);
    console.log("Current Date:", currentDate);

    const endDate = new Date();
    if (budget.recurring === 'daily') {
      endDate.setDate(endDate.getDate() + 1);
    } else if (budget.recurring === 'weekly') {
      endDate.setDate(endDate.getDate() + 7);
    } else if (budget.recurring === 'monthly') {
      endDate.setMonth(endDate.getMonth() + 1);
    } else if (budget.recurring === 'yearly') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    const totalSpent = transactions.transactions.reduce((sum: number, transaction: Transaction) => {
      const transactionDate = new Date(transaction.date);
      
    if (transactionDate >= startDate && transactionDate <= endDate) {
      const subcategoryName = getSubcategoryName(budget.subcategory)
      const categoryName = getCategoryName(budget.category)

      if (
        (transaction.category.includes(subcategoryName)) 
      || (transaction.personal_finance_category.primary.includes(categoryName))
    ) {
        
        return sum + transaction.amount;
      }
    }
      return sum;
    }, 0);

    return {
      subcategory: getSubcategoryName(budget.subcategory || 0),
      budgetedAmount: parseFloat(budget.amount),
      spentAmount: totalSpent,
    }
  })
}

const chartData: ChartData[] = prepareChartData(budgetData, transactionsData, categoriesData)

  if (budgetsLoading || categoriesLoading || transactionsLoading) return <p>Loading...</p>

  const budgetArray = Array.isArray(budgetData) ? budgetData : [];
  console.log(budgetArray)

  const labels = budgetArray.map(budget => budget.subcategory ? getSubcategoryName(budget.subcategory) : formatString(getCategoryName(budget.category)))

  const spentData = chartData.map(data => data.spentAmount)

  const dataValues = budgetArray.map(budget => parseFloat(budget.amount));
  

  console.log("spent:", spentData)

  const dataChart = {
    labels,
    datasets: [
      {
        label: 'Budget Amount',
        data: dataValues,
        backgroundColor: '#6366F1',
      },
      {
        label: 'Spent Amount',
        data: spentData,
        backgroundColor: '#C7D2FE',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
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
        text: 'Budget vs Spent by Category',
      },
    },
  };
  

  return (
    <div className='barchart-container'>
      <div className='bar-chart'>

      <Bar data={dataChart} options={options} />
      </div>
    </div>
  )
}

export default BarChart;
