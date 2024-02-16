import React,{useState} from "react";
import axios from "axios";

const Signup = () => {
    const[user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    });

    const [token, setToken] = useState("");

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const {name, email, password, confirmPassword} = user;

    function updateUser(e){
        let key = e.target.name;
        let value = e.target.value;
        setUser({...user, [key]:value})
    }

    async function implimentSignup(e){
        e.preventDefault();

        //validation
        try{
         const response = await axios.post("https://instagram-express-app.vercel.app/api/auth/signup", 
         {
             "name": name,
             "email": email,
             "password": password,
         })
         console.log("Success", response.data);
         setToken(response.data.data.token)
         setSuccessMessage(response.data.message)
         setErrorMessage("")
         setUser({
            name:"",
            email:"",
            password:"",
            confirmPassword:""
         })
    }
    catch(err){
        console.log("Failure", err);
        setErrorMessage(err.response.data.message)
        setSuccessMessage("")
    }
}

    return(
        <div>
            <h1>Signup</h1>
            {
                successMessage &&  <h2>{successMessage}</h2>
            }

            {
                errorMessage && <h2>{errorMessage}</h2>
            }
            <form onSubmit={implimentSignup}>
                <input type="text" placeholder="Enter Name" name="name"
                value={name}
                onChange={updateUser}
                />
                <input type="email" placeholder="Enter Email" name="email"
                value={email}
                onChange={updateUser}
                />
                <input type="password" placeholder="Enter Password" name="password"
                value={password}
                onChange={updateUser}
                />
                <input type="password" placeholder="Confirm Password" name="confirmPassword"
                value={confirmPassword}
                onChange={updateUser}
                />
                <button type="submit">Submit</button>
                <hr/>
            </form>
        </div>
    )
}

export default Signup;