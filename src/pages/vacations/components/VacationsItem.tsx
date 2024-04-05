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
import {handleOpenContextMenu} from "../../../functions/handleOpenContextMenu";

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
    const [comment, setComment] = useState<string>('')
    const [isCanEditComment, setIsCanEditComment] = useState<boolean>(false)

    useEffect(() => {
        setComment(itemData.comment)
    }, [])

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
        axios.patch(getApiLink(`/api/admin/employee/vacations/update/?vacation_id=${itemData.id}`), {
            "extra": +extraDays,
            "comment": itemData.comment
        }).then(({data}) => {
            console.log(data)
            setIsChangeExtraDays(false)
        }).catch(er => {
            console.log(getApiLink(`/api/admin/employee/vacations/update/?vacation_id=${itemData.id}`), er)
        })
    }

    const rootEl: any = useRef(null);
    const commentEl: any = useRef(null);

    useEffect(() => {
        const onClick = (e: any) => {
            // console.log(isCanEditComment, !isOpenContextMenu)
            // if (!commentEl.current?.contains(e.target) && isCanEditComment && !isOpenContextMenu) {
            //     setIsCanEditComment(false)
            //     handleChangeComment()
            // }

            if (!rootEl.current?.contains(e.target) && isChangeExtraDays && !isOpenContextMenu) {
                setIsChangeExtraDays(false)
                changeExtra()
            }
        };
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, [isOpenContextMenu]);


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

    const handleChangeComment = () => {
        getBearer("patch")
        axios.patch(getApiLink(`/api/admin/employee/vacations/update/?vacation_id=${itemData.id}`), {
            "extra": +itemData.extra,
            "comment": comment
        }).then(({data}) => {
            console.log(data)
            setIsCanEditComment(false)
        }).catch(er => {
            console.log(getApiLink(`/api/admin/employee/vacations/update/?vacation_id=${itemData.id}`), er)
        })
    }

    const handleOpenToAddComment = () => {
        setIsOpenContextMenu(false)
        setIsCanEditComment(true)
    }

    useEffect(() => {
        const onClick = (e: any) => {
            if (!e.target.closest("textarea") && !e.target.closest(".drop-down-2__list") && isCanEditComment && !isOpenContextMenu) {
                setIsCanEditComment(true)
                handleChangeComment()
            }
        };
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, [isOpenContextMenu, isCanEditComment, comment])

    return (
        <div className="section-table__row drop-down-2" ref={rowBlock} onContextMenu={e => handleOpenContextMenu({e, isOpenContextMenu, setMenuPosition, setIsOpenContextMenu, height: 60, width: 175})}>
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
            <div className="section-table__param" style={{fontWeight: itemData?.remain !== 0 ? "bold" : ""}}>
                {itemData.remain.toFixed(1)}
            </div>
            <div className="section-table__param section-table__param_extra" style={{fontWeight: extraDays !== 0 ? "bold" : ""}}>

                {
                    !isChangeExtraDays ? extraDays.toFixed(1) :
                        <form ref={rootEl} onSubmit={handleChangeExtraDays}>
                            <input ref={inputBlock} type="number" onChange={e => setExtraDays(+e.target.value)}
                                   placeholder={"0"} value={extraDays === 0 ? "" : extraDays}/>
                        </form>
                }

                {(itemData?.comment || comment) && <div className="rectangle"/>}

                {((itemData?.comment || comment) || isCanEditComment) && <textarea ref={commentEl}
                           style={{opacity: isCanEditComment ? 1 : 0, visibility: isCanEditComment ? "visible" : "hidden"}}
                           disabled={!isCanEditComment}
                           className={`section-table__comment ${!itemData?.comment && "non-have-comment"}`} value={comment}
                           onChange={e => setComment(e.target.value)}/>}
            </div>
            <div className="section-table__param" style={{fontWeight: itemData?.user?.holidays ? "bold" : ""}}>
                {itemData?.user?.holidays}
            </div>
            <div className="section-table__param" style={{fontWeight: total !== 0 ? "bold" : ""}}>
                {total.toFixed(1)}
            </div>
            {
                itemData.months.map((item, index2) =>
                    <div key={index2} className="section-table__param" style={{fontWeight: item.days !== 0 ? "bold" : ""}}>
                        {item.days.toFixed(1)}
                    </div>
                )
            }
            <div className="section-table__param" style={{fontWeight: (total - totalMonth) !== 0 ? "bold" : ""}}>
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
                    <li>
                        <a onClick={handleOpenToAddComment}>
                            <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <use xlinkHref="#plus"></use>
                            </svg>
                            <Translate>add_comment</Translate>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
