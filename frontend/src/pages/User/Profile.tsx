import React, { use, useEffect, useState } from 'react'
import Header from '../../components/Header';
import { GetMultiplesUpd, GetUPD, UpdateUPD } from '../../Hooks/GetUPD';
import { DeleteStory, GetStory } from '../../Hooks/HandleStory';
import { E_UPD } from '../../entities/UPD.entity';
import { E_Story } from '../../entities/Story.entity';
import FeedCard from '../../components/FeedCard'

import Like from '../../assets/void_like.png';
import VoidMark from '../../assets/mark.png';
import Comments from '../../assets/comments.svg'
import { FaRegTrashAlt, FaRegUser } from "react-icons/fa";
import { RiUserFollowLine } from "react-icons/ri";
import { useNavigate, useParams } from 'react-router-dom';
import { HandleSession, UpdateSession } from '../../Hooks/HandleSession';
import Modal2 from '../../components/Modal2';


export default function Profile() {
    const navigate = useNavigate();
    let sessionUser;
    try {
        sessionUser = HandleSession(sessionStorage.getItem('user') || 'invitado');
        if (!sessionUser) throw new Error('session invalid');
    } catch (e) {
        console.error(e);
        navigate('/error');
    }

    const { mark } = useParams();
    const [modalState, showModal] = useState(false);

    const [following, showFollowing] = useState(false);
    const [followingList, setFollowing] = useState<Array<any>>([]);

    const [followers, showfollowers] = useState(false);
    const [followersList, setFollowers] = useState<Array<any>>([]);

    const [currentUser, setUser] = useState(new E_UPD());
    const [pubList, setPub] = useState([{ story: new E_Story(), upd: new E_UPD() }]);
    const [markedList, setMarked] = useState([{ story: new E_Story(), upd: new E_UPD() }]);
    const [likedList, setLikedPub] = useState([{ story: new E_Story() }]);

    const [dataToUpdate, setUpdate] = useState({ user_name: "", profile_image_url: "", description: "" });
    const handleUpdateData = (e: any) => {
        const { name, value } = e.target;
        setUpdate(prev => { return { ...prev, [name]: value } });
    }

    const hanldeSubmitUpdate = async () => {
        UpdateUPD(sessionUser);
    }

    const [tab, setTab] = useState(0);

    useEffect(() => {
        if (mark === "mark") {
            setTab(1)
        }
        const fetchData = async () => {
            const upd = await GetUPD(Number(sessionUser.id));
            if (!upd) return;
            setUser(upd);

            if (upd.published_stories.length > 0) {
                const pubStories = await Promise.all(upd.published_stories.map(async (current, index) => {
                    const story = await GetStory(current);
                    if (!story) return;
                    return story
                }));
                setPub(pubStories);
            } else { setPub([]) }


            const likedStories = await Promise.all(upd.stories_liked.map(async (current, index) => {
                const story = await GetStory(current);
                if (!story) return;
                return story
            }));
            setLikedPub(likedStories);


            const markStories = await Promise.all(upd.marked_stories.map(async (current, index) => {
                const story = await GetStory(current);
                if (!story) return;
                return story
            }));
            markStories.length > 0 ? setMarked(markStories) : setMarked([]);

            const followingFetch = await GetMultiplesUpd(sessionUser.following);
            setFollowing(followingFetch);

            const followersFetch = await GetMultiplesUpd(sessionUser.followers);
            setFollowers(followersFetch);

            console.log(sessionUser);

            setUpdate({ user_name: sessionUser.user_name, profile_image_url: sessionUser.profile_image_url, description: sessionUser.description })
        }
        fetchData();
    }, [])


    const handleTabs = () => {
        switch (tab) {
            case 0:
                return (
                    <>
                        {pubList.map((current, index) => (
                            <div key={index}>
                                <button className='absolute cursor-pointer btn red' onClick={()=>{DeleteStory(current.story.id, sessionUser)}}>
                                    <FaRegTrashAlt />
                                </button>
                                <section className='ml-3 h-full'>
                                    <FeedCard story={current.story} />
                                </section>
                            </div>))}
                    </>
                )
            case 1:
                return (
                    markedList.map((current, index) => {
                        return (
                            <div key={index} >
                                <FeedCard story={current.story} />
                            </div>
                        )
                    }))
            case 2:
                return (
                    likedList.map((current, index) => {
                        return (
                            <div key={index} >
                                <FeedCard story={current.story} />
                            </div>
                        )
                    }))
            default:
                return (
                    <>
                        {pubList.map((current, index) => (
                            <div key={index} >
                                {current.story.id != 0 ?
                                    (<FeedCard story={current.story} authorName={currentUser.user_name || sessionUser?.user_name} />) :
                                    (<span>You don't have stories</span>)}
                            </div>))}
                    </>
                )
        }
    }

    return (
        <>
            <Header />
            {/* Modal de edicion */}
            <Modal2 isOpen={modalState} extraClass='bg-(--dark-300) w-[50vw]' onClose={() => (showModal(!modalState))} >
                <form className='flex flex-col h-full' onSubmit={(e) => { e.preventDefault() }}>
                    <h3 className='font-semibold text-center mb-5'>Editar Perfil</h3>
                    <div className='flex justify-between my-4'>
                        <fieldset className='flex flex-col ml-5 justify-around'>
                            <div>
                                <label>Name</label>
                                <input placeholder='Your new name' name='user_name' value={dataToUpdate.user_name} onChange={(e) => { handleUpdateData(e) }} />
                            </div>
                            <div>
                                <label>Image Url</label>
                                <input className='text-(--gray)' placeholder='Your new url' name='profile_image_url' value={dataToUpdate.profile_image_url} onChange={(e) => { handleUpdateData(e) }} />
                            </div>
                            <div>
                                <label>Description</label>
                                <input className='text-(--gray)' placeholder='Your new description' name='description' value={dataToUpdate.description} onChange={(e) => { handleUpdateData(e) }} />
                            </div>
                        </fieldset>

                        <section className='flex flex-col mr-5'>
                            <img src={dataToUpdate.profile_image_url || sessionUser.profile_image_url} className='w-[200px] h-fit aspect-square object-cover mx-auto my-2 rounded-full' />
                            <h3>{dataToUpdate.user_name || currentUser.user_name}</h3>
                            <span className='text-(--gray)'>{dataToUpdate.description || currentUser.description}</span>
                        </section>
                    </div>
                    <div className='flex ml-auto mt-5'>
                        <button className='btn void' onClick={() => { showModal(!modalState) }}>Cancel</button>
                        <button className='btn red' onClick={() => { hanldeSubmitUpdate() }}>Update</button>
                    </div>
                </form>
            </Modal2>

            <Modal2 isOpen={following} onClose={() => (showFollowing(!following))}>
                <div>
                    <h2>Following</h2>
                    <ul>
                        {followingList.map((current: any) => (
                            <div className='px-2 py-2 bg-(--dark-200) my-2 flex'>
                                <img src={current.profile_image_url} className='h-[50px] rounded-full object-cover aspect-square' />
                                <p>{current.user_name}</p>
                            </div>
                        ))}
                    </ul>
                </div>
            </Modal2>

            <Modal2 isOpen={followers} onClose={() => (showfollowers(!followers))}>
                <div>
                    <h2>Followers</h2>
                    <ul>
                        {followersList.map((current: any) => (
                            <div className='px-2 py-2 bg-(--dark-200) my-2 flex'>
                                <img src={current.profile_image_url} className='h-[50px] rounded-full object-cover aspect-square' />
                                <p>{current.user_name}</p>
                            </div>
                        ))}
                    </ul>
                </div>
            </Modal2>

            <div className='flex h-(--page-h)'>
                <main className='flex m-auto w-[95%] h-[95%] bg-(--dark-200) p-5 rounded-2xl'>
                    <section className='flex flex-col h-full w-[20%] '>
                        <article className='flex flex-col h-[60%] my-auto items-center'>

                            <img className='w-[50%] h-fit my-4 aspect-square object-cover rounded-full mx-auto' src={sessionUser.profile_image_url} />
                            <h4 className='font-bold'>@{currentUser.user_name}</h4>
                            <p className='text-(--gray)'>{currentUser.description !== '' ? (<>{currentUser.description}</>) : (<>No hay descripcion</>)}</p>
                            <button className='btn void my-2' onClick={() => { showModal(!modalState) }}>Editar perfil</button>
                        </article>
                        <ul className='flex mb-3 mx-auto flex-wrap text-[#9a9999]'>
                            <div className='flex mx-auto'>
                                <li className='flex items-center mx-5'> <img src={Like} className='h-[15px] mr-2' /> 0 </li>
                                <li className='flex items-center mx-5'> <img src={Comments} className='h-[15px] mr-2' /> 0 </li>
                                <li className='flex items-center mx-5'> <img src={VoidMark} className='h-[15px] mr-2' /> 0 </li>
                            </div>
                            <div className='flex mx-auto'>
                                <li className='flex items-center mx-5 cursor-pointer' onClick={() => { showfollowers(!followers) }}> <FaRegUser className='h-[15px] mr-2' /> {currentUser.followers.length} </li>
                                <li className='flex items-center mx-5 cursor-pointer' onClick={() => { showFollowing(!following) }}> <RiUserFollowLine className='h-[15px] mr-2' /> {currentUser.following.length} </li>
                            </div>
                        </ul>
                    </section>

                    <section className='w-[80%] h-full'>
                        <nav className='flex h-[6%]'>
                            <div className={`px-4 py-2 ${tab === 0 ? 'bg-(--dark-400) text-(--yellow-500) font-semibold' : 'bg-(--dark-800) text-(--gray)'} cursor-pointer  rounded-t-md transition-all ease-in-out duration-150`}
                                onClick={() => { setTab(0) }}><p>Historias Publicadas</p></div>
                            <div className={`px-4 py-2 ${tab === 1 ? 'bg-(--dark-400) text-(--yellow-500) font-semibold' : 'bg-(--dark-600) text-(--gray)'} cursor-pointer rounded-t-md`}
                                onClick={() => { setTab(1) }}><p>Historias Guardadas</p></div>
                            <div className={`px-4 py-2 ${tab === 2 ? 'bg-(--dark-400) text-(--yellow-500) font-semibold' : 'bg-(--dark-600) text-(--gray)'} cursor-pointer rounded-t-md`}
                                onClick={() => { setTab(2) }}><p>Me Gusta</p></div>
                        </nav>
                        <article className='grid grid-cols-2 gap-5 p-2 bg-(--dark-400) w-full h-[90%]'>
                            {handleTabs()}
                        </article>
                    </section>
                </main>
            </div>
        </>
    )
}
