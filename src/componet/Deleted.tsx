import React from 'react';
import {tFile} from "../project-golbal-type";
import FilesItem from "./FilesItem";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

const Deleted = () => {
    const files = useSelector((state: RootState) => state.counter.files);

    return (

        <div className="files">
            { files.filter(item => item.deleted).map((item: tFile, index) => {
                    return <FilesItem key={item.id} item={item} editTitle={(item) => {
                    }}/>
                })
            }
        </div>
    );
};

export default Deleted;