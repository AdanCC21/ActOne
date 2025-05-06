import React, { use } from 'react'

export default function Profile() {
    const user = sessionStorage.getItem('user');
    console.log(user);
    return (
        <div>
            <h1>Hola</h1>
        </div>
    )
}
