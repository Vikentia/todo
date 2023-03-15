import { TaskType } from "../../App";
import {
    CHANGE_TITLE,
    ADD_TASK,
    CHANGE_TASK_STATUS,
    DELETE_TASK,
    CHANGE_TASK_TITLE,
    ChangeTitleActionType,
    AddTaskActionType,
    DeleteTaskActionType,
    ChangeStatusActionType,
    ChangeTaskTitleActionType,
} from '../actions/todoAction';
import { v1 } from 'uuid';


const initialState = {
    title: 'Todolist',
    tasks: [] as TaskType[],
}

export const todoReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case CHANGE_TITLE:
            return { ...state, title: action.payload.title };
        case ADD_TASK:
            return { ...state, tasks: [...state.tasks, { id: v1(), title: action.payload.title, isDone: false }] };
        case DELETE_TASK:
            return { ...state, tasks: state.tasks.filter(item => item.id !== action.payload.id) };
        case CHANGE_TASK_STATUS:
            return { ...state, tasks: state.tasks.map(item => item.id === action.payload.id ? { ...item, isDone: action.payload.value } : item) };
        case CHANGE_TASK_TITLE:
            return { ...state, tasks: state.tasks.map(item => item.id === action.payload.id ? { ...item, title: action.payload.title } : item) };

        default:
            return state;
    }

}


//types
type ActionsType = ChangeTitleActionType | AddTaskActionType | DeleteTaskActionType | ChangeStatusActionType | ChangeTaskTitleActionType
const InitialStateType = typeof initialState;

