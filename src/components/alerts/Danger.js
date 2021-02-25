import React from "react";

const Danger = props => {
    return(
        <p style={{fontSize:'small', color:'red'}}>{props.children}</p>
    )
}
export default Danger;