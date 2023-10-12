import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [user, setUser] = useState([]);



  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data=> {
      setUser(data)
      // console.log(data)
    })
  },[])


  const hndleAddUser = e =>{
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user ={name , email}
    console.log(user);

    fetch('http://localhost:5000/users',{
      method : 'post',
      headers : {
        'content-type' : 'application/json'
      },
      body : JSON.stringify(user)
    })
    .then(res=> res.json())
    .then(data =>{
      console.log(data);
      const newUser =[...user, data];
      setUser(newUser);

      form.reset();
    })
  }
  return (
    <>

      <h1>Vite + React</h1>
      <h3>Number of users : {user.length}</h3>
      <form onSubmit={hndleAddUser}>
        <input type="text" name='name' placeholder='name....' 
        className='border-2 rounded-xl px-6 mb-3'/><br />
        <input type="email" name='email' placeholder='email.......'
        className='border-2 rounded-xl px-6 mb-3'/><br />
        <input type="submit" value='Add User' className='btn btn-success'/>

      </form>
      <div className="my-6">
        {
          user.map(user => <p>{user.id} : {user.name} : {user.email}
        </p>)
        }
      </div>

    </>
  )
}

export default App
