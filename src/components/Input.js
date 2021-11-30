//Styling
import '../scss/components/Input.scss';

//React Imports
import { useEffect, useRef, useState, useCallback } from 'react';


function Input ({label, id, readonly, icon, child, value = '', className, onInput, onChange, disabled, focusedIn}) {

    const [focused, setFocused] = useState('');
    const [hasContent, setHasContent] = useState('');
    const input = useRef(null);

    const checkInputVal = useCallback(() => {
        if (input.current.value) { 
            setHasContent('has-content');
        }
        else setHasContent('');

        if (onInput) onInput(input.current.value);
    }, [onInput]);

    useEffect(() => {
        checkInputVal();
    }, [checkInputVal, value]);

    useEffect(() => {
        if (focusedIn) setFocused('focused')
        else setFocused('');
    }, [focusedIn])

    function handleBlur(val) {
        if (focusedIn) return;   
        
        setFocused('');
        if (onChange) onChange(val);
    }

    return (
        <div className={`input-wrapper ${focused} ${hasContent} ${className}`}>
            <label htmlFor={id}>{label}</label>
            <input ref={input} type="text" 
                id={id} onFocus={() => setFocused('focused')} 
                onBlur={(e) => handleBlur(e.target.value)} 
                onInput={() => checkInputVal()}
                className={icon ? 'pad-icon' : ''}
                autoComplete="off"
                readOnly={readonly}
                value={value}
                onKeyPress={(e) => e.key === 'Enter' ? input.current.blur() : null}
                disabled={disabled}
            />

           {icon && 
            <div className="icon-wrapper">
                {icon}
            </div>
            }

            {child}
            
        </div>
    )
}

export default Input;