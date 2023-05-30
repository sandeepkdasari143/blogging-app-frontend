import React from 'react'
import { useCookies } from 'react-cookie';
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SIGNIN } from '../../redux/auth.slice';
import { useDispatch } from 'react-redux';

const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cookie = new Cookies();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    // TODO: Cookies Hook
    const [cookies, setCookie] = useCookies(['token']);

    const LogInTheUser = async (e) => {
        e.preventDefault();
        let logInData = new FormData();
        logInData.set("email", email);
        logInData.set("password", password);
        console.log(logInData)
        const URL = "https://backend-test-lv40.onrender.com/login"
        const OPTIONS = {
            method: "POST",
            body: logInData,
        }
        const logInRequest = new Request(URL, OPTIONS);
        const response = await fetch(logInRequest);
        const jsonData = await response.json();
        console.log(jsonData)

        //Setting the Cookie
        const token = jsonData?.token;
        setCookie('token', token, { path: '/' });

        if (jsonData?.loggedInUser?.isLogedIn === true) {
            dispatch(SIGNIN(jsonData))
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
            <form onSubmit={LogInTheUser} className='flex flex-col p-3'>
                <input className='bg-slate-700 px-3 py-1 outline-none border-2 border-gray-300 rounded-2xl mx-3 mt-3 text-white' placeholder="Enter Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                <input className='bg-slate-700 px-3 py-1 outline-none border-2 border-gray-300 rounded-2xl mx-3 mt-3 text-white' placeholder="Enter Password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <button className='px-3 py-1 outline-none border-2 border-gray-300 rounded-2xl mx-3 mt-3 bg-white font-bold' type="submit">LogIn</button>
            </form>
        </div>
    )
}

export default LogIn