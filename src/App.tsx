import React, { ChangeEvent, useState, useEffect } from "react";
import { Input, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppStoreActionType } from "./redux/store";
import {
    changeTitle,
    addTask,
    deleteTask,
    changeStatus,
    changeTaskTitle,
} from "./redux/actions/todoAction";
import Task from "./components/Task";
import { backgroundUrl } from "./utils/background";
import s from "./App.module.scss";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};
type FilterValueType = "All" | "Active" | "Done";


const App: React.FC = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const [isOn, setIsOn] = useState(false);
    const [filterValue, setFilterValue] = useState<FilterValueType>("All");
    const mainTitle = useSelector<AppStoreActionType, string>(
        (state) => state.todo.title
    );
    const tasks = useSelector<AppStoreActionType, TaskType[]>(
        (state) => state.todo.tasks
    );

    const [bgColor, setBgColor] = useState(backgroundUrl[0])
    useEffect(() => {
        const intervalId = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * backgroundUrl.length);
            setBgColor(backgroundUrl[randomIndex]);
        }, 10000)
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const editMainTitle = () => {
        setIsOn(true);
    };
    const onHandleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTitle(e.currentTarget.value));
    };
    const onHandleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    };
    const createNewTask = () => {
        dispatch(addTask(inputValue));
        setInputValue("");
    };
    const removeTask = (id: string) => {
        dispatch(deleteTask(id));
    };

    const onChangeTaskStatus = (id: string, value: boolean) => {
        dispatch(changeStatus(id, value));
    };
    const onChangeTaskTitle = (id: string, title: string) => {
        dispatch(changeTaskTitle(id, title));
    };
    const setFilter = (e: ChangeEvent<HTMLSelectElement>) => {
        setFilterValue(e.target.value as FilterValueType);
    };

    return (
        <div className={s.App} style={{ backgroundImage: `url(${bgColor})` }}>
            <div className={s.container}>
                <div className={s.title_block}>
                    <div>
                        {isOn ? (
                            <Input
                                maxLength={20}
                                value={mainTitle}
                                onChange={onHandleChangeTitle}
                                onBlur={() => setIsOn(false)}
                                autoFocus
                            />
                        ) : (
                            mainTitle
                        )}
                    </div>
                    <div className={s.title_icon} onClick={editMainTitle}>
                        <EditOutlined />
                    </div>
                </div>
                <div className={s.input_block}>
                    <Input
                        value={inputValue}
                        onChange={onHandleChangeInput}
                        placeholder="New task"
                    />
                    <Button onClick={createNewTask}>Add task</Button>
                </div>
                <div className="s.filter_block">
                    <select onChange={setFilter}>
                        <option value="All">All</option>
                        <option value="Active">Active</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className={s.tasks_block}>
                    <div>
                        {tasks
                            .filter((item) => {
                                switch (filterValue) {
                                    case "Active":
                                        return !item.isDone;
                                    case "Done":
                                        return item.isDone;
                                    case "All":
                                    default:
                                        return item;
                                }
                            })
                            .map((item) => (
                                <Task
                                    key={item.id}
                                    item={item}
                                    removeTask={removeTask}
                                    onChangeTaskStatus={onChangeTaskStatus}
                                    onChangeTaskTitle={onChangeTaskTitle}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
