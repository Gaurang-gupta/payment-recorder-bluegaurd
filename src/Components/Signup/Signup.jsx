import { Link, useNavigate } from "react-router-dom"
import getAuth from "../../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState } from "react"
function Signup() {
    const [email, setUserEmail] = useState("")
    const [password, setUserPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate();
    const createUser = () => {
        if(password !== confirmPassword) {
            alert("Please check your password")
            return;
        }
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            sessionStorage.setItem("email", email)
            navigate("/")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });

    }

    // useEffect(() => {
    //     createUser()
    // },[])
  return (
    <main className="xs:w-[300px] sm:w-[410px] md:w-[410px] lg:w-[410px] xl:w-[410px] mx-auto pt-[6rem]">
        <div className="border-black border py-2 bg-white">
            <h1 className="text-3xl text-center font-semibold pb-4">Sign Up</h1>
            <div className="">
                <div className="flex py-2 px-4 justify-between">
                    <p className="xs:text-sm lg:text-lg">Email:-</p>
                    <input className="rounded-2xl pl-3 outline-none border-black border" type='email' value={email} onChange={(e)=>setUserEmail(e.target.value)}/>
                </div>
                <div className="flex py-2 px-4 justify-between">
                    <p className="xs:text-sm lg:text-lg">Password:-</p>
                    <input className="rounded-2xl pl-3 outline-none border-black border" type="password" value={password} onChange={(e)=>setUserPassword(e.target.value)}/>
                </div>
                <div className="flex py-2 px-4 justify-between">
                    <p className="xs:text-sm lg:text-lg">Confirm Password:-</p>
                    <input className="rounded-2xl pl-3 outline-none border-black border" type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                </div>
                { password !== confirmPassword &&
                <div className="text-center text-red-600">
                    Passwords should be same
                </div>
                }
            </div>
            <div className="flex justify-center">
            <button onClick={createUser} className="px-4 py-2 mt-4 rounded-3xl bg-green-400 hover:bg-green-500 hover:scale-105 transition-transform" type="submit">Submit</button>
            </div>
            <p className="text-center pt-3 pb-1 text-blue-500 cursor-pointer hover:scale-105">
                <Link to={"/login"}>
                    Already have an account? Login Here
                </Link>
            </p>
        </div>
        
    </main>
  )
}

export default Signup