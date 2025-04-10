import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { BackendRoute } from '../context/AppContext';
import ParticlesBg from '../components/ParticlesBg';

export default function Reg({ }) {

    const navigate = useNavigate();
    const backRoute = useContext(BackendRoute);

    let [currentForm, setForm] = useState(1);

    useEffect(() => {
        setForm(1);
    }, [])

    let [inputs, setInput] = useState({
        email: "",
        password: "",
        confPass: "",
        userName: "",
        userDesc: "",
        imageUrl: "",
    });

    let [alert, setAlert] = useState("");

    const handleChanges = (e) => {
        const atribute = e.target.name;
        const value = e.target.value;

        setInput(prev => ({
            ...prev,
            [atribute]: e.target.value
        }))
    }

    const validate = (text) => {
        if (text === "") {
            return [false, "pleace fill the input"];
        }

        // If text contains other letters than A-z or 0-9
        if (!/^[A-Za-z 0-9]+$/.test(text)) {
            return [false, "only A-z and 0-9 alowed"];
        }

        return true;
    }

    const validateEmail = (text) => {
        if (text === "") {
            return [false, "pleace fill the input"];
        }

        // If text contains other letters than A-z or 0-9
        if (!/^[A-Za-z 0-9@]+$/.test(text)) {
            return [false, "only A-z and 0-9 alowed"];
        }
    }

    const validatePassword = (text) => {
        if (text === "") {
            return [false, "pleace fill the input"];
        }
        if (!/^[a-zA-Z0-9_.$]+$/.test(text)) {
            return [false, 'only letters betwen A-z and only _ . $ special characters'];
        }

        if (!/[._$]/.test(text)) {
            return [false, "password needs one special character"];
        }

        return true;
    }

    const handleSubmit = async (e) => {
        const data = {
            "userData":{
                "email":inputs.email,
                "authentication":inputs.password
            },
            "user_name":inputs.userName,
            "description":inputs.description
        }
        
        try{
            const res = await fetch(`${backRoute}api/reg-user`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(data)
            })
            if(!res.ok){
                throw new Error("Something is wrong with the backend "+ res.status);
            }
            const dataRes = await res.json();
            console.log(dataRes);
            navigate('/');
            // navigate(`/welcome/${inputs.userName}`);

        }catch(error){
            console.error(error)
        }
    }

    const fase1 = () => {
        return (<form className="flex flex-col h-[70vh] min-w-[25vw] justify-between p-4 bg-(--dark-400) rounded-2xl" onSubmit={(e) => { e.preventDefault(); }}>
            <span>{alert}</span>
            <fieldset className="flex flex-col justify-around h-[40%] mt-[10%]">
                <div>
                    <label htmlFor="emailLog" >Email</label>
                    <input name="email" value={inputs.email} onChange={(e) => { handleChanges(e) }} id="emailReg" type="email" placeholder="user@gmail.com"></input>
                </div>

                <div>
                    <label htmlFor="passwordLog">Password</label>
                    <input name="password" value={inputs.password} onChange={(e) => { handleChanges(e) }} id="passwordReg" type="password" placeholder="example_$37"></input>
                </div>

                <div>
                    <label htmlFor="passwordLog">Confirm Password</label>
                    <input name="confPass" value={inputs.confPass} onChange={(e) => { handleChanges(e) }} id="confirmPasswordReg" type="password" placeholder="example_$37"></input>
                </div>
            </fieldset>

            <div className="flex flex-col items-center w-full h-[20%] ">
                <button className="p-2 btn " type="button" aria-label="Continue with google">
                    <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" />
                    Continue with Google</button>
                <a className="m-4" href="/">Log In</a>
            </div>
            <button className="btn ml-auto" type="submit" onClick={() => { setForm(prev => (prev + 1)) }}>Next</button>
        </form>)
    }

    const fase2 = () => {
        return (
            <form className="flex flex-col h-[70vh] min-w-[25vw] justify-between p-4 bg-(--dark-400) rounded-2xl" onSubmit={(e) => { e.preventDefault(); }}>
                <legend className="text-center mt-5 text-(--red-100)">Hi, what is your name?</legend>
                <fieldset className="flex flex-col  h-[70%] max-h-[80%] mt-[10%]">
                    <div className='mb-5'>
                        <label htmlFor="text" >Name</label>
                        <input name="userName" value={inputs.userName} onChange={(e) => { handleChanges(e) }} id="nameReg" type="text" placeholder="adan_gcm"></input>
                    </div>
                    
                    <div className='max-h-[60%] h-fit'>
                        <label htmlFor="text" >Description</label>
                        <textarea name="userName" value={inputs.description} onChange={(e) => { handleChanges(e) }} id="nameReg" type="text" placeholder="adan_gcm"></textarea>
                    </div>
                </fieldset>

                <div className="flex w-full justify-between">
                    <button className="btn " type="button" onClick={() => { setForm(prev => (prev - 1)) }} >Return</button>
                    <button className="btn " type="submit"onClick={()=>{handleSubmit();}} >Next</button>
                </div>
            </form>)
    }

    const getForm = () => {
        switch (currentForm) {
            case 1:
                return fase1();
            case 2:
                return fase2();
            case 3:
                return fase3();
        }
    }

    return (
        <div className="flex flex-col min-h-screen min-w-screen items-center justify-center overflow-hidden">
            <ParticlesBg></ParticlesBg>
            <header className="mb-[-40px] z-3">
                <h5 className="text-center font-medium mb-[-20px]">Welcome to</h5>
                <h1 className="text-center font-bold mt-0 text-(--red-500)">ActOne</h1>
            </header>

            {getForm()}
        </div>
    )
}
