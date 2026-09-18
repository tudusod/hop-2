'use client'

import { ChangeEvent, useState } from "react";

export default function SignUp() {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        classId: '',
    })
    const handleValues = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [event.target.name]: event.target.value})
    }
    const SignUp = async () => {
        try {
            const response = await fetch("http://localhost:8080/sign-up", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })
            const token = await response.json()
            if(!response.ok){
                alert(token)
            }

            window.localStorage.setItem("token", token)
        } catch (error) {
            alert(error)
        }
    }
  return (
    <div>
      <h1>Sign Up</h1>
      <input placeholder="username" name="username" value={values.username} onChange={(e) => handleValues(e)} />
      <input placeholder="email" name="email" value={values.email} onChange={(e) => handleValues(e)}/>
      <input placeholder="password" name="password" value={values.password} onChange={(e) => handleValues(e)}/>
      
      <button onClick={SignUp}>signup</button>
    </div>
  );
}
