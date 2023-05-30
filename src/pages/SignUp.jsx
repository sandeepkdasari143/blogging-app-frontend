import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SIGNUP } from '../../redux/auth.slice';
import { useDispatch } from 'react-redux';


const SignUp = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [username, setUserName] = React.useState("");

    const navigate = useNavigate();

    const SignUpTheUser = async (e) => {
        e.preventDefault();
        let signUpData = new FormData();
        signUpData.set("username", username);
        signUpData.set("email", email);
        signUpData.set("password", password);
        console.log(signUpData)
        const URL = "https://backend-test-lv40.onrender.com/signup"
        const OPTIONS = {
            method: "POST",
            body: signUpData,
        }
        const signUpRequest = new Request(URL, OPTIONS);
        const response = await fetch(signUpRequest);
        const jsonData = await response.json();
        console.log(jsonData)

        if (jsonData?.loggedInUser?.isLogedIn === true) {
            dispatch(SIGNUP(jsonData));
            navigate('/home', { replace: true })
            toast.success('🦄LoggedIn SuccessFully :)', {
                position: "top-right",
                autoClose: 2002,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }
    }

    return (
        <div className='flex justify-center items-center h-[100vh] w-[100vw] bg-slate-800'>
            <form onSubmit={SignUpTheUser} className='flex flex-col p-3'>
                
                <input className='bg-slate-700 px-3 py-1 outline-none border-2 border-gray-300 rounded-2xl mx-3 mt-3 text-white' placeholder="Enter Username" type="text" value={username} onChange={e => setUserName(e.target.value)} />
                <input className='bg-slate-700 px-3 py-1 outline-none border-2 border-gray-300 rounded-2xl mx-3 mt-3 text-white' placeholder="Enter Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <input className='bg-slate-700 px-3 py-1 outline-none border-2 border-gray-300 rounded-2xl mx-3 mt-3 text-white' placeholder="Enter Password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button className='px-3 py-1 outline-none border-2 border-gray-300 rounded-2xl mx-3 mt-3 bg-white font-bold' type="submit">SignUp</button>
            </form>
        </div>
    )
}

export default SignUp