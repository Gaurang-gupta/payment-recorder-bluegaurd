import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import getAuth from "../../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function Login() {
    const [email, setemail] = useState("")
    const [password, setUserPassword] = useState("")
    const auth = getAuth();
    const navigate = useNavigate()

    if(sessionStorage.getItem("email") != null) {
        navigate("/")
    }
    // useEffect(() => {
    //     signup()
    // },[])

    const signup = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            sessionStorage.setItem("email",email);
            navigate("/")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Email or password is wrong")
            console.log(errorCode, errorMessage)
        });
    }
  return (
    <main className="xs:w-[300px] sm:w-[410px] md:w-[410px] lg:w-[410px] xl:w-[410px] mx-auto pt-[6rem]">
        <div className="border-black border py-2 bg-white">
            <h1 className="text-3xl text-center font-semibold pb-4">Login</h1>
            <div className="">
                <div className="flex py-2 px-4 justify-between">
                    <p className="xs:text-sm lg:text-lg">Email:-</p>
                    <input className="rounded-2xl pl-3 outline-none border-black border" type='email' value={email} onChange={(e) => setemail(e.target.value)}/>
                </div>
                <div className="flex py-2 px-4 justify-between">
                    <p className="xs:text-sm lg:text-lg">Password:-</p>
                    <input className="rounded-2xl pl-3 outline-none border-black border" type="password" value={password} onChange={(e) => setUserPassword(e.target.value)}/>
                </div>
            </div>
            <div className="flex justify-center">
            <button onClick={signup} className="px-4 py-2 mt-4 rounded-3xl bg-green-400 hover:bg-green-500 hover:scale-105 transition-transform" type="submit">Submit</button>
            </div>
            <p className="text-center pt-3 pb-1 text-blue-500 cursor-pointer hover:scale-105">
                <Link to={"/signup"}>
                    New User? Sign Up Here
                </Link>
            </p>
        </div>
        
    </main>
  )
}

export default Login