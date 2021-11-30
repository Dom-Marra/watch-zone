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
    const [focusedIn, setFocusedIn] = useState(false);

    function setNewValue(value) {
        setCurrentValue(value);
        onChange(value);
    }

    function onEnter(target, value) {
        setNewValue(value);
        target.blur();
    }
    
    return (
        <Input className="drop-down" 
            label={label} 
            id={id} 
            value={currentValue} 
            readonly 
            icon={ <ChevronDown />} 
            disabled={disabled}
            focusedIn={focusedIn}
            child={
                values?.length > 0 && <ul className="drop-down-list">
                    {
                        values.map((value, i) => 
                            <li key={i} 
                                role="checkbox" 
                                aria-checked={currentValue === value} 
                                onClick={() => setNewValue(value)}
                                className={currentValue === value ? 'selected' : ''}
                                tabIndex={0}
                                onFocus={() => setFocusedIn(true)}
                                onBlur={() => setFocusedIn(false)}
                                onKeyPress={(e) => e.key === 'Enter' ? onEnter(e.target, value) : null}
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