import {useDispatch, useSelector} from "react-redux";
import React, {FC} from 'react';

import {editTodoTitle} from "../redux/projectReducer/projectReducer";
import {tFile, tEdit} from "../project-golbal-type";
import {RootState} from "../redux/store";
import FilesItem from "./FilesItem";


interface iProps {
    id?: string
}

const Files: FC<iProps> = ({id}) => {
    const dispatch = useDispatch()

    const files = useSelector((state: RootState) => {
        return state.counter.files.filter((item) => id ? item.parentId === id : !"")
    });

    const editTitle: tEdit = (item) => {
        dispatch(editTodoTitle(item))
    }

    return (
        <div className="files">
            {files.filter(item => !item.deleted).map((item: tFile, index) => {
                return <FilesItem editTitle={editTitle}
                                  key={item.id}
                                  item={item}
                />
            })}
        </div>
    );
}

export default Files;
