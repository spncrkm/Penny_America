import React from 'react'
import NavBar from './navbar/NavBar.'
import { useSelector } from 'react-redux'
import { User, UserState } from '../interface/Users'
import Transactions from './Transactions'



const Dashboard: React.FC = () => {
  const loggedInUser = useSelector((state: {user: UserState }) => state.user.user)
  
  return (
    <>
      <NavBar />
          {loggedInUser.map((user) => (
      <div key={user.id} className='main-dashboard'>
        <div className='section1'>
          <h1>Good Morning, {user.username}</h1>
        </div>
        
        <Transactions />
      </div>
))}
    </>
      
  )
}

export default Dashboard
