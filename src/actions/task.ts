import type { Dispatch } from 'context/task'
import { ITask } from 'types/task'

interface ITaskActions {
  addTask: (payload: ITask) => void
  updateTask: (payload: ITask) => void
  completeTask: (payload: number) => void
  removeTask: (payload: number) => void
}

export const taskActions = (dispatch: Dispatch): ITaskActions => {
  const addTask = (payload: ITask): void => {
    dispatch({ type: 'add-task', payload })
  }

  const updateTask = (payload: ITask): void => {
    dispatch({ type: 'update-task', payload })
  }

  const completeTask = (payload: number): void => {
    dispatch({ type: 'complete-task', payload })
  }

  const removeTask = (payload: number): void => {
    dispatch({ type: 'remove-task', payload })
  }

  return {
    addTask,
    updateTask,
    completeTask,
    removeTask
  }
}
