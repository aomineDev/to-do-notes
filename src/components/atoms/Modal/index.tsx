import { useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import './styles.scss'

interface IModalProps {
  isModalOpen: boolean
  width?: string
  height?: string
  mobileFullSize?: boolean
  closeModal?: () => void
}

const modalRoot = document.getElementById('modal-root') as HTMLElement

const Modal: React.FC<IModalProps> = ({
  children,
  width = 'auto',
  height = 'auto',
  mobileFullSize = false,
  isModalOpen
}) => {
  const [transitionModal, setTransitionModal] = useState<boolean>(false)

  let modalBodyClassName: string = 'modal__body'

  if (mobileFullSize) modalBodyClassName += ' modal__body--mobile-full-size'
  if (transitionModal) modalBodyClassName += ' modal__body--active'

  const handleTransitionModal = (): void => {
    setTransitionModal(prevState => !prevState)
  }

  return (
    <CSSTransition
      in={isModalOpen}
      timeout={100}
      classNames='modal'
      unmountOnExit
      appear
      onEntered={handleTransitionModal}
      onExit={handleTransitionModal}
    >
      <div className='modal'>
        <div
          className={modalBodyClassName}
          style={{ width: width, height: height }}
        >
          {children}
        </div>
      </div>
    </CSSTransition>
  )
}

const ModalPortal: React.FC<IModalProps> = ({
  children,
  closeModal,
  width,
  height,
  mobileFullSize,
  isModalOpen
}) => {
  return createPortal(
    <Modal
      closeModal={closeModal}
      isModalOpen={isModalOpen}
      width={width}
      height={height}
      mobileFullSize={mobileFullSize}
    >
      {children}
    </Modal>,
    modalRoot
  )
}

export default ModalPortal
