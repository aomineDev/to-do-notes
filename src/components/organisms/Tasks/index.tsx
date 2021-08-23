import { useState, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { useTask } from 'context/task'

import { ITask } from 'types/task'

import Task from 'components/molecules/Task'
import TextField from 'components/atoms/TextField'
import ChipGroup from 'components/atoms/ChipGroup'
import Chip from 'components/atoms/Chip'

import noTasks from 'assets/img/icons/tasks.svg'

import './styles.scss'

type FormEvent = React.FormEvent<HTMLFormElement>

type filterStates = 'inProgress' | 'completed' | 'all'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

const Tasks: React.FC = () => {
  const { state: tasks, dispatch } = useTask()

  const [title, setTitle] = useState<string>('')
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
      <h2 className="tasks__title">Tasks - {filteredTasks.length}</h2>

      <div className="tasks__status">
        <ChipGroup>
          <Chip
            name="task-status"
            label="in progress"
            value="inProgress"
            stateValue={filterState}
            onChange={handleOnStatusChange}
          />
          <Chip
            name="task-status"
            label="completed"
            value="completed"
            stateValue={filterState}
            onChange={handleOnStatusChange}
          />
          <Chip
            name="task-status"
            label="all"
            value="all"
            stateValue={filterState}
            onChange={handleOnStatusChange}
          />
        </ChipGroup>
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
    </div>
  )
}

export default Tasks
