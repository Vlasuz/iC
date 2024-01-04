import React, {useEffect, useRef, useState} from 'react'
import {CustomSelectStyled} from "./CustomSelect.styled";
import {useClickOutside} from "../../hooks/ClickOutside";
import SimpleBar from "simplebar-react";
import {Translate} from "../translate/Translate";

interface ICustomSelectProps {
    list: any[]
    setSelectedItem?: any
    selectValue?: any
    defaultValue?: any
    scrollNumber?: number
    onChange?: any
    tabIndex?: number
}

export const CustomSelect: React.FC<ICustomSelectProps> = ({
                                                               list,
                                                               setSelectedItem,
                                                               defaultValue,
                                                               selectValue,
                                                               scrollNumber,
                                                               onChange,
                                                               tabIndex
                                                           }) => {

    const [isOpenSelect, setIsOpenSelect] = useState(false)
    const [selectedItemLocal, setSelectedItemLocal]: any = useState((defaultValue && Object.keys(defaultValue).length) ? defaultValue : list[0])
    const [countForScrollToSelected, setCountForScrollToSelected] = useState(0)

    const selectBodyRef: any = useRef(null)

    const {rootEl} = useClickOutside(setIsOpenSelect)

    const handleSelect = (item: any) => {
        setSelectedItemLocal(item)
        setSelectedItem(item)
    }

    useEffect(() => {
        selectBodyRef.current.getScrollElement().scrollTop = countForScrollToSelected === 0 ? scrollNumber : countForScrollToSelected
    }, [isOpenSelect, selectedItemLocal])

    useEffect(() => {
        setSelectedItemLocal(selectValue)
    }, [selectValue])

    const handleSelectItem = (item: any, index?: number) => {
        handleSelect(item)
        setIsOpenSelect(false)

        tabIndex && inputBlockRef.current.focus()

        if (index) setCountForScrollToSelected(+index * +liItemBlock.current.clientHeight)

        if (onChange) {
            onChange(item)
        }
    }

    const liItemBlock: any = useRef(null)

    const [isPositionTop, setIsPositionTop] = useState(false)

    useEffect(() => {

        setTimeout(() => {
            if (rootEl?.current?.getBoundingClientRect().bottom + 300 > window.innerHeight) setIsPositionTop(true)
        }, 1000)

        setSelectedItemLocal((defaultValue && Object.keys(defaultValue).length) ? defaultValue : list[0])

    }, [])

    const handleOpenSelect = (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault()
        setIsOpenSelect(prev => !prev)
        if(!isOpenSelect)
            inputBlockRef?.current?.focus()
    }

    const handleFocusElement = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        // setIsOpenSelect(true)
    }

    const inputBlockRef: any = useRef(null);

    const whoHaveTranslate = ["team_lead", "project_lead", "employee"]
    const isHaveTranslate = (item: string) => {
        return whoHaveTranslate.some(item2 => item2 === item)
    }

    return (
        <CustomSelectStyled ref={rootEl} className={`select ${isOpenSelect && "is-active"}`}>
            <button onClick={handleOpenSelect} className="custom-select__head">
                {/*{*/}
                {/*    tabIndex ?*/}
                {/*        <span className="input_placeholder">*/}
                {/*    <input tabIndex={tabIndex} style={{width: "20px"}} type="text"/>*/}
                {/*    <span className="placeholder">*/}
                {/*        {isHaveTranslate(selectedItemLocal?.value) ?*/}
                {/*            <Translate>{`employees_admin.table.${selectedItemLocal?.value}`}</Translate> : selectedItemLocal?.label}*/}
                {/*    </span>*/}
                {/*</span>*/}
                {/*        :*/}
                {/*        */}
                {/*}*/}

                {tabIndex && <input type="text" ref={inputBlockRef} tabIndex={tabIndex}
                        onClick={handleOpenSelect} onFocus={handleFocusElement}/>}
                <span>
                        {
                            isHaveTranslate(selectedItemLocal?.value) ?
                                <Translate>{`employees_admin.table.${selectedItemLocal?.value}`}</Translate> : selectedItemLocal?.label
                        }
                    </span>


                <svg className="ss-arrow" viewBox="0 0 100 100">
                    <path d="M10,30 L50,70 L90,30" fill={"transparent"}/>
                </svg>
            </button>
            <SimpleBar ref={selectBodyRef}
                       className={`custom-select__body ${isPositionTop && "custom-select__body_top"}`}>
                <ul>

                    {
                        list.map((item, index: number) =>
                            <li ref={liItemBlock} key={item.value} onClick={_ => handleSelectItem(item, index)}
                                className={selectedItemLocal?.value === item.value ? "li-active" : ""}>
                                {
                                    isHaveTranslate(item.value) ?
                                        <Translate>{`employees_admin.table.${item.value}`}</Translate> : item.label
                                }
                            </li>
                        )
                    }

                </ul>
            </SimpleBar>
        </CustomSelectStyled>
    )
}
