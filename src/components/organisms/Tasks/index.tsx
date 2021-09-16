import { useState, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { useTask } from 'context/task'

import { ITask } from 'types/task'

import Task from 'components/molecules/Task'
import TextField from 'components/atoms/TextField'
import RadioGroup from 'components/atoms/RadioGroup'
import Radio from 'components/atoms/Radio'
import Alert from 'components/atoms/Alert'

import noTasks from 'assets/img/icons/tasks.svg'

import './styles.scss'

type FormEvent = React.FormEvent<HTMLFormElement>

type filterStates = 'inProgress' | 'completed' | 'all'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

const Tasks: React.FC = () => {
  const { state: tasks, dispatch } = useTask()

  const [title, setTitle] = useState<string>('')
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [filteredTasks, setFilteredTasks] = useState<ITask[]>(() => tasks.filter(({ status }) => !status))
  const [filterState, setFilterState] = useState<filterStates>('inProgress')

  useEffect(() => {
    switchStatus(filterState)
  }, [tasks])

  const handleOnStatusChange = (e: ChangeEvent): void => {
    switchStatus(e.target.value)
  }

  const handleShowInProgress = (): void => {
    setFilteredTasks(tasks.filter(({ status }) => !status))
    setFilterState('inProgress')
  }

  const handleShowCompleted = (): void => {
    setFilteredTasks(tasks.filter(({ status }) => status))
    setFilterState('completed')
  }

  const handleShowAll = (): void => {
    setFilteredTasks([...tasks])
    setFilterState('all')
  }

  const switchStatus = (value: string): void => {
    if (value === 'inProgress') handleShowInProgress()
    else if (value === 'completed') handleShowCompleted()
    else if (value === 'all') handleShowAll()
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()

    if (title === '') return

    const newTask: ITask = {
      title,
      description: '',
      status: false,
      id: Date.now()
    }

    dispatch({ type: 'add', payload: newTask })

    setTitle('')
  }

  return (
    <div className="tasks">
      <div className="tasks__head">
        <h2 className="tasks__title">Tasks<span className="tasks__title--length">{filteredTasks.length}</span></h2>

        <div className="tasks__status">
          <RadioGroup>
            <Radio
              name="task-status"
              label="in progress"
              value="inProgress"
              style="tab"
              stateValue={filterState}
              onChange={handleOnStatusChange}
            />
            <Radio
              name="task-status"
              label="completed"
              value="completed"
              style="tab"
              stateValue={filterState}
              onChange={handleOnStatusChange}
            />
            <Radio
              name="task-status"
              label="all"
              value="all"
              style="tab"
              stateValue={filterState}
              onChange={handleOnStatusChange}
            />
          </RadioGroup>
        </div>
      </div>

      <div className="tasks__body">
        <form onSubmit={handleSubmit} className="tasks__form">
          <TextField
            placeholder="Add a Task"
            setValue={setTitle}
            value={title}
          />
        </form>
        <div className="tasks__wrapper">
          <TransitionGroup>
            {filteredTasks.map(({ id, title, description, status }: ITask) => (
              <CSSTransition
                key={id}
                timeout={150}
                classNames="tasks__transition"
              >
                <Task
                  id={id}
                  title={title}
                  description={description}
                  status={status}
                  setShowAlert={setShowAlert}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>

          {filteredTasks.length === 0 &&
            (
              <div className="tasks__not-found">
                <img
                  src={noTasks}
                  alt="no tasks icon"
                  className="tasks__not-found__img"
                />
                <p className="tasks__not-found__text">Tasks not found</p>
              </div>
            )
          }
        </div>
      </div>

      <Alert show={showAlert} setShow={setShowAlert} text='Tarea eliminada.' />
    </div>
  )
}

export default Tasks
