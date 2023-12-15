import React, {useEffect, useRef, useState} from 'react'
import SimpleBar from "simplebar-react";
import {DownSidebarStyled} from "./DownSidebar.styled";
import axios from "axios";
import {getApiLink} from "../../functions/getApiLink";
import {IComment, ITimesheet, IUser} from "../../models";
import {useSelector} from "react-redux";

interface IDownSidebarProps {
    setIsOpenDownSidebar: any
    statisticAllAmount?: number
    statisticAllElements?: IElement[]
    type: string
}

interface IElement {
    project: {
        id: string
        name: string
        description: string
    }
    hours?: number
    sum?: number
    percent: number
}

export const DownSidebar: React.FC<IDownSidebarProps> = ({setIsOpenDownSidebar, statisticAllAmount, statisticAllElements, type}) => {

    const [isActive, setIsActive] = useState(false)
    const [textValue, setTextValue] = useState("")
    const [comments, setComments] = useState<IComment[]>([])

    const inputBlock: any = useRef(null)

    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)
    const userData: IUser = useSelector((state: any) => state.toolkit.user)

    useEffect(() => {
        setIsOpenDownSidebar(isActive)

        setComments(chosenTimesheet?.comments)
    }, [isActive])

    useEffect(() => {
        setComments(chosenTimesheet?.comments)
    }, [chosenTimesheet])

    const handleSendComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        axios.post(getApiLink(`/api/timesheet/comment/?timesheet_id=${chosenTimesheet.id}`), {"text": textValue}).then(({data}) => {
            if (data.status === false) return;
            console.log(data)

            const comment: any = {
                "user": {
                    "first_name": userData.first_name,
                    "last_name": userData.last_name,
                    "avatar": userData.avatar,
                    "status": userData.status
                },
                "text": textValue
            }

            setComments(prev => [comment, ...prev])

            setTextValue("")
        })
    }

    const isCostPage = type === "cost"

    return (
        <DownSidebarStyled className={`down-sidebar ${isActive && "is-active"}`}>
            <button onClick={_ => setIsActive(prev => !prev)} className="down-sidebar__arrow-target" type="button">
                <svg width="10" height="7" viewBox="0 0 10 7">
                    <use xlinkHref="#drop-down-arrow"></use>
                </svg>
            </button>
            <div className="down-sidebar__wrapper">
                <div className="down-sidebar__target-place">
                    <div className="down-sidebar__target-place--row">
                        <button onClick={_ => setIsActive(prev => !prev)}
                                className="down-sidebar__comments-target btn is-grey"
                                type="button">
                            <svg width="13" height="13" viewBox="0 0 13 13">
                                <use xlinkHref="#comments"></use>
                            </svg>
                            Comments ({chosenTimesheet?.comments?.length})
                        </button>
                        <div onClick={_ => setIsActive(prev => !prev)} className="down-sidebar__total-target">
                            <span>Total for month:</span>
                            <div className="down-sidebar__total-target--value">
                                {statisticAllAmount} {isCostPage ? "EUR" : "hours"}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="down-sidebar__row">
                    <div>
                        <div className="down-sidebar__col">
                            <div className="down-sidebar__chat">
                                <div
                                    className="down-sidebar__chat-block">
                                    <SimpleBar autoHide={false} className={"simplebar-custom"}>

                                        {
                                            comments?.map(com =>
                                                <div key={com.text} className="down-sidebar__chat-item"
                                                     data-author="Olena Rybak">
                                                    <div
                                                        className="down-sidebar__chat-item--text">
                                                        <p>
                                                            <b>{com.user.first_name} {com.user.last_name}:</b>
                                                            {com.text}
                                                        </p>
                                                    </div>
                                                    <button type="button" onClick={_ => {
                                                        setTextValue("@Olena Rybak. ")
                                                        inputBlock.current.focus()
                                                    }} className="down-sidebar__chat-item--answer" title="Answer">
                                                        <svg width="20" height="20" viewBox="0 0 20 20">
                                                            <use xlinkHref="#answer"></use>
                                                        </svg>
                                                    </button>
                                                </div>
                                            )
                                        }

                                    </SimpleBar>
                                </div>


                                <form onSubmit={handleSendComment} className="down-sidebar__chat-user-panel">
                                    <label>
                                        <input type="text" ref={inputBlock} name="comment"
                                               onChange={e => setTextValue(e.target.value)} value={textValue}
                                               placeholder="Add new comment" required className="input"/>
                                    </label>
                                    <button type="submit" title="Send">
                                        <svg width="17" height="17" viewBox="0 0 17 17">
                                            <use xlinkHref="#send"></use>
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="down-sidebar__col">
                            <div className="down-sidebar__total">

                                <SimpleBar className="down-sidebar__total-block simplebar-scrollable-y" autoHide={false}>
                                    {
                                        statisticAllElements?.map(item =>
                                            <div className="down-sidebar__total-item">
                                                <b className="down-sidebar__total-item--name" style={{width: isCostPage ? "300px" : "350px"}}>
                                                    {item.project.name}_{item.project.description}
                                                </b>
                                                <div
                                                    className="down-sidebar__total-item--value">
                                                    <b>{isCostPage ? item.sum : item.hours} {isCostPage ? "EUR" : "h"}</b>
                                                    <div
                                                        className="down-sidebar__total-item--progress-bar"
                                                        data-value={`${item?.percent}%`}>
                                                        <div className="line_done" style={{width: `${item?.percent}%`}}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </SimpleBar>
                                <div className="down-sidebar__total-footer">
                                    <div className="down-sidebar__total-value">
                                        <span>Total for month:</span>
                                        <b>{statisticAllAmount} {isCostPage ? "hours" : "EUR"}</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DownSidebarStyled>
    )
}
