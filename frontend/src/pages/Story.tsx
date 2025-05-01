import React from 'react'
import Header from '../components/Header'
import { Comments, Like, Mark } from '../components/Interactions'
import CommentCard from '../components/CommentCard'
import focus from '../assets/focus.png'

import '../css/story.css'

type Props = {
  id:number
}

export default function Story({id}:Props) {

  return (
    <div className='flex flex-col'>
      <Header />
      <div className='flex flex-nowrap w-screen px-5 py-3 h-(--page-h)'>
        {/* Author Info */}
        <section className='flex flex-col bg-(--dark-400) h-full w-[20%] rounded-xl'>
          {/* Profile */}
          <article className='flex flex-col h-[50%] w-[80%] mx-auto my-2'>
            <img src='https://cdn.discordapp.com/attachments/1088654568218443926/1332548598600171572/6ea8eb171444c0e2cca44fe40c301f91.jpg?ex=6814e0d7&is=68138f57&hm=bdf92dac55a757cad650e0d875247dc99840eca97adcb677edb4993120ba378a&'
              className='w-[200px] rounded-full m-auto ' />
            <h3 className='text-center font-semibold'>Author</h3>
            <span className='text-(--gray) text-center '>Descripcion</span>
            <button className='btn red w-fit mx-auto my-2'>Seguir</button>
          </article>


          <section className='flex flex-col h-[50%]'>
            <article className='comments'>
              <h5 className='font-semibold mb-2'>Comments</h5>
              <div className='flex flex-col'>
                <CommentCard id={1} />
                <CommentCard id={1} />
                <CommentCard id={1} />
                <CommentCard id={1} />
                <CommentCard id={1} />
              </div>
            </article>

            <article className='flex mx-2 justify-around h-[10%] '>
              <Like extraClass='mr-2 my-auto' state={false} func={() => { }} amount={2500000} />
              <Comments extraClass='mx-2 my-auto' func={() => { }} amount={2205} />
              <Mark extraClass='mx-2 my-auto' state={false} func={() => { }} amount={250000} />
            </article>

          </section>

        </section>

        {/* Informacion del acto */}
        <section className='bg-(--dark-400) ml-5 rounded-xl w-[80%] px-10 py-5'>
          <div className='flex h-[15%]'>
            <div>
              <div className='flex'>
                <h1>Titulo makiavelico</h1>
                <button className='btn void self-center ml-2'><img src={focus} /></button>
              </div>
              <h5 className='font-semibold  text-(--red-800)'>Acto numero 1</h5>
            </div>

            <div className='ml-auto flex mt-2'>
              <button className='btn void mr-5'>{`< Acto 0`}</button>
              <button className='btn void' >{`Acto 2 >`}</button>
            </div>
          </div>

          <div className='my-2 overflow-auto pr-[4%] h-[80%]'>
            <p style={{ fontSize: '1.2em' }}>El Lorem Ipsum fue concebido como un texto de relleno, formateado de una cierta manera para permitir la presentación de elementos gráficos en documentos, sin necesidad de una copia formal. El uso de Lorem Ipsum permite a los diseñadores reunir los diseños y la forma del contenido antes de que el contenido se haya creado, dando al diseño y al proceso de producción más libertad.
              <br></br>
              <br></br>
              Se cree ampliamente que la historia de Lorem Ipsum se origina con Cicerón en el siglo I aC y su texto De Finibus bonorum et malorum. Esta obra filosófica, también conocida como En los extremos del bien y del mal, se dividió en cinco libros. El Lorem Ipsum que conocemos hoy se deriva de partes del primer libro Liber Primus y su discusión sobre el hedonismo, cuyas palabras habían sido alteradas, añadidas y eliminadas para convertirlas en un latín sin sentido e impropio.
              <br></br>              <br></br>
              Se cree ampliamente que la historia de Lorem Ipsum se origina con Cicerón en el siglo I aC y su texto De Finibus bonorum et malorum. Esta obra filosófica, también conocida como En los extremos del bien y del mal, se dividió en cinco libros. El Lorem Ipsum que conocemos hoy se deriva de partes del primer libro Liber Primus y su discusión sobre el hedonismo, cuyas palabras habían sido alteradas, añadidas y eliminadas para convertirlas en un latín sin sentido e impropio.

              <br></br><br></br>
              No se sabe exactamente cuándo el texto recibió su forma tradicional actual. Sin embargo, las referencias a la frase "Lorem Ipsum" se pueden encontrar en la Edición de la Biblioteca Clásica Loeb de 1914 del De Finibus en las secciones 32 y 33. Fue en esta edición del De Finibus en la que H. Rackman tradujo el texto.</p>
          </div>
        </section>
      </div>
    </div >
  )
}
