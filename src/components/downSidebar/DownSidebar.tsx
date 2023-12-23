import React, {useEffect, useRef, useState} from 'react'
import SimpleBar from "simplebar-react";
import {DownSidebarStyled} from "./DownSidebar.styled";
import axios from "axios";
import {getApiLink} from "../../functions/getApiLink";
import {IComment, ITimesheet, IUser} from "../../models";
import {useSelector} from "react-redux";
import {mergeAndSum} from "../../functions/mergeAndSumStatistic";
import {Translate} from "../translate/Translate";
import {currency} from "../../constants/Currency";

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

export const DownSidebar: React.FC<IDownSidebarProps> = ({
                                                             setIsOpenDownSidebar,
                                                             statisticAllAmount,
                                                             statisticAllElements,
                                                             type
                                                         }) => {


    const [statisticList, setStatisticList]: any = useState([])
    const [isActive, setIsActive] = useState(false)
    const [textValue, setTextValue] = useState("")
    const [comments, setComments] = useState<IComment[]>([])
    const [answerCommentUserId, setAnswerCommentUserId] = useState("")

    const inputBlock: any = useRef(null)

    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)
    const userData: IUser = useSelector((state: any) => state.toolkit.user)

    useEffect(() => {
        setIsOpenDownSidebar(isActive)

        setStatisticList(mergeAndSum(statisticAllElements, statisticAllElements).statistic)

        setComments(chosenTimesheet?.comments)

        console.log(chosenTimesheet?.comments)
    }, [isActive])

    useEffect(() => {
        setComments(chosenTimesheet?.comments)
    }, [chosenTimesheet])

    const handleSendComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        axios.post(getApiLink(`/api/timesheet/comment/?timesheet_id=${chosenTimesheet.id}`), {
            "text": textValue.slice(textValue.indexOf(".") + 1),
            "answer_user_id": answerCommentUserId
        }).then(({data}) => {
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

            setComments(prev => [...prev, comment])

            setTextValue("")
        })
    }

    const isCostPage = type === "cost"

    const refCommentBody: any = useRef(null)

    useEffect(() => {
        refCommentBody.current.getScrollElement().scrollTop = 99999
    }, [comments])

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
                            <Translate>timesheet_page.down_sidebar.comments</Translate> ({chosenTimesheet?.comments?.length})

                        </button>
                        <div onClick={_ => setIsActive(prev => !prev)} className="down-sidebar__total-target">
                            <span>
                                <Translate>timesheet_page.down_sidebar.total_for_month</Translate>
                            </span>
                            <div className="down-sidebar__total-target--value">
                                {statisticAllAmount} {isCostPage ? currency : "hours"}
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
                                    <SimpleBar ref={refCommentBody} autoHide={false} className={"simplebar-custom"}>

                                        {
                                            !!comments?.length ? comments?.map((com, index) =>
                                                    <div key={index} className="down-sidebar__chat-item"
                                                         data-author="Olena Rybak">
                                                        <div
                                                            className="down-sidebar__chat-item--text">
                                                            <p>
                                                                {com?.answer &&
                                                                    <span>@{com?.answer?.first_name} {com?.answer?.last_name}.</span>
                                                                }
                                                                <b>{com.user.first_name} {com.user.last_name}: </b>
                                                                {com.text.slice(com.text?.indexOf(".") + 1)}
                                                            </p>
                                                        </div>
                                                        <button type="button" onClick={_ => {
                                                            setTextValue(`@${com.user.first_name} ${com.user.last_name}. `)
                                                            setAnswerCommentUserId(com.user.id)
                                                            inputBlock.current.focus()
                                                        }} className="down-sidebar__chat-item--answer" title="Answer">
                                                            <svg width="20" height="20" viewBox="0 0 20 20">
                                                                <use xlinkHref="#answer"></use>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ) :
                                                <Translate>timesheet_page.down_sidebar.there_is_no_data_for_a_report</Translate>
                                        }

                                    </SimpleBar>
                                </div>


                                <form onSubmit={handleSendComment} className="down-sidebar__chat-user-panel">
                                    <label>
                                        <input type="text" ref={inputBlock} name="comment"
                                               onChange={e => setTextValue(e.target.value)} value={textValue}
                                               required className="input"/>
                                        <span className="placeholder">
                                            {!textValue &&
                                                <Translate>timesheet_page.down_sidebar.add_new_comment</Translate>}
                                        </span>
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

                                <SimpleBar className="down-sidebar__total-block simplebar-scrollable-y"
                                           autoHide={false}>
                                    {
                                        statisticList?.length ? statisticList?.map((item: any, index: any) =>
                                                <div key={index} className="down-sidebar__total-item">
                                                    <b className="down-sidebar__total-item--name"
                                                       style={{width: isCostPage ? "300px" : "350px"}}>
                                                        {item.project.name}_{item.project.description}
                                                    </b>
                                                    <div className="down-sidebar__total-item--value">
                                                        <b style={{maxWidth: isCostPage ? "80px" : "50px"}}>{isCostPage ? item?.expense.sum : item?.task.hours} {isCostPage ? currency : "h"}</b>
                                                        <div
                                                            className="down-sidebar__total-item--progress-bar"
                                                            data-value={`${item?.task?.percent}%`}>
                                                            <div className="line_done"
                                                                 style={{width: `${item?.task?.percent}%`}}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) :
                                            <Translate>timesheet_page.down_sidebar.there_is_no_data_for_a_report</Translate>
                                    }
                                </SimpleBar>
                                <div className="down-sidebar__total-footer">
                                    <div className="down-sidebar__total-value">
                                        <span>
                                            <Translate>timesheet_page.down_sidebar.total_for_month</Translate>
                                        </span>
                                        <b>{statisticAllAmount ?? 0} {isCostPage ? currency :
                                            <Translate>timesheet_page.down_sidebar.hours</Translate>}</b>
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
