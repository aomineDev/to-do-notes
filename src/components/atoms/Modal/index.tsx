import { createPortal } from 'react-dom'
import './styles.scss'

interface IModal {
  closeModal?: () => void
}

const modalRoot = document.getElementById('modal-root') as HTMLElement

const Modal: React.FC<IModal> = ({ children }) => {
  return (
    <div className="modal">
      <div className="modal__body">
        {children}
      </div>
    </div>
  )
}

const ModalPortal: React.FC<IModal> = ({ children, closeModal }) => {
  return createPortal(
    <Modal closeModal={closeModal}>{children}</Modal>,
    modalRoot
  )
}

export default ModalPortal
