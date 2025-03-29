export default function LogIn({ }) {
    return (
        <div className="flex flex-col min-h-screen min-w-screen items-center justify-center overflow-hidden">
            <header>
                <h3>Welcome to</h3>
                <h1>ActOne</h1>
            </header>


            <form className="flex flex-col p-2 " onSubmit={(e) => { e.preventDefault(); }}>
                <fieldset>
                    <div>
                        <label htmlFor="emailLog" >Email</label>
                        <input id="emailLog" type="email" placeholder="user@gmail.com"></input>
                    </div>

                    <div>
                        <label htmlFor="passwordLog">Password</label>
                        <input id="passwordLog" type="password" placeholder="example_$37"></input>
                    </div>
                </fieldset>
                <div>
                    <button type="button" aria-label="Continue with google">Continue with Google</button>
                    <a href="/reg">Register</a>
                </div>
                <button type="submit" >Log In</button>
            </form>
        </div>
    )
}
