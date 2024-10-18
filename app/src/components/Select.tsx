import React, {ReactElement} from 'react';
import Select from 'react-select';

// this is a dumb component that doesn't manage state
// to avoid requiring complex state mgmt like redux (ew)
const SelectInput = ({
                         options,
                         label,
                         inputName,
                         isMulti = false,
                         selectedOption,
                         setSelectedOption
                     }): ReactElement => (

    <div>
        <label htmlFor={inputName}>{label}</label>
        <Select
            name={inputName}
            isMulti={isMulti}
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
        />
    </div>
);


export default SelectInput;
