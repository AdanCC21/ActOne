export default function LogIn({ }) {
    return (
        <div className="flex flex-col min-h-screen min-w-screen items-center justify-center overflow-hidden">
            <header className="mb-[-40px] z-3">
                <h5 className="text-center font-medium mb-[-20px]">Welcome to</h5>
                <h1 className="text-center font-bold mt-0 text-(--red-500)">ActOne</h1>
            </header>


            <form className="flex flex-col h-[70vh] min-w-[25vw] justify-between p-4 bg-(--dark-200) rounded-2xl" onSubmit={(e) => { e.preventDefault(); }}>
                <fieldset className="flex flex-col justify-around h-[40%] mt-[10%]">
                    <div>
                        <label htmlFor="emailLog" >Email</label>
                        <input id="emailLog" type="email" placeholder="user@gmail.com"></input>
                    </div>

                    <div>
                        <label htmlFor="passwordLog">Password</label>
                        <input id="passwordLog" type="password" placeholder="example_$37"></input>
                    </div>
                </fieldset> 
                
                <div className="flex flex-col items-center w-full h-[20%] ">
                    <button className="p-2 dark-button " type="button" aria-label="Continue with google">
                        <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"/>
                        Continue with Google</button>
                    <a className="m-4" href="/reg">Register</a>
                </div>
                <button className="red-button ml-auto" type="submit" >Continue</button>
            </form>
        </div>
    )
}
