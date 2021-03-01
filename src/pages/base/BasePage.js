import CustomNavbar from 'components/navbar/CustomNavbar';
import React, {useState} from 'react';
import { Navbar } from 'rsuite';

const BasePage = ({children, ...props}) => {

    const [activeKey, setActiveKey] = useState(null);

    const handleSelect = (eventKey)=> {
        console.log('EventKey:', eventKey)
        setActiveKey(eventKey)
    }

    return (
        <React.Fragment>
            <CustomNavbar activeKey={activeKey} onSelect={handleSelect}/>            
            {children}
        </React.Fragment>
    )
}

export default BasePage;