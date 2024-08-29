import { banker } from '../../../assets'
import style from './ManualAccount.module.css'

const ManualAccounts = () => {

    
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
          <input type='text' placeholder='Account Type' className={style.input3}/>
          <label className={style.form_label4}>Date</label>
          <input type='text' placeholder='Account Type' className={style.input4}/>
          </div>
      </div>
    </div>
  )
}

export default ManualAccounts
