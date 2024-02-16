import React,{useState} from "react";
import axios from "axios";

const Login = () => {
    const[user, setUser] = useState({
        email:"",
        password:"",
    });

    const [token, setToken] = useState("");

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const { email, password} = user;

    function updateUser(e){
        let key = e.target.name;
        let value = e.target.value;
        setUser({...user, [key]:value})
    }

    async function implimentLogin(e){
        e.preventDefault();

        //validation
        try{
         const response = await axios.post("https://instagram-express-app.vercel.app/api/auth/login", 
         {
             "email": email,
             "password": password,
         })
         console.log("Success", response.data);
         setToken(response.data.data.token)
         setSuccessMessage(response.data.message)
         setErrorMessage("")
         setUser({
            email:"",
            password:"",
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
            <h1>Login</h1>
            {
                successMessage &&  <h2>{successMessage}</h2>
            }

            {
                errorMessage && <h2>{errorMessage}</h2>
            }
            <form onSubmit={implimentLogin}>

                <input type="email" placeholder="Enter Email" name="email"
                value={email}
                onChange={updateUser}
                />
                <input type="password" placeholder="Enter Password" name="password"
                value={password}
                onChange={updateUser}
                />
                <button type="submit">Submit</button>
            </form>
            <hr/>
        </div>
    )
}

export default Login;