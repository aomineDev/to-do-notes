import { createPortal } from 'react-dom'
import './styles.scss'

interface ModalProps {
  closeModal?: () => void
}

const modalRoot = document.getElementById('modal-root') as HTMLElement

const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <div className="modal">
      <div className="modal__body">
        {children}
      </div>
    </div>
  )
}

const ModalPortal: React.FC<ModalProps> = ({ children, closeModal }) => {
  return createPortal(
    <Modal closeModal={closeModal}>{children}</Modal>,
    modalRoot
  )
}

export default ModalPortal
