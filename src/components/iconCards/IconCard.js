import React from 'react';

const IconCard = ({ icon, text, ...props }) => {

    const iconStyle = { margin: "0 5px" }
    return (
        <Panel bordered shaded>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <FaImage style={} color="lightblue" size="20" /> <b>Image</b>
            </div>
        </Panel>
    )
}
export default IconCard;