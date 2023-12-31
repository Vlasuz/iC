import React, {useContext, useEffect, useState} from 'react'
import {Notifications} from "../../../../components/notifications/Notifications";
import {IExpense, IProject, ITimesheet} from "../../../../models";
import {useDispatch, useSelector} from "react-redux";
import {getBearer} from "../../../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../../../functions/getApiLink";
import {addExpense, editExpense, setExpenses} from "../../../../storage/toolkit";
import {TableExport} from "../../../../components/table/TableExport";
import {TableSelectYearMonth} from "../../../../components/table/TableSelectYearMonth";
import {TableCalendar} from "../../../../components/table/TableCalendar";
import { BlockToEdit } from '../../Costs';
import {TableProjectsForUser} from "../../../../components/table/TableProjectsForUser";
import { SetExpenses } from '../../../../api/SetExpenses';
import {SetTasks} from "../../../../api/SetTasks";
import {SetStatistic} from "../../../../api/SetStatistic";
import {Translate} from "../../../../components/translate/Translate";
import {useClickOutside} from "../../../../hooks/ClickOutside";
import { GetAccessToken } from '../../../../api/GetAccessToken';

interface ICostsHeaderProps {
    itemToEdit: IExpense | undefined
}

export const CostsHeader: React.FC<ICostsHeaderProps> = ({itemToEdit}) => {


    const isEditExpense = itemToEdit && Object.keys(itemToEdit).length

    const [projectData, setProjectData] = useState<IProject | undefined>()
    const [dateData, setDateData] = useState<string>("")
    const [descriptionData, setDescriptionData] = useState<string>("")
    const [costData, setCostData] = useState<number>(0)

    const timesheet: ITimesheet[] = useSelector((state: any) => state.toolkit.timesheet)
    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)
    
    const [searchValueLocal, setSearchValueLocal] = useState("")

    const dispatch = useDispatch()

    const handleCreateExpense = () => {
        const timesheetRequest: any = {
            "project_id": projectData?.id,
            "date": dateData,
            "description": descriptionData,
            "sum": costData
        }

        if(isEditExpense) {
            delete timesheetRequest.project_id;

            getBearer("patch")
            axios.patch(getApiLink("/api/expense/edit/?expense_id=" + itemToEdit.id), timesheetRequest).then(({data}) => {

                SetStatistic(dispatch, chosenTimesheet.id)
                SetExpenses(dispatch, chosenTimesheet.id)
                setIsOpenCreatBlock(false)
            })
        } else {
            getBearer("post")
            axios.post(getApiLink("/api/expense/add/"), timesheetRequest).then(({data}) => {

                SetStatistic(dispatch, chosenTimesheet.id)
                SetExpenses(dispatch, chosenTimesheet.id)
                resetFields()
            })
        }
    }

    const lessThenTen = (num: string) =>  +num < 10 ? "0" + num : num

    useEffect(() => {
        if (!chosenTimesheet?.date) return;
        if(isEditExpense) setIsOpenCreatBlock(true)

        const date = new Date()

        setProjectData(itemToEdit?.project ?? undefined)
        setDescriptionData(itemToEdit?.description ?? "")
        setDateData(itemToEdit?.date ?? `${lessThenTen(String(getMondayDate().getDate()))}.${chosenTimesheet?.date[3]}${chosenTimesheet?.date[4]}.${getMondayDate().getFullYear()}`)
        setCostData(itemToEdit?.sum ?? 0)
    }, [itemToEdit])

    const handleSearchTimesheet = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        getBearer("get")
        axios.get(getApiLink(`/api/timesheet/expenses/?search=${searchValueLocal}`)).then(({data}) => {
            dispatch(setExpenses(data))
        }).catch(er => {
            er?.response?.status === 401 && GetAccessToken(dispatch)
        })
    }

    useEffect(() => {
        if(searchValueLocal.length > 0) return;

        SetExpenses(dispatch, chosenTimesheet?.id)
    }, [searchValueLocal])

    const setItemEdit: any = useContext(BlockToEdit)

    const handleBackFromCreate = () => {
        setIsOpenCreatBlock(false)
        setItemEdit({})
    }

    const [isOpenCreatBlock, setIsOpenCreatBlock] = useState(false)


    const handleSwitchMonth = (month: number) => {
        if(!timesheet.length) return;

        const idTasksForMonth = timesheet.filter(item => Number(`${item.date[3]}${item.date[4]}`) === month)[0]?.id

        if(!idTasksForMonth?.length) return;

        getBearer("get")
        axios.get(getApiLink(`/api/timesheet/expenses/?timesheet_id=${idTasksForMonth}`)).then(({data}) => {

            SetStatistic(dispatch, idTasksForMonth)
            dispatch(setExpenses(data))
        }).catch(er => {
            er?.response?.status === 401 && GetAccessToken(dispatch)
        })
    }

    const handleOpenToCreate = () => {
        setIsOpenCreatBlock(true)

        resetFields()
    }

    function getMondayDate() {
        const today = new Date();
        // const dayOfWeek = today.getDay();
        // const difference = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        // const monday = new Date(today);
        // monday.setDate(today.getDate() + difference);

        return today;
    }

    const resetFields = () => {
        setProjectData(undefined)
        setDescriptionData("")
        setCostData(0)
        setDateData(`${lessThenTen(String(getMondayDate().getDate()))}.${chosenTimesheet?.date[3]}${chosenTimesheet?.date[4]}.${getMondayDate().getFullYear()}`)
    }

    useEffect(() => {
        if (!chosenTimesheet?.date) return;

        setDateData(`${lessThenTen(String(getMondayDate().getDate()))}.${chosenTimesheet?.date[3]}${chosenTimesheet?.date[4]}.${getMondayDate().getFullYear()}`)
    }, [chosenTimesheet])

    const isApprove = chosenTimesheet?.status === "approve"

    const [isOpenInputSearch, setIsOpenInputSearch] = useState(false)
    const {rootEl} = useClickOutside(setIsOpenInputSearch)

    return (
        <div className="section-table__header">
            <div className="section-table__header--row is-always-row">
                <div className="section-table__header--col">
                    <h1 className="section-table__title title change-title" id="main-title">
                        <span>

                            <Translate>costs_page.top_part.costs</Translate>

                            {
                                isOpenCreatBlock && " / "
                            }
                            {
                                isOpenCreatBlock && (!isEditExpense ? <Translate>costs_page.top_part.add_expense_2</Translate> : <Translate>edit_cost</Translate>)
                            }

                        </span>
                    </h1>
                </div>

                <Notifications/>

            </div>
            <div className={isOpenCreatBlock ? "section-table__header--block block-for-is-active is-active" : "section-table__header--block block-for-is-active"}>
                <div className="section-table__header--block-item">
                    <div>
                        <div className="section-table__header--row row-2">
                            <div className="section-table__header--col">
                                <button disabled={isApprove} onClick={handleOpenToCreate} type="button" className="section-table__add btn add-is-active"
                                        data-add-active-change-title="main-title">
                                    <Translate>costs_page.top_part.add_expense_2</Translate>
                                    <svg width="16" height="15" viewBox="0 0 16 15">
                                        <use xlinkHref="#plus"></use>
                                    </svg>
                                </button>
                                <form ref={rootEl} onSubmit={handleSearchTimesheet}
                                      className={`section-table__search ${isOpenInputSearch && "is-active"}`}>
                                    <label className="section-table__search--label">
                                        <input type="search" name="search"
                                               className="section-table__search--input"
                                               onChange={e => setSearchValueLocal(e.target.value)}
                                               value={searchValueLocal}
                                        />
                                        <span className="placeholder">
                                            {!searchValueLocal && <Translate>costs_page.top_part.search_a_project</Translate>}
                                        </span>
                                    </label>
                                    <button onClick={_ => setIsOpenInputSearch(true)} className="section-table__search--submit btn is-grey is-min-on-mob"
                                            type="submit">
                                        <Translate>costs_page.top_part.search</Translate>
                                        <svg width="15" height="15" viewBox="0 0 15 15">
                                            <use xlinkHref="#search"></use>
                                        </svg>
                                    </button>
                                </form>
                            </div>
                            <div className="section-table__header--col">

                                <TableSelectYearMonth onSwitch={handleSwitchMonth}/>

                                <TableExport/>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-table__header--block-item">
                    <div>
                        <div className="section-table__header--add-costs section-table__add-costs">
                            <button onClick={handleBackFromCreate} className="section-table__add-expense--back back-btn remove-is-active"
                                    data-remove-active-change-title="main-title" type="button"
                                    aria-label="Go back">
                                <svg width="7" height="10" viewBox="0 0 7 10">
                                    <use xlinkHref="#arrow-prev"></use>
                                </svg>
                                <span className="visible-on-mob">
                                    Go back
                                </span>
                            </button>

                            <TableCalendar dateData={dateData} setDateData={setDateData}/>

                            <TableProjectsForUser projectData={projectData} setProjectData={setProjectData} />

                            <div className="section-table__add-costs--text">
                                <label>
                                    <span className="input_placeholder">
                                        <input type="text" name="costs" value={descriptionData} onChange={e => setDescriptionData(e.target.value)} required className="input" />
                                        <span className="placeholder">
                                            {!descriptionData && <Translate>costs_page.top_part.write_short_description</Translate>}
                                        </span>
                                    </span>
                                </label>
                            </div>
                            <div className="section-table__add-costs--cost">
                                <div className="input_placeholder">
                                    <input type="number" name="cost" value={costData === 0 ? "" : costData} onChange={e => setCostData(+e.target.value)} required className="input" />
                                    <div className="placeholder">
                                        <Translate>costs_page.table.cost</Translate>
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleCreateExpense} className="section-table__add-expense--submit btn" type="submit">
                                {isEditExpense ? <Translate>edit_expense</Translate> : <Translate>costs_page.top_part.add_expense_2</Translate>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
