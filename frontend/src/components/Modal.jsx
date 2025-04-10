export default function Modal({children}) {
  return (
    <dialog>
        <div>
            {children}
        </div>
        <div>
            <button>Cancel</button>
            <button >Continue</button>
        </div>
    </dialog>
  )
}
