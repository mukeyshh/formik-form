import React from 'react'

const Dashboard = (props) => {
  const hanldeLogout=()=>{
    props.history.push('/login')
  }
  return (
    <div>
      <input
        type="button"
        value="logout"
        onClick={hanldeLogout}
        />
    </div>
  )
}

export default Dashboard
