import { useState } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Task from 'components/molecules/Task'
import TextField from 'components/atoms/TextField'

import noTasks from 'assets/img/icons/tasks.svg'

import './styles.scss'

interface ITask {
  id: number
  title: string
  description: string
  done: boolean
}

type FormEvent = React.FormEvent<HTMLFormElement>

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [title, setTitle] = useState<string>('')

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()

    if (title === '') return

    const newTask: ITask = {
      title,
      description: '',
      done: false,
      id: Date.now()
    }

    setTasks([newTask, ...tasks])

    setTitle('')
  }

  const deleteTask = (index: number): void => {
    const newTasks: ITask[] = [...tasks]
    newTasks.splice(index, 1)

    setTasks(newTasks)
  }

  const updateTask = (
    index: number,
    title: string,
    description: string
  ): void => {
    const newTasks: ITask[] = [...tasks]
    const task: ITask = tasks[index]

    task.title = title
    task.description = description
    newTasks[index] = task

    setTasks(newTasks)
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
          {tasks.length === 0
            ? (
            <div className="tasks__not-found">
              <img
                src={noTasks}
                alt="no tasks icon"
                className="tasks__not-found__img"
              />
              <p className="tasks__not-found__text">Tasks not found</p>
            </div>
              )
            : (
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
                        deleteTask={deleteTask}
                        updateTask={updateTask}
                      />
                    </CSSTransition>
                  ))}
                </TransitionGroup>
              )
          }
        </div>
      </div>
    </>
  )
}

export default Tasks
