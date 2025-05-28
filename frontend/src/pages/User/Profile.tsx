import React, { use, useEffect, useState } from 'react'
import Header from '../../components/Header';
import { GetMultiplesUpd, GetUPD, UpdateUPD } from '../../Hooks/GetUPD';
import { DeleteStory, GetStory, UpdateStory } from '../../Hooks/HandleStory';
import { E_UPD } from '../../entities/UPD.entity';
import { E_Story } from '../../entities/Story.entity';
import FeedCard from '../../components/FeedCard'

import pencil from '../../assets/icons/pencil.svg'
import tempUser from '../../assets/tempUser.png'
import '../../css/profile.css'

import { FaEdge, FaRegUser } from "react-icons/fa";
import { RiUserFollowLine } from "react-icons/ri";
import { useNavigate, useParams } from 'react-router-dom';

import { HandleSession, UpdateSession } from '../../Hooks/HandleSession';
import Modal2 from '../../components/Modal2';

import { Follow } from '../../Hooks/Follow';
import FollowList from '../../components/FollowList';
import { motion } from 'framer-motion';


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

    const [modalEditor, setModalEdit] = useState(false);
    const [title, setTitle] = useState("");
    const [alert, setAlert] = useState("");

    const handleStorie = (e) => {
        if (title.length == 0) {
            setAlert("empty title");
            return;
        } else {
            setModalEdit(false);
            navigate(`/edit/${title}`);
        }

    }

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleKey = (e) => {
        if (e.key === "Enter") {
            handleStorie(e);
        }
    }

    const [dataToUpdate, setUpdate] = useState({ user_name: "", profile_image_url: "", description: "" });
    const handleUpdateData = (e: any) => {
        const { name, value } = e.target;
        setUpdate(prev => { return { ...prev, [name]: value } });
    }

    const hanldeSubmitUpdate = async () => {
        sessionUser.user_name = dataToUpdate.user_name;
        sessionUser.profile_image_url = dataToUpdate.profile_image_url;
        sessionUser.description = dataToUpdate.description
        UpdateUPD(sessionUser);
    }

    const handleFollow = async (userId: number, action: boolean) => {
        const follow = await Follow(sessionUser.id, userId, action);
        sessionUser = follow.data[0];
        UpdateSession(sessionUser);
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


    const getList = (list: any) => {
        return (
            <> {list.length > 0 ? (
                <> {list.map((current, index) => {
                    if (current) {
                        let isTheAuthor = false
                        if (current.author_id === sessionUser.id) isTheAuthor = true;
                        return (
                            <motion.div
                                key={index + list}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                className='flex w-full'>
                                <FeedCard extraClass='w-full my-2' edit={true}
                                    story={current.story} session={sessionUser} />
                            </motion.div>
                        )
                    }
                    return (<></>)
                })} </>
            ) : (
                <>
                    {list === pubList ? (
                        <motion.div
                            key={list}
                            className='feed-card'
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}>
                            <h4 className='text-center'>You don't have any storie published</h4>
                            <button className='btn yellow w-fit m-auto' onClick={() => { setModalEdit(true) }}>
                                <h5 className='text-black mr-2'>+</h5>
                                Write something</button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={list}
                            initial={{ opacity: 0, }}
                            animate={{ opacity: 1, }}
                            transition={{ duration: 0.5 }}
                            className='feed-card flex flex-col'>
                            <span className='m-auto'>Empty...</span>
                        </motion.div>
                    )}
                </>
            )
            } </>
        )
    }

    const handleTabs = () => {
        switch (tab) {
            case 0:
                return getList(pubList)
            case 1:
                return getList(markedList)
            case 2:
                return getList(likedList)
        }
    }

    return (
        <>
            <Header />
            {/* Modal de edicion */}
            <Modal2 isOpen={modalState} extraClass='bg-(--dark-300) ' onClose={() => (showModal(!modalState))} >
                <form className='flex flex-col h-full' onSubmit={(e) => { e.preventDefault() }}>
                    <h3 className='font-semibold text-center mb-5'>Edit Profile</h3>
                    <div className='flex flex-col-reverse justify-between my-4'>
                        <fieldset className='flex flex-col mx-5 mt-8 justify-around'>
                            <section className='flex w-full'>
                                <div className='w-1/2 mr-3'>
                                    <label>Name</label>
                                    <input className='inp w-full ' placeholder='Your new name' name='user_name' value={dataToUpdate.user_name} onChange={(e) => { handleUpdateData(e) }} />
                                </div>
                                <div className='w-1/2'>
                                    <label>Image Url</label>
                                    <input className='inp w-full  text-(--gray)' placeholder='Your new url' name='profile_image_url' value={dataToUpdate.profile_image_url} onChange={(e) => { handleUpdateData(e) }} />
                                </div>
                            </section>
                            <div>
                                <label>Description</label>
                                <input className='inp w-full  text-(--gray)' placeholder='Your new description' name='description' value={dataToUpdate.description} onChange={(e) => { handleUpdateData(e) }} />
                            </div>
                        </fieldset>

                        <section className='flex flex-col ml-5'>
                            <img src={dataToUpdate.profile_image_url || sessionUser.profile_image_url} className='w-[200px] h-fit aspect-square object-cover mx-auto my-2 rounded-full' />
                            <h3 className='font-semibold'>{dataToUpdate.user_name || currentUser.user_name}</h3>
                            <span className='text-(--gray)'>{dataToUpdate.description || currentUser.description}</span>
                        </section>
                    </div>
                    <div className='flex ml-auto mt-5'>
                        <button className='btn void mr-3' onClick={() => { showModal(!modalState) }}>Cancel</button>
                        <button className='btn yellow' onClick={() => { hanldeSubmitUpdate() }}>Update</button>
                    </div>
                </form>
            </Modal2>

            <Modal2 isOpen={following} onClose={() => (showFollowing(!following))}>
                <div>
                    <FollowList dataList={followingList} sessionUser={sessionUser} handleFollow={handleFollow} title='Following' />
                    <button className='btn void ml-auto mt-5' onClick={() => { showFollowing(!following) }}>Exit</button>
                </div>
            </Modal2>

            <Modal2 isOpen={followers} onClose={() => (showfollowers(!followers))}>
                <div>
                    <FollowList dataList={followersList} sessionUser={sessionUser} handleFollow={handleFollow} title='Followers' extraClass='' />
                    <button className='btn void ml-auto mt-5' onClick={() => { showfollowers(!followers) }}>Exit</button>
                </div>
            </Modal2>

            {/* Editor Modal */}
            <Modal2 isOpen={modalEditor} onClose={() => { setModalEdit(false) }} extraClass='max-w-[25vw]'>
                <form className='flex flex-col px-2' onSubmit={(e) => { handleStorie(e); e.preventDefault(); }}>
                    <label htmlFor='title'><h3 className='text-(--yellow-500) font-semibold my-2'>Title</h3></label>
                    {alert ? (
                        <span className='text-red-600'>{alert}</span>
                    ) : (
                        <span className='text-(--gray)'>Use a short title for your story</span>
                    )}
                    <div className='flex flex-col my-2'>
                        <input id='title' placeholder='Title' maxLength={30} className='inp'
                            name='title' value={title} onChange={(e) => { handleTitle(e) }} onKeyDown={(e) => { handleKey(e) }} />
                        <small className='ml-auto mt-2 mr-2 text-(--gray)'>{title.length} / 30</small>
                    </div>

                    <div className='flex w-full ml-auto mt-5'>
                        <button type='button' className='btn void w-fit ml-auto ' onClick={() => { setModalEdit(false); setAlert('') }}>Cancel</button>
                        <button type='submit' className='btn yellow w-fit ml-3'>Continue</button>
                    </div>
                </form>
            </Modal2>

            <div className='flex h-(--page-h)'>
                <main className='flex m-auto w-[95%] h-[95%] bg-(--dark-200) p-5 rounded-2xl'>
                    <section className='flex flex-col h-full w-[20%] '>
                        <article className='flex flex-col h-[60%] items-center'>
                            <img className='w-[50%] h-fit my-4 aspect-square object-cover rounded-full mx-auto' src={sessionUser.profile_image_url || tempUser} />
                            <div className='flex items-center'>
                                <h3 className='font-bold mr-4'>@{currentUser.user_name} </h3>
                                <img className='w-[1em] h-[1em] cursor-pointer duration-200 ease-in-out' src={pencil} alt='edit profile' onClick={() => { showModal(!modalState) }} />
                            </div>
                            <p className='text-(--gray) text-center mt-3'>{currentUser.description !== '' ? (<>{currentUser.description}</>) : (<>No hay descripcion</>)}</p>
                        </article>
                        <ul className='flex mb-3 mx-auto mt-auto flex-wrap text-[#9a9999]'>
                            <div className='flex mx-auto'>
                                <li className='flex items-center mx-5 cursor-pointer' onClick={() => { showfollowers(!followers) }}>
                                    <FaRegUser className='h-[15px] mr-2' /> {currentUser.followers.length} Followers </li>
                                <li className='flex items-center mx-5 cursor-pointer' onClick={() => { showFollowing(!following) }}>
                                    <RiUserFollowLine className='h-[15px] mr-2' /> {currentUser.following.length} Following </li>
                            </div>
                        </ul>
                    </section>

                    <section className='w-[80%] h-full'>
                        <nav className='flex h-[6%]  w-fit'>
                            <div className={`px-4 py-2 ${tab === 0 ? 'bg-(--yellow-500) text-black font-semibold' : 'bg-(--dark-600) text-(--gray)'} cursor-pointer  rounded-t-md transition-all ease-in-out duration-150`}
                                onClick={() => { setTab(0) }}><p>Published stories</p></div>
                            <div className={`px-4 py-2 ${tab === 1 ? 'bg-(--yellow-500) text-black font-semibold' : 'bg-(--dark-600) text-(--gray)'} cursor-pointer rounded-t-md`}
                                onClick={() => { setTab(1) }}><p>Saved stories</p></div>
                            <div className={`px-4 py-2 ${tab === 2 ? 'bg-(--yellow-500) text-black font-semibold' : 'bg-(--dark-600) text-(--gray)'} cursor-pointer rounded-t-md`}
                                onClick={() => { setTab(2) }}><p>Likes</p></div>
                        </nav>
                        <article className='story-list p-2 bg-(--dark-400) w-full h-[95%] rounded-b-xl rounded-r-xl overflow-y-auto overflow-x-hidden'>
                            {handleTabs()}
                        </article>
                    </section>
                </main>
            </div>
        </>
    )
}
