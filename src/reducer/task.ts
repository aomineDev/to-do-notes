import type { State, Action } from 'context/task'
import { ITask } from 'types/task'

export const taskReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'add-task': {
      const tasks: State = [action.payload, ...state]

      return tasks
    }
    case 'update-task': {
      const { id, title, description } = action.payload
      const newTasks: ITask[] = [...state]

      const index: number = newTasks.findIndex(({ id: taskId }) => taskId === id)

      const task: ITask = newTasks[index]

      task.title = title
      task.description = description
      newTasks[index] = task

      return newTasks
    }
    case 'complete-task': {
      const newTasks: ITask[] = [...state]

      const index: number = newTasks.findIndex(({ id }) => id === action.payload)

      newTasks[index].completed = !newTasks[index].completed

      return newTasks
    }
    case 'remove-task': {
      const newTasks: ITask[] = [...state]

      const index: number = newTasks.findIndex(({ id }) => id === action.payload)

      newTasks.splice(index, 1)

      return newTasks
    }
    default: {
      throw new Error('Unhandled action type:')
    }
  }
}
