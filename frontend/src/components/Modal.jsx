import { useEffect } from 'react'
import './css/modal.css'

export default function Modal({ isOpen, extraClass, children }) {

  return (
    <div className={`g-modal-bg ${extraClass}`}>
      <div className="g-modal" >
        {children}
      </div>
    </div>
  )
}
