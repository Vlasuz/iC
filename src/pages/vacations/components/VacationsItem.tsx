import React, {useContext, useEffect, useRef, useState} from 'react'
import {IEmployee, ITask, ITimesheet, IVacation} from "../../../models";
import {Translate} from "../../../components/translate/Translate";
import {useDispatch, useSelector} from "react-redux";
import {PopupContext} from "../../../App";
import {BlockToEdit} from "../../timesheet/Timesheet";
import {getBearer} from "../../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {SetStatistic} from "../../../api/SetStatistic";
import {SetTasks} from "../../../api/SetTasks";
import {useClickOutside} from "../../../hooks/ClickOutside";

interface IVacationsItemProps {
    itemData: IVacation
    index: number
}

export const VacationsItem: React.FC<IVacationsItemProps> = ({itemData, index}) => {

    const [total, setTotal] = useState(0)
    const [totalMonth, setTotalMonth] = useState(0)
    const [extraDays, setExtraDays] = useState(+itemData.extra)
    const [isChangeExtraDays, setIsChangeExtraDays] = useState(false)
    const [isOpenContextMenu, setIsOpenContextMenu] = useState(false)
    const [menuPosition, setMenuPosition] = useState({})

    const inputBlock: any = useRef(null)

    useEffect(() => {
        setTotal(0)
        setTotal(prev => prev + +itemData.remain + +extraDays + +itemData.user.holidays)
        itemData.months.map(item => setTotalMonth(prev => prev + item.days))
    }, [extraDays])

    const handleOpenEditExtraDays = () => {
        setIsOpenContextMenu(false)

        setTimeout(() => {
            setIsChangeExtraDays(true)
            setTimeout(() => {
                inputBlock?.current?.focus()
            }, 100)
        }, 100)
    }

    const handleChangeExtraDays = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        changeExtra()
    }

    const changeExtra = () => {
        getBearer("patch")
        axios.patch(getApiLink(`/api/admin/employee/vacations/update/?vacation_id=${itemData.user.id}`), {
            "extra": +extraDays
        }).then(({data}) => {
            console.log(data)
            setIsChangeExtraDays(false)
        }).catch(er => {
            console.log(getApiLink(`/api/admin/employee/vacations/update/?vacation_id=${itemData.user.id}`), er)
        })
    }

    const rootEl: any = useRef(null);

    useEffect(() => {
        const onClick = (e: any) => {
            console.log('11', isChangeExtraDays, isOpenContextMenu)
            if (!rootEl.current?.contains(e.target) && isChangeExtraDays && !isOpenContextMenu) {
                setIsChangeExtraDays(false)
                changeExtra()
            }
        };
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, [isChangeExtraDays]);

    // const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)
    //
    // const dispatch = useDispatch()

    const modalBlock: any = useRef(null)
    const rowBlock: any = useRef(null)

    useEffect(() => {

        const onClick = (e: any) => modalBlock.current.contains(e.target) || setIsOpenContextMenu(false);
        const onContext = (e: any) => rowBlock.current.contains(e.target) || setIsOpenContextMenu(false);

        document.addEventListener('click', onClick);
        document.addEventListener('contextmenu', onContext);
        return () => {
            document.removeEventListener('click', onClick);
            document.removeEventListener('contextmenu', onContext);
        }
    }, []);

    const handleOpenContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault()

        if (isOpenContextMenu) {
            setTimeout(() => {
                setMenuPosition({
                    top: "auto",
                    left: "auto"
                })
            }, 300)
        } else {
            setMenuPosition({
                top: e.pageY > 600 ? e.pageY - 160 : e.pageY + 10 + "px",
                left: e.pageX + 10 + "px"
            })
        }

        setIsOpenContextMenu(prev => !prev)
    }

    useEffect(() => {
        if (!isOpenContextMenu) {
            setTimeout(() => {
                setMenuPosition({
                    top: "auto",
                    left: "auto"
                })
            }, 300)
        }
    }, [isOpenContextMenu])

    return (
        <div className="section-table__row drop-down-2" ref={rowBlock} onContextMenu={handleOpenContextMenu}>
            <div className="section-table__param visible-on-mob">
                <span>
                    {index}
                </span>
                <span style={{whiteSpace: "pre-wrap", wordBreak: "normal"}}>
                    {itemData.user.first_name} {itemData.user.last_name}
                </span>
            </div>
            <div className="section-table__param visible-on-desktop is-none-vertical-hover">
                {index}
            </div>
            <div className="section-table__param visible-on-desktop is-none-vertical-hover" style={{whiteSpace: "pre-wrap", wordBreak: "normal"}}>
                {itemData.user.first_name} {itemData.user.last_name}
            </div>
            <div className="section-table__param">
                {itemData.remain.toFixed(1)}
            </div>
            <div className="section-table__param">

                {
                    !isChangeExtraDays ? extraDays.toFixed(1) :
                        <form ref={rootEl} onSubmit={handleChangeExtraDays}>
                            <input ref={inputBlock} type="number" onChange={e => setExtraDays(+e.target.value)}
                                   placeholder={"0"} value={extraDays === 0 ? "" : extraDays}/>
                        </form>
                }

            </div>
            <div className="section-table__param">
                {itemData.user.holidays}
            </div>
            <div className="section-table__param">
                {total.toFixed(1)}
            </div>
            {
                itemData.months.map(item =>
                    <div className="section-table__param">
                        {item.days.toFixed(1)}
                    </div>
                )
            }
            <div className="section-table__param">
                {(total - totalMonth).toFixed(1)}
            </div>
            <div className={"drop-down-2__block" + (isOpenContextMenu ? " active" : "")} ref={modalBlock}
                 style={menuPosition}>
                <ul className="drop-down-2__list">
                    <li>
                        <a onClick={handleOpenEditExtraDays}>
                            <svg width="15" height="16" viewBox="0 0 15 16">
                                <use xlinkHref="#edit"></use>
                            </svg>
                            <Translate>vacations_admin.edit_extra_days</Translate>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
