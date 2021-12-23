import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faExclamation, faInfo } from '@fortawesome/free-solid-svg-icons'

import './styles.scss'

type Status = 'success' | 'error' | 'info' | 'warning'

interface IAlertProps {
  show: boolean
  setShow: (val: boolean) => void
  text: string
  time?: number
  status?: Status
}

const alertRoot = document.getElementById('alert-root') as HTMLElement

const Alert: React.FC<IAlertProps> = ({ show, setShow, text, time = 3000, status = 'success' }) => {
  const alertClassName: string = `alert alert--${status}`

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        if (show) setShow(false)
      }, time)
    }
  }, [show])

  let StatusIcon = faCheck

  if (status === 'error') StatusIcon = faTimes
  if (status === 'warning') StatusIcon = faExclamation
  if (status === 'info') StatusIcon = faInfo

  const handleClick = (): void => {
    setShow(false)
  }

  return (
    <CSSTransition
      in={show}
      timeout={500}
      classNames='alert'
      unmountOnExit
      appear
    >
      <div className={alertClassName} onClick={handleClick}>
        <div className="alert__body">
          <FontAwesomeIcon icon={StatusIcon} />
          <p className='alert__text'>{text}</p>
        </div>
      </div>
    </CSSTransition>
  )
}

const AlertPortal: React.FC<IAlertProps> = ({ show, setShow, text, time, status }) => {
  return createPortal(
    <Alert
      show={show}
      setShow={setShow}
      text={text}
      time={time}
      status={status}
    />,
    alertRoot
  )
}

export default AlertPortal
