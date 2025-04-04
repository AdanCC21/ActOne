import { useState } from "react";

export default function LogIn({ }) {
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
        const [message,res] = validate();
        if(res){
            setAlert("Working");
        }else{
            setAlert(message);
        }
    }

    return (
        <div className="flex flex-col min-h-screen min-w-screen items-center justify-center overflow-hidden">
            <header className="mb-[-40px] z-3">
                <h5 className="text-center font-medium mb-[-20px]">Welcome to</h5>
                <h1 className="text-center font-bold mt-0 text-(--red-500)">ActOne</h1>
            </header>


            <form className="flex flex-col h-[70vh] min-w-[25vw] justify-between p-4 bg-(--dark-200) rounded-2xl"
                onSubmit={(e) => { handleSubmit(); e.preventDefault(); }}>
                <fieldset className="flex flex-col justify-around h-[40%] mt-[10%]">
                    <p>{alert}</p>
                    <div>
                        <label htmlFor="emailLog" >Email</label>
                        <input id="emailLog" name="email" value={inputs.email} onChange={(e) => { handleChanges(e) }}
                            type="email" placeholder="user@gmail.com"></input>
                    </div>

                    <div>
                        <label htmlFor="passwordLog">Password</label>
                        <input id="passwordLog" name="password" value={inputs.password} onChange={(e) => { handleChanges(e) }}
                            type="password" placeholder="example_$37"></input>
                    </div>
                </fieldset>

                <div className="flex flex-col items-center w-full h-[20%] ">
                    <button className="p-2 dark-button " type="button" aria-label="Continue with google">
                        <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" />
                        Continue with Google</button>
                    <a className="m-4" href="/register">Register</a>
                </div>
                <button className="red-button ml-auto" type="submit" >Continue</button>
            </form>
        </div>
    )
}
