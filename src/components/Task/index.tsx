import Tooltip from 'components/Tooltip'

import './styles.css'

interface TaskProps {
  title: string
  description: string
}

const Task: React.FC<TaskProps> = ({ title, description }) => {
  return (
    <div className="task">
      <div className="task__check-box">
        <div className="task__check">
          <div className="task__check-icon"></div>
        </div>
      </div>
      <div className="task__body">
        <h2 className="task__title">{title}</h2>
        <p className="task__description">{description}</p>
      </div>
      <div className="task__options">
        <Tooltip title="options" placement="bottom">
          <div className="task__doots">
            <div className="task__doots-icon"></div>
          </div>
        </Tooltip>
      </div>
    </div>
  )
}

export default Task
