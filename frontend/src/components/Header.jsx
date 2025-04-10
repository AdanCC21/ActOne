import appIocon from '../assets/appIcon.svg'
import update from '../assets/update.svg'
import notification from '../assets/notification.svg'
import searcher from '../assets/buscador.png'
import tempUser from '../assets/tempUser.png'
import './css/header.css'

export default function Header({ }) {
    const showModal = () => {
        return (
            <div className=' bg-(--dark-400)' >
                <h1>Titulo</h1>
            </div>
        )
    }
    return (
        <header className='header'>
            <div className='flex flex-row items-center h-full ml-3'>
                <img className='h-[50%] my-auto mr-3' src={appIocon} alt='actOneIcon' />
                <h3 className='my-auto font-semibold text-(--red-500)'>ActOne</h3>
            </div>

            <div className='h-nav'>
                <form className='flex flex-row bg-(--dark-500)' onSubmit={(e) => { e.preventDefault(); }}>
                    <input className='rounded-2xl' id='searcher' type='text' ></input>
                    <button className="btn m-auto " type="button" aria-label="search something">
                        <img src={searcher} alt='searcher' />
                    </button>
                </form>
                <div>
                    <button className='btn'  onClick={() => { showModal() }}>
                        <img src={update} alt='update storie' />
                    </button>
                    <img src={notification} alt='notification' />
                    <img className='user-icon' src={tempUser} alt='user' />
                </div>
            </div>
        </header>
    )
}
