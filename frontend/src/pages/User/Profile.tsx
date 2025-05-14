import React, { use } from 'react'
import RichText from '../../components/EditorComponent';

export default function Profile() {
    const user = sessionStorage.getItem('user');
    console.log(user);
    return (
        <div>
            <RichText/>
        </div>
    )
}
