import React from 'react'
import { Like, Mark, Reports } from './Interactions'

type Props = {
    id: number,
}
export default function CommentCard({ id }: Props) {

    return (
        <div className='flex px-2 py-1 mb-2 bg-(--dark-200) rounded-xl'>
            <img src='https://cdn.discordapp.com/attachments/1088654568218443926/1332548598600171572/6ea8eb171444c0e2cca44fe40c301f91.jpg?ex=6814e0d7&is=68138f57&hm=bdf92dac55a757cad650e0d875247dc99840eca97adcb677edb4993120ba378a&' className='w-[10%] h-fit rounded-full mr-2' />
            
            <div className='flex flex-col'>
                <span className=''>Nombre del Autor</span>
                <p className='mb-2' style={{fontSize:'.8em'}}>Contenido del comentario todo jediondo</p>
                <div className='flex'>
                    <Like extraClass='mr-5' func={()=>{}} state={false} amount={0} />
                    <Reports  func={()=>{}} amount={0} />
                </div>
            </div>
            
        </div>
    )
}
