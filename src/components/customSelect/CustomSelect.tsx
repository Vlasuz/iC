import React, {useEffect, useRef, useState} from 'react'
import {CustomSelectStyled} from "./CustomSelect.styled";
import {useClickOutside} from "../../hooks/ClickOutside";

interface ICustomSelectProps {
    list: any[]
    setSelectedItem?: any
    selectValue?: any
    defaultValue?: any
    scrollNumber?: number
    onChange?: any
}

export const CustomSelect: React.FC<ICustomSelectProps> = ({list, setSelectedItem, defaultValue, selectValue, scrollNumber, onChange}) => {

    const [isOpenSelect, setIsOpenSelect] = useState(false)
    const [selectedItemLocal, setSelectedItemLocal]: any = useState((defaultValue && Object.keys(defaultValue).length) ? defaultValue : list[0])

    const selectBodyRef: any = useRef(null)

    const {rootEl} = useClickOutside(setIsOpenSelect)

    const handleSelect = (item: any) => {
        setSelectedItemLocal(item)
        setSelectedItem(item)
        setIsOpenSelect(false)
    }

    useEffect(() => {
        selectBodyRef.current.scrollTo(0, scrollNumber)
    }, [])

    useEffect(() => {
        setSelectedItemLocal(selectValue)
    }, [selectValue])

    const handleSelectItem = (item: any) => {
        handleSelect(item)
        if(onChange) {
            onChange(item)
        }
    }

    const [isPositionTop, setIsPositionTop] = useState(false)

    useEffect(() => {

        setTimeout(() => {
            if(rootEl?.current?.getBoundingClientRect().bottom + 300 > window.innerHeight) setIsPositionTop(true)
        }, 1000)

    }, [])

    return (
        <CustomSelectStyled ref={rootEl} className={isOpenSelect ? "is-active" : ""}>
            <button onClick={e => {
                e.preventDefault()
                setIsOpenSelect(prev => !prev)
            }} className="custom-select__head">
                <span>
                    {selectedItemLocal?.label}
                </span>
                <svg className="ss-arrow" viewBox="0 0 100 100">
                    <path d="M10,30 L50,70 L90,30" fill={"transparent"}/>
                </svg>
            </button>
            <div ref={selectBodyRef} className={`custom-select__body ${isPositionTop && "custom-select__body_top"}`}>
                <ul>

                    {
                        list.map(item =>
                            <li key={item.value} onClick={_ => handleSelectItem(item)} className={selectedItemLocal?.value === item.value ? "li-active" : ""}>
                                {item.label}
                            </li>
                        )
                    }

                </ul>
            </div>
        </CustomSelectStyled>
    )
}
