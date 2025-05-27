import React from 'react'
import { Like, Mark, Reports } from './Interactions'
import { useNavigate } from 'react-router-dom'
type Props = {
    userUpd: any,
    content: string
}
export default function CommentCard({ userUpd, content }: Props) {
    if (!userUpd) return (<></>)
    const navigate = useNavigate();
    return (
        <div className='flex px-2 py-1 mb-2 bg-(--dark-200) rounded-xl cursor-pointer' onClick={() => { navigate(`/user/${userUpd.id}`)}}>
            <img src={userUpd.profile_image_url || ''} className='max-h-[30px] mr-2 rounded-full aspect-square object-cover' />

            <div className='flex flex-col'>
                <span className=''>{userUpd.user_name || 'Author not found'}</span>
                <p className='mb-2' style={{ fontSize: '.8em' }}>{content}</p>
            </div>

        </div>
    )
}
