import React from 'react';
import {useHistory} from "react-router-dom";
import TextArea from "../componet/TextArea";

const Text = () => {
    const history = useHistory()

    return (
        <TextArea id={history.location.pathname.slice(6)} />
    );
};

export default Text;