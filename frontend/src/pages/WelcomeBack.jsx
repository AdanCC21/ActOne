import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function WelcomeBack({ }) {
    const { name } = useParams();
    const navigate = useNavigate();
    
    return (
        <div className="flex flex-col min-h-screen min-w-screen items-center justify-center overflow-hidden">
            
                <div className='flex flex-col m-auto text-center'>
                    <h3>Bienvenido</h3>
                    <h1 className='text-(--red-500) font-bold uppercase mx-2'>{name}</h1>
                </div>

                {/* <div className="flex w-full justify-between">
                    <button className="red-button  " type="submit" onClick={() => {navigate('/home')}} >Next</button>
                </div> */}
            
        </div>
    )
}


