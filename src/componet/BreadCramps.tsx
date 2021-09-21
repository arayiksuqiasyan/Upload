import React from "react";

import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";

type tBreadCramps = {
    changeHistoryTextHandler: (index:number)=> void
}

function BreadCramps ({changeHistoryTextHandler}:tBreadCramps){

    const {menuTitle} = useSelector((state: RootState) => state.counter)

    return (
        <div>
            {menuTitle.map((item, index) => {
                if (!item.id) {
                    return <Link key={index} to={"/"}
                                 onClick={() => changeHistoryTextHandler(index)}
                                 className="link-h1">{item.title}/
                    </Link>
                } else {
                    return <Link key={index} to={`/file/${item.id}`}
                                 onClick={() => changeHistoryTextHandler(index)}
                                 className="link-h1">{item.title}/
                    </Link>
                }
            })}
        </div>
    )

}
export default BreadCramps