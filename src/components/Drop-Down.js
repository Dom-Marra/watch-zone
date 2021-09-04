//Styling
import '../scss/components/Drop-Down.scss';

//React
import { useState } from "react";

//Components
import Input from "./Input";

//Icons
import { ChevronDown } from "react-feather";

function DropDown({label, id, values, onChange, disabled}) {
    const [currentValue, setCurrentValue] = useState(values?.[0]);

    function setNewValue(value) {
        setCurrentValue(value);
        onChange(value);
    }
    
    return (
        <Input className="drop-down" 
            label={label} 
            id={id} 
            value={currentValue} 
            readonly 
            icon={ <ChevronDown />} 
            disabled={disabled}
            child={
                values?.length > 0 && <ul className="drop-down-list">
                    {
                        values.map((value, i) => 
                            <li key={i} 
                                role="checkbox" 
                                aria-checked={currentValue === value} 
                                onClick={() => setNewValue(value)}
                                className={currentValue === value ? 'selected' : ''}
                            >
                                {value}
                            </li>
                        )
                    }
                </ul>
            }
        />
    )
}

export default DropDown; 