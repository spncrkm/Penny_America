import { BsCurrencyDollar } from 'react-icons/bs'
import { banker } from '../../../assets'
import style from './ManualAccount.module.css'
import { FaCalendarAlt } from 'react-icons/fa'
import DatePicker from 'react-datepicker'
import { useState } from 'react'

const ManualAccounts = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [amount, setAmount] = useState<string>('');

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const regex = /^\d{0,9}(\.\d{0,2})?$/;
    if (regex.test(value)) {
      setAmount(value);
    }
  }
    
  return (
    <div className={style.main}>
      <div className={style.form_container}>
        <img src={banker} />
          <h2>Add Manual Accounts</h2>
          <p>Add another account to get the most out of PennyAM</p>
          <div className={style.form_input1}>
          <label className={style.form_label}>Enter the Account Name</label>
          <input type='text' placeholder='Account Name' className={style.input}/>
          </div>
          <div className={style.form_input2}>
          <label className={style.form_label2}>Account Type</label>
          <input type='text' placeholder='Account Type' className={style.input}/>
          </div>
          <div className={style.form_input3}>
          <label className={style.form_label3}>Balance</label>
          <div className={style.amount_form}>
          <BsCurrencyDollar className={style.dollar}/>
          <input type='text' placeholder='Account Type' value={amount} onChange={handleAmountChange} className={style.input3}/>

          </div>
          <label className={style.form_label4}>Date</label>
          <div className={style.date_form}>
          <DatePicker 
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MM/dd/yyyy"
          className={style.date_input}
          placeholderText="Select a date"
          />
          <FaCalendarAlt className={style.calendar}/>
          </div>
          </div>
          <div className={style.btn_container}>
            <button className={style.btn_accounts}>Continue</button>
          </div>
      </div>
    </div>
  )
}

export default ManualAccounts
