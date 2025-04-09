import appIocon from '../assets/appIcon.svg'
import update from '../assets/update.svg'
import notification from '../assets/notification.svg'
import searcher from '../assets/buscador.png'
import tempUser from '../assets/tempUser.png'
import '../css/header.css'

export default function Header({ }) {
    return (
        <header className='header bg-(--dark-200)'>
            <div className='flex flex-row items-center h-full'>
                <img className='h-[50%] m-auto' src={appIocon} alt='actOneIcon' />
                <h3 className='font-semibold text-(--red-500)'>ActOne</h3>
            </div>

            <div className='h-nav'>
                <form className='flex flex-row bg-(--dark-500)' onSubmit={(e) => { e.preventDefault(); }}>
                    <input className='rounded-2xl' id='searcher' type='text' ></input>
                    <button className="void-button m-auto " type="button" aria-label="search something">
                        <img src={searcher} alt='searcher' />
                    </button>
                </form>
                <div>
                    <img src={update} alt='update storie' />
                    <img src={notification} alt='notification' />
                    <img className='user-icon' src={tempUser} alt='user' />
                </div>
            </div>
        </header>
    )
}
