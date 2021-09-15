import React, {FC} from 'react';
import FilesItem from "./FilesItem";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {tFile} from "../project-golbal-type";
import {editTodoTitle} from "../redux/projectReducer/projectReducer";


export type tEdit = (item: tFile) => void

interface iProps {
    id?: string
}

const Files: FC<iProps> = ({id}) => {
    const dispatch = useDispatch()
    const files = useSelector((state: RootState) => state.counter.files.filter((item) => id ? item.parentId === id : !item.parentId));
    const editTitle: tEdit = (item) => {
        dispatch(editTodoTitle(item))
    }

    return (
        <div className="files">
            {files.filter(item => !item.deleted).map((item: tFile, index) => {
                return <FilesItem key={item.id} item={item} editTitle={editTitle}/>
            })}
        </div>
    );
}

export default Files;
