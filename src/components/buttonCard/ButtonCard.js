import React from 'react';
import {
    Panel
} from 'rsuite';

const ButtonCard = (props) => {

    const { label, children, onClick } = props;

    const buttonCss = {
        outline: 0,
        background: "transparent",
        width: '100%',
    };

    return (
        <button style={buttonCss} onClick={onClick}>
            <Panel className="bg-white" bordered>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    {children} <b>{label}</b>
                </div>
            </Panel>
        </button>
    )
}

export default ButtonCard;