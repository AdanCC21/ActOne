import React from 'react';
import { data, useNavigate } from 'react-router-dom';
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
                {dataList.length > 0 ? (
                    <> {dataList.map((current) => (
                        <li key={current.id}
                            className="flex px-3 py-4 my-2 rounded-xl items-center bg-(--dark-200)" >
                            <img src={current.profile_image_url || tempUser}
                                className="h-[50px] mr-5 rounded-full object-cover aspect-square" />
                            <h5 className="hover:underline cursor-pointer font-semibold"
                                onClick={() => navigate(`/user/${current.id}`)} >
                                {current.user_name}
                            </h5>
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
                    ))}</>
                ) : (
                    <p className='text-(--gray) text-center'>Empty</p>
                )}
            </ul>
        </div>
    );
}
