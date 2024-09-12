import { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import { useCreateBudgetMutation, useGetCategoriesQuery } from '../../features/api/pennyApi';
import { Category, CreateBudgetRequest, SubCategory } from '../../interface/Budget';

interface BudgetModalProps {
    onClose: () => void;
    refetchBudgets: () => void;
}

const BudgetModal: React.FC<BudgetModalProps> = ({ onClose, refetchBudgets }) => {
    const [show] = useState<boolean>(true);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [subcategoryId, setSubcategoryId] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [recurring, setRecurring] = useState<string>("");
    const [filteredSubcategories, setFilteredSubcategories] = useState<SubCategory[]>([])
    const { data: categoryData = [] } = useGetCategoriesQuery();
    const [createBudget] = useCreateBudgetMutation();

    function formatString(input: string): string {
      return input
        .toLowerCase()
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }

    const excludedCategoryIds = [1,2,6,11];

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedCategoryId = Number(e.target.value);
      setCategoryId(selectedCategoryId)

    const selectedCategory = categoryData.find((category: Category) => category.id === selectedCategoryId)
      setFilteredSubcategories(selectedCategory ? selectedCategory.subcategories : []);
    };

    const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSubcategoryId(Number(e.target.value))
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(Number(e.target.value))
    }

    const handleRecurringChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRecurring(e.target.value)
    }

  const handleSubmit = async () => {
    const newBudget: CreateBudgetRequest = {
      category_id: categoryId,
      subcategory_id: subcategoryId,
      amount: amount,
      recurring: recurring,
    };

    try {
      await createBudget(newBudget).unwrap();
      refetchBudgets();
      onClose();
    } catch (error) {
      console.error("Failed to create budget", error);
    }
  };

  const filteredCategoryData = categoryData.filter((category: Category) => !excludedCategoryIds.includes(category.id));


  return (
    <>
    <Modal className='modal-main' show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className='modal-text'>
            <h4>Add New Budget</h4>
          <p>Please input the data you would like to track for your budget</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="budget.ControlInput1">
              <Form.Label className='modal-text'>Category</Form.Label>
              <Form.Select value={categoryId} onChange={handleCategoryChange}>
                <option value={0}></option>
                {filteredCategoryData.map((category: Category) => (
                  <option value={category.id} key={category.id}>{formatString(category.name)}</option>
                ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="amount.ControlInput2">
              <Form.Label className='modal-text'>Sub-Category Name (optional)</Form.Label>
              <Form.Select value={subcategoryId} onChange={handleSubcategoryChange}>
                <option></option>
                {filteredSubcategories.map((subcategory: SubCategory) => (
                  <option key={subcategory.id} value={subcategory.id}>{formatString(subcategory.name)}</option>
                ))}
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="amount.ControlInput2">
              <Form.Label className='modal-text'>Amount</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Amount"
                onChange={handleAmountChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
            <Form.Label className='modal-text'>Frequency</Form.Label>
              <Form.Select value={recurring} onChange={handleRecurringChange}>
                <option value=""></option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
                </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className='modal-footer'>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default BudgetModal
