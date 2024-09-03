import { BsCurrencyDollar } from "react-icons/bs";
import { savingCalc } from "../../../assets";
import style from "./SavingsPlanForm.module.css";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import { useState } from "react";

const SavingsPlanForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [amount, setAmount] = useState<string>("");

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const regex = /^\d{0,9}(\.\d{0,2})?$/;
    if (regex.test(value)) {
      setAmount(value);
    }
  };

  return (
    <div className={style.main}>
      <div className={style.form_container}>
        <img src={savingCalc} />
        <div className={style.title}>
          <h2>Savings Plan</h2>
          <p>
            Keep all your expenses in one place to easily track and manage your
            spending
          </p>
        </div>
        <div className={style.form_input1}>
          <label className={style.form_label}>Savings Plan Name</label>
          <input
            type="text"
            placeholder="Savings Plan Name"
            className={style.input}
          />
        </div>
        <div className={style.form_container2}>
        <div className={style.form_input2}>
          <label className={style.form_label2}>
            Account Type
            </label>
            <div id={style.form_amount}>
            <BsCurrencyDollar className={style.dollar_amount}/>
            <input
              type="text"
              placeholder="Enter Amount"
              className={style.input}
            />
            </div>
        </div>
          <div className={style.date_form}>
            <label className={style.form_label4}>Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              calendarIconClassName={style.calendar_classname}
              wrapperClassName={style.calendar_container}
              className={style.date_input}
              placeholderText="Select a date"
              icon={<FaCalendarAlt className={style.calendar} />}
              showIcon={true}
            />
          </div>
        </div>
        <div className={style.form_input3}>
          <label className={style.form_label3}>Contribution</label>
          <div className={style.amount_form}>
            <BsCurrencyDollar className={style.dollar} />
            <input
              type="text"
              placeholder="Account Type"
              value={amount}
              onChange={handleAmountChange}
              className={style.input3}
            />
          </div>
            <label className={style.recurring}>Frequency</label>
            <div>
            <select className={style.dropdown_freq}>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Bi-weekly</option>
                <option>Monthly</option>
            </select>
            </div>
        </div>
        <div className={style.btn_container}>
          <button className={style.btn_accounts}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default SavingsPlanForm;
