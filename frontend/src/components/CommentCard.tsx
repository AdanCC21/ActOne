import React from 'react'
import { Like, Mark, Reports } from './Interactions'
type Props = {
    userUpd: any,
    content: string
}
export default function CommentCard({ userUpd, content }: Props) {
    // Haria un fetch para obtener el usuario mediante el id
    // Otro fetch para encontrar los likes

    return (
        <div className='flex px-2 py-1 mb-2 bg-(--dark-200) rounded-xl'>
            <img src={userUpd.profile_image_url || ''} className='max-h-[30px] mr-2' />

            <div className='flex flex-col'>
                <span className=''>{userUpd.user_name || 'Author not found'}</span>
                <p className='mb-2' style={{ fontSize: '.8em' }}>{content}</p>
                {/* <div className='flex'>
                    <Like extraClass='mr-5' func={() => { }} state={false} amount={0} />
                </div> */}
            </div>

        </div>
    )
}
