import React from 'react';
import {useHistory, useParams} from "react-router-dom";
import Files from "../componet/Files";

const Sub = () => {
    const {id} = useParams<{ id: string }>();
    return <Files id={id}/>
};

export default Sub;

