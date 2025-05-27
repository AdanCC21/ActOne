import React from 'react';
import { useNavigate } from 'react-router-dom';
import { E_UPD } from '../entities/UPD.entity';
import tempUser from '../assets/tempUser.png'

type User = {
    id: number;
    user_name: string;
    profile_image_url: string;
};

type Props = {
    dataList: E_UPD[];
    sessionUser: E_UPD
    handleFollow: (userId: number, follow: boolean) => void;
    title: string,
    extraClass?: string
};

export default function FollowList({ dataList, sessionUser, handleFollow, title, extraClass }: Props) {
    const navigate = useNavigate();

    return (
        <div className={`${extraClass}`}>
            <h2 className='font-semibold mb-2'>{title}</h2>
            <ul>
                {dataList.map((current) => (
                    <li key={current.id}
                        className="flex px-2 py-2 my-2 items-center bg-(--dark-200)" >
                        <img src={current.profile_image_url || tempUser}
                            className="h-[50px] mr-2 rounded-full object-cover aspect-square" />
                        <p className="hover:underline cursor-pointer"
                            onClick={() => navigate(`/user/${current.id}`)} >
                            {current.user_name}
                        </p>
                        {sessionUser.id !== current.id ? (
                            <>
                                {sessionUser.following.includes(current.id) ? (
                                    <button className='btn yellow ml-auto' onClick={() => {
                                        handleFollow(current.id, false)
                                    }}>Unfollow</button>
                                ) : (
                                    <button className='btn yellow ml-auto' onClick={() => {
                                        handleFollow(current.id, true)
                                        
                                    }}>Follow</button>
                                )
                                }
                            </>
                        ) : (
                            <></>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
