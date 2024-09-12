
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
    <Accordion defaultActiveKey="0" className={style.accordion}>
            {budgetData?.map((budget, index) => (
                <Accordion.Item eventKey={String(index)} key={budget.id}>
                    <Accordion.Header className={style.accordion_header}>
                        <strong>{budget.subcategory ? getSubcategoryName(budget.subcategory) : getCategoryName(budget.category)}</strong>
                    </Accordion.Header>
                    <Accordion.Body className="accord-body">
                        <p><strong>Amount:</strong> <span className={style.p_text}>&nbsp;${budget.amount}</span></p>
                        <p><strong>Recurring:</strong> <span className={style.p_text}>&nbsp;{budget.recurring}</span></p>
                        <p><strong>User:</strong> <span className={style.p_text}>&nbsp;{budget.user.username}</span></p>
                        <button className={style.delete_btn} onClick={() => handleDelete(budget.id)}>Delete</button>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
  )
}

export default BudgetListDisplay
