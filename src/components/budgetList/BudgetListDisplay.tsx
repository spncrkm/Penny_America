
import { useDeleteBudgetMutation } from "../../features/api/pennyApi";
import { Category } from "../../interface/Budget";
import { formatString } from "../dashboard/Dashboard";
import style from "./BudgetListDisplay.module.css"
import { Accordion } from "react-bootstrap";


interface Budget {
    id: number;
    amount: string;
    recurring: string;
    category: number;
    subcategory: number;
    user: {
        id: number;
        username: string;
    }
}

interface BudgetDisplayProps {
    budgetData: Budget[] | undefined;
    categoryData: Category[] | undefined;
    refetchBudget: () => void;
}

const BudgetListDisplay: React.FC<BudgetDisplayProps> = ({ budgetData, categoryData, refetchBudget }) => {
    const [deleteBudget] = useDeleteBudgetMutation();

    const getCategoryName = (categoryId: number) => {
        const category = categoryData?.find(cat => cat.id === categoryId);
        return category ? formatString(category.name) : "unknown";
    };

    const getSubcategoryName = (subCategoryId: number) => {
        const subcategory = categoryData?.flatMap(cat => cat.subcategories).find(c => c.id === subCategoryId)
        return subcategory ? formatString(subcategory.name) : "unknown";
    }

    const handleDelete = async (budgetId: number) => {
        try {
            await deleteBudget(budgetId).unwrap();
            refetchBudget();
        } catch (error) {
            console.error("Failed to delete budget:", error)
        }
    };

  return (
    <Accordion defaultActiveKey="0">
            {budgetData?.map((budget, index) => (
                <Accordion.Item eventKey={String(index)} key={budget.id}>
                    <Accordion.Header>
                        <strong>{budget.subcategory ? getSubcategoryName(budget.subcategory) : getCategoryName(budget.category)}</strong>
                    </Accordion.Header>
                    <Accordion.Body>
                        <p><strong>Amount:</strong> ${budget.amount}</p>
                        <p><strong>Recurring:</strong> {budget.recurring}</p>
                        <p><strong>User:</strong> {budget.user.username}</p>
                        <button className={style.delete_btn} onClick={() => handleDelete(budget.id)}>Delete</button>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
  )
}

export default BudgetListDisplay
