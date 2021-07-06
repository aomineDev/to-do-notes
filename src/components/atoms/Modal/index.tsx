import { useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import './styles.scss'

interface IModalProps {
  isModalOpen: boolean
  closeModal?: () => void
}

const modalRoot = document.getElementById('modal-root') as HTMLElement

const Modal: React.FC<IModalProps> = ({ children, isModalOpen }) => {
  const [transitionModal, setTransitionModal] = useState<boolean>(false)

  let modalBodyClassName: string = 'modal__body'

  if (transitionModal) modalBodyClassName += ' modal__body--active'

  const handleTransitionModal = (): void => {
    setTransitionModal(prevState => !prevState)
  }

  return (
    <CSSTransition
        in={isModalOpen}
        timeout={100}
        classNames="modal"
        unmountOnExit
        appear
        onEntered={handleTransitionModal}
        onExit={handleTransitionModal}
      >
        <div className="modal">
          <div className={modalBodyClassName}>
            {children}
          </div>
        </div>
      </CSSTransition>
  )
}

const ModalPortal: React.FC<IModalProps> = ({ children, closeModal, isModalOpen }) => {
  return createPortal(
    <Modal closeModal={closeModal} isModalOpen={isModalOpen}>{children}</Modal>,
    modalRoot
  )
}

export default ModalPortal
