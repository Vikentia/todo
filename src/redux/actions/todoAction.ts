export const CHANGE_TITLE = 'CHANGE_TITLE';
export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const CHANGE_TASK_STATUS = 'CHANGE_TASK_STATUS';
export const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE';

export const changeTitle = (title: string) => {
    return { type: CHANGE_TITLE, payload: { title } } as const;
}
export const addTask = (title: string) => {
    return { type: ADD_TASK, payload: { title } } as const;
}
export const deleteTask = (id: string) => {
    return { type: DELETE_TASK, payload: { id } } as const;
}
export const changeStatus = (id: string, value: boolean) => {
    return { type: CHANGE_TASK_STATUS, payload: { id, value } } as const;
}
export const changeTaskTitle = (id: string, title: string) => {
    return { type: CHANGE_TASK_TITLE, payload: { id, title } } as const;
}


//types
export type ChangeTitleActionType = ReturnType<typeof changeTitle>
export type AddTaskActionType = ReturnType<typeof addTask>
export type DeleteTaskActionType = ReturnType<typeof deleteTask>
export type ChangeStatusActionType = ReturnType<typeof changeStatus>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitle>