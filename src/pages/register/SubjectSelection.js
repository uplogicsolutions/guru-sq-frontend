import React, { useState } from 'react';
import { TagPicker } from 'rsuite';

const SubjectSelection = props => {

    const [core_subjects, setCoreSubjects] = useState([])

    const test_data =[
        {
            "label": "Private",
            "value": "private",
            "role": ""
        },
        {
            "label": "Goverment",
            "value": "goverment",
            "role": ""
        }
    ]
    return (
        <>
            <TagPicker
                data={test_data}
                onSelect={(val) => { setCoreSubjects(val)}}
            />
        </>
    )
}

export default SubjectSelection;