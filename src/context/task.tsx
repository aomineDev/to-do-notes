import { createContext, useReducer, useContext } from 'react'

import { ITask } from 'types/task'

type Action = { type: 'add', payload: ITask} | { type: 'remove', payload: number } | { type: 'update', payload: { id: number, title: string, description: string } } | { type: 'check', payload: number }

type Dispatch = (action: Action) => void

type State = ITask[]

interface Context {
  state: State
  dispatch: Dispatch
}

const TaskContext = createContext<Context | undefined>(undefined)

function taskReducer (state: State, action: Action): State {
  switch (action.type) {
    case 'add': {
      const tasks: State = [action.payload, ...state]

      return tasks
    }
    case 'remove': {
      const newTasks: ITask[] = [...state]

      const index: number = newTasks.findIndex(({ id }) => id === action.payload)

      newTasks.splice(index, 1)

      return newTasks
    }
    case 'update': {
      const { title, description } = action.payload
      const newTasks: ITask[] = [...state]

      const index: number = newTasks.findIndex(({ id }) => id === action.payload.id)

      const task: ITask = newTasks[index]

      task.title = title
      task.description = description
      newTasks[index] = task

      return newTasks
    }
    case 'check': {
      const newTasks: ITask[] = [...state]

      const index: number = newTasks.findIndex(({ id }) => id === action.payload)

      newTasks[index].status = !newTasks[index].status

      return newTasks
    }
    default: {
      throw new Error('Unhandled action type:')
    }
  }
}

export const TaskProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, [])

  const value = { state, dispatch }

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTask (): Context {
  const context = useContext(TaskContext)

  if (context === undefined) {
    throw new Error('useTask must be used without a TaskProvider')
  }

  return context
}
