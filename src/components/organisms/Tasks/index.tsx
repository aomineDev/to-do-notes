import { useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { useTask } from 'context/task'

import { ITask } from 'types/task'

import Task from 'components/molecules/Task'
import TextField from 'components/atoms/TextField'

import noTasks from 'assets/img/icons/tasks.svg'

import './styles.scss'

type FormEvent = React.FormEvent<HTMLFormElement>

const Tasks: React.FC = () => {
  const { state: tasks, dispatch } = useTask()
  const [title, setTitle] = useState<string>('')

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
    <>
      <h2 className="tasks__title">Tasks</h2>
      <div className="tasks">
        <form onSubmit={handleSubmit}>
          <TextField
            placeholder="Add a Task"
            setValue={setTitle}
            value={title}
          />
        </form>
        <div className="tasks__wrapper">
          <TransitionGroup>
            {tasks.map(({ id, title, description }: ITask, index: number) => (
              <CSSTransition
                key={id}
                timeout={300}
                classNames="tasks__transition"
              >
                <Task
                  id={id}
                  index={index}
                  title={title}
                  description={description}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>

          {tasks.length === 0 &&
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
    </>
  )
}

export default Tasks
