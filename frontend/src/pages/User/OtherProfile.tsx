import React, { use, useEffect, useState } from 'react'
import Header from '../../components/Header';
import { GetMultiplesUpd, GetUPD, UpdateUPD } from '../../Hooks/GetUPD';
import { DeleteStory, GetStory } from '../../Hooks/HandleStory';
import { E_UPD } from '../../entities/UPD.entity';
import { E_Story } from '../../entities/Story.entity';
import FeedCard from '../../components/FeedCard'

import tempUser from '../../assets/tempUser.png'
import addFollow from '../../assets/icons/addFoll.svg'
import removeFollow from '../../assets/icons/removeFollow.svg'

import { FaRegUser } from "react-icons/fa";
import { RiUserFollowLine } from "react-icons/ri";
import { useNavigate, useParams } from 'react-router-dom';
import { HandleSession, UpdateSession } from '../../Hooks/HandleSession';
import Modal2 from '../../components/Modal2';
import { Follow } from '../../Hooks/Follow';
import FollowList from '../../components/FollowList';
import { motion } from 'framer-motion';
import { TbScanPosition } from 'react-icons/tb';


export default function OtherProfile() {
    const navigate = useNavigate();
    const { id } = useParams();
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


    const handleFollow = async (userId: number, action: boolean) => {
        console.log(sessionUser, currentUser);
        const follow = await Follow(sessionUser.id, currentUser.id, action);
        if (follow.data) {
            console.log(follow.data);
            sessionUser = follow.data[0];
            UpdateSession(sessionUser);
            window.location.reload()
        } else {
            console.error(follow);
        }
    }

    const [tab, setTab] = useState(0);

    useEffect(() => {
        if (mark === "mark") {
            setTab(1)
        }
        const fetchData = async () => {
            const upd = await GetUPD(Number(id));
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

            const followingFetch = await GetMultiplesUpd(upd.following);
            setFollowing(followingFetch);

            const followersFetch = await GetMultiplesUpd(upd.followers);
            setFollowers(followersFetch);
        }
        fetchData();
    }, [])


    const getList = (list: any) => {
        return (
            <> {list.length > 0 ? (
                <> {list.map((current, index) => {
                    if (current) {
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                className='flex w-full'>
                                <FeedCard extraClass='w-full my-2' story={current.story} session={sessionUser} />
                            </motion.div>
                        )
                    }
                    return (<></>)
                })} </>
            ) : (
                <>
                    <motion.div
                        initial={{ opacity: 0, }}
                        animate={{ opacity: 1, }}
                        transition={{ duration: 0.5 }}
                        className='feed-card flex flex-col'>
                        <span className='m-auto'>Empty...</span>
                    </motion.div>
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

            <Modal2 isOpen={following} onClose={() => (showFollowing(!following))}>
                <FollowList dataList={followingList} sessionUser={sessionUser} handleFollow={handleFollow} title='Following' />
            </Modal2>

            <Modal2 isOpen={followers} onClose={() => (showfollowers(!followers))}>
                <FollowList dataList={followersList} sessionUser={sessionUser} handleFollow={handleFollow} title='Followers' extraClass='' />
            </Modal2>
            {currentUser.id ? (
                <div className='flex h-(--page-h)'>
                    <main className='flex m-auto w-[95%] h-[95%] bg-(--dark-200) p-5 rounded-2xl'>
                        <section className='flex flex-col h-full w-[20%] '>
                            <article className='flex flex-col h-[60%] items-center'>
                                <img className='w-[50%] h-fit my-4 aspect-square object-cover rounded-full mx-auto' src={currentUser.profile_image_url || tempUser} />
                                <h3 className='font-bold'>@{currentUser.user_name}</h3>
                                <p className='text-(--gray) mb-5'>{currentUser.description !== '' ? (<>{currentUser.description}</>) : (<>No hay descripcion</>)}</p>
                                {sessionUser.id !== currentUser.id ? (
                                    <>
                                        {sessionUser.following.includes(currentUser.id) ? (
                                            <button className='btn  mx-auto my-3' onClick={() => {
                                                handleFollow(currentUser.id, false)
                                            }}>
                                                <img src={removeFollow} style={{width:20}} alt='Remove Follow' />
                                                <span className='ml-2'> Unfollow</span>
                                            </button>
                                        ) : (
                                            <button className='btn mx-auto my-3' onClick={() => {
                                                handleFollow(currentUser.id, true)
                                            }}>
                                                <img src={addFollow} style={{width:20}} alt='Add Follow' />
                                                <span className='ml-2'>Follow</span>
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <></>
                                )}
                            </article>
                            <ul className='flex mb-3 mx-auto mt-auto flex-wrap text-[#9a9999]'>
                                <div className='flex mx-auto'>
                                    <li className='flex items-center mx-5 cursor-pointer' onClick={() => { showfollowers(!followers) }}> <FaRegUser className='h-[15px] mr-2' /> {currentUser.followers.length} Followers </li>
                                    <li className='flex items-center mx-5 cursor-pointer' onClick={() => { showFollowing(!following) }}> <RiUserFollowLine className='h-[15px] mr-2' /> {currentUser.following.length} Following</li>
                                </div>
                            </ul>
                        </section>

                        <section className='w-[80%] h-full'>
                            <nav className='flex h-[6%]  w-fit'>
                                <div className={`px-4 py-2 ${tab === 0 ? 'bg-(--yellow-500) text-black font-semibold' : 'bg-(--dark-600) text-(--gray)'} cursor-pointer  rounded-t-md transition-all ease-in-out duration-150`}
                                    onClick={() => { setTab(0) }}><p>Historias Publicadas</p></div>
                            </nav>
                            <article className='story-list p-2 bg-(--dark-400) w-full h-[95%] rounded-b-xl rounded-r-xl overflow-y-auto overflow-x-hidden'>
                                {handleTabs()}
                            </article>
                        </section>
                    </main>
                </div>
            ) : (
                <div className='flex w-screen h-(--page-h) items-center justify-center'>
                    <div className='loader'></div>
                </div>
            )}

        </>
    )
}
