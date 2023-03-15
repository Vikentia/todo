import React, { ChangeEvent, useState } from "react";
import s from "./Task.module.scss";
import { Checkbox, Input } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { DeleteOutlined } from "@ant-design/icons";
import { TaskType } from "../App";

type TaskPropsType = {
    item: TaskType;
    removeTask: (id: string) => void;
    onChangeTaskStatus: (id: string, value: boolean) => void;
    onChangeTaskTitle: (id: string, title: string) => void;
};

const Task: React.FC<TaskPropsType> = ({
    item,
    removeTask,
    onChangeTaskStatus,
    onChangeTaskTitle,
}) => {
    const [inputTaskTitle, setInpitTaskTitle] = useState<string>(item.title);
    const [visibleInput, setVisibleInput] = useState<boolean>(false);

    const onChangeCheckbox = (e: CheckboxChangeEvent) => {
        onChangeTaskStatus(item.id, e.target.checked);
    };

    const deleteTask = () => {
        removeTask(item.id);
    };
    const changeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setInpitTaskTitle(e.currentTarget.value);
    };

    const renameTask = () => {
        onChangeTaskTitle(item.id, inputTaskTitle);
    };
    const setInputOff = () => {
        setVisibleInput(false);
        renameTask();
    };

    return (
        <div className={s.task_block}>
            <div>
                <Checkbox checked={item.isDone} onChange={onChangeCheckbox} />
            </div>
            <div>
                {visibleInput ? (
                    <Input
                        value={inputTaskTitle}
                        onChange={changeTaskTitle}
                        onBlur={setInputOff}
                        autoFocus
                    />
                ) : (
                    <div onDoubleClick={() => setVisibleInput(true)}>
                        {item.title}
                    </div>
                )}
            </div>
            <div>
                <DeleteOutlined onClick={deleteTask} />
            </div>
        </div>
    );
};

export default Task;
