import { useState } from "react";

export default function Reg({ }) {

    let [currentForm, setForm] = useState(1);
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
        switch (e.target.name) {
            case "email":
                setInput(preventDefault => ({
                    ...preventDefault,
                    email: e.target.value
                }))
                break;
            case "password":
                setInput(preventDefault => ({
                    ...preventDefault,
                    password: e.target.value
                }))
                break;
        }
    }

    const validate = () => {
        if (inputs.email != "") {
            if (inputs.password != "" && inputs.password.length > 6) {
                return ["Ok", true];
            }
            return ["Contraseña muy corta", false];
        }
        return ["Correo vacio o invalido", false];
    }

    const handleSubmit = (e) => {
        const [message, res] = validate();
        if (res) {
            setAlert("Working");
        } else {
            setAlert(message);
        }
    }

    const fase1 = () => {
        return (<form className="flex flex-col h-[70vh] min-w-[25vw] justify-between p-4 bg-(--dark-200) rounded-2xl" onSubmit={(e) => { e.preventDefault(); }}>
            <legend className="text-center">New User fase 1</legend>
            <fieldset className="flex flex-col justify-around h-[40%] mt-[10%]">
                <div>
                    <label htmlFor="emailLog" >Email</label>
                    <input id="emailReg" type="email" placeholder="user@gmail.com"></input>
                </div>

                <div>
                    <label htmlFor="passwordLog">Password</label>
                    <input id="passwordReg" type="password" placeholder="example_$37"></input>
                </div>

                <div>
                    <label htmlFor="passwordLog">Confirm Password</label>
                    <input id="confirmPasswordReg" type="password" placeholder="example_$37"></input>
                </div>
            </fieldset>

            <div className="flex flex-col items-center w-full h-[20%] ">
                <button className="p-2 dark-button " type="button" aria-label="Continue with google">
                    <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" />
                    Continue with Google</button>
                <a className="m-4" href="/reg">Register</a>
            </div>
            <button className="red-button ml-auto" type="submit" onClick={() => { setForm(2) }}>Continue</button>
        </form>)
    }

    const fase2 = () => {
        return (<form className="flex flex-col h-[70vh] min-w-[25vw] justify-between p-4 bg-(--dark-200) rounded-2xl" onSubmit={(e) => { e.preventDefault(); }}>
            <legend className="text-center">fase 2</legend>
            <fieldset className="flex flex-col justify-around h-[40%] mt-[10%]">
                <div>
                    <label htmlFor="emailLog" >Email</label>
                    <input id="emailReg" type="email" placeholder="user@gmail.com"></input>
                </div>

                <div>
                    <label htmlFor="passwordLog">Password</label>
                    <input id="passwordReg" type="password" placeholder="example_$37"></input>
                </div>

                <div>
                    <label htmlFor="passwordLog">Confirm Password</label>
                    <input id="confirmPasswordReg" type="password" placeholder="example_$37"></input>
                </div>
            </fieldset>

            <div className="flex flex-col items-center w-full h-[20%] ">
                <button className="p-2 dark-button " type="button" aria-label="Continue with google">
                    <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" />
                    Continue with Google</button>
                <a className="m-4" href="/reg">Register</a>
            </div>
            <button className="red-button ml-auto" type="submit" onClick={() => { setForm(3) }} >Continue</button>
        </form>)
    }
    const fase3 = () => {
        return (
            <form className="flex flex-col h-[70vh] min-w-[25vw] justify-between p-4 bg-(--dark-200) rounded-2xl" onSubmit={(e) => { e.preventDefault(); }}>
                <h2>Bienvenido</h2>
                <button className="red-button ml-auto" type="submit" onClick={() => { setForm(1) }}>Continue</button>
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
            <header className="mb-[-40px] z-3">
                <h5 className="text-center font-medium mb-[-20px]">Welcome to</h5>
                <h1 className="text-center font-bold mt-0 text-(--red-500)">ActOne</h1>
            </header>

            {getForm()}
        </div>
    )
}
