import { useEffect } from 'react'
import './css/modal.css'

export default function Modal({ closeMod, extraClass, children }) {

  return (
    <div className={`g-modal-bg ${extraClass}`} onClick={()=>{closeMod()}}>
      <div className="g-modal" >
        {children}
      </div>
    </div>
  )
}