import React, {createContext, useEffect, useState} from 'react'
import {CostsHeader} from "./components/costsHeader/CostsHeader";
import {CostsTable} from "./components/costsTable/CostsTable";
import {RowsPerPage} from "../../constants/RowsPerPage";
import {CustomSelect} from "../../components/customSelect/CustomSelect";
import {useDispatch, useSelector} from "react-redux";
import {IComment, IExpense, IStatistic, ISummaryEmployee, ITask, ITimesheet, IUser} from "../../models";
import {getBearer} from "../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../functions/getApiLink";
import {setChosenTimesheet, setExpenses, setTasks} from "../../storage/toolkit";
import {CostsStyles} from "./Costs.styles";
import {DownSidebar} from "../../components/downSidebar/DownSidebar";
import {useParams} from "react-router-dom";
import {SetStatistic} from "../../api/SetStatistic";
import {Translate} from "../../components/translate/Translate";
import {CostsExcel} from "./components/CostsExcel";
import {GetAccessToken} from '../../api/GetAccessToken';
import {SetTimesheet} from "../../api/SetTimesheet";
import {SetTasks} from "../../api/SetTasks";
import {SetExpenses} from "../../api/SetExpenses";

interface ICostsProps {

}

export const BlockToEdit: any = createContext(null)
export const BlockToDuplicate: any = createContext(null)
export const FixedTopEdit: any = createContext(null)
export const AmountStatistic: any = createContext(null)

export const Costs: React.FC<ICostsProps> = () => {

    const dispatch = useDispatch()

    const {timesheetId}: any = useParams()

    const user: IUser = useSelector((state: any) => state.toolkit.user)
    const expenseList: IExpense[] = useSelector((state: any) => state.toolkit.expenses)
    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)
    const timesheetStatistic: IStatistic = useSelector((state: any) => state.toolkit.timesheetStatistic)
    const summaryEmployees: ISummaryEmployee = useSelector((state: any) => state.toolkit.summaryEmployees)

    const [rowsSelectValue, setRowsSelectValue] = useState(RowsPerPage()[0])
    const [itemToEdit, setItemToEdit] = useState<IExpense>()
    const [itemToDuplicate, setItemToDuplicate] = useState<IExpense>()
    const [isOpenDownSidebar, setIsOpenDownSidebar] = useState(false)
    const [isLoad, setIsLoad] = useState(false)
    const [isWindowMobile, setIsWindowMobile] = useState(false)

    const getExpenses = () => {
        getBearer("get")
        axios.get(getApiLink(`/api/timesheet/expenses/?timesheet_id=${timesheetId ?? chosenTimesheet.id}`)).then(({data}) => {
            dispatch(setExpenses(data))
            SetStatistic(dispatch, timesheetId ?? chosenTimesheet.id)
        }).catch(er => {
            er?.response?.status === 401 && GetAccessToken(dispatch, getExpenses)
        })
    }

    useEffect(() => {
        if(timesheetId) {
            window.scrollTo(0,0)
        }
        if (!!timesheetId || !chosenTimesheet || !Object.keys(chosenTimesheet).length) return;

        getExpenses()

    }, [chosenTimesheet, timesheetId])

    useEffect(() => {

        if(summaryEmployees?.all?.length && timesheetId) {

            const chosenTimesheet = summaryEmployees.all.filter(item => item.id === timesheetId)[0] ?? summaryEmployees.favourite.filter(item => item.id === timesheetId)[0]

            dispatch(setChosenTimesheet(chosenTimesheet))

            getExpenses()

        }

    }, [summaryEmployees])

    useEffect(() => {
        if(timesheetId === undefined && chosenTimesheet?.user?.id !== user?.id) {

            console.log('123')

            SetTimesheet(dispatch)
            SetExpenses(dispatch, chosenTimesheet.id)
        }

        setIsWindowMobile(window.innerWidth < 576)
    }, [])

    useEffect(() => {
        if (isLoad) return;

        setRowsSelectValue(expenseList.length > +RowsPerPage()[0].value ? RowsPerPage()[0] : RowsPerPage()[3])
        setTimeout(() => {
            setIsLoad(true)
        }, 1000)
    }, [expenseList, isLoad])

    const handleAddRows = () => {
        const plusCount = window.innerWidth < 768 ? 10 : 20

        setRowsSelectValue({
            value: expenseList.length <= +rowsSelectValue.label + plusCount ? 0 : rowsSelectValue.value + plusCount,
            label: expenseList.length <= +rowsSelectValue.label + plusCount ? "All" : String(+rowsSelectValue.label + plusCount)
        })
    }

    const [comments, setComments] = useState<IComment[]>([])

    useEffect(() => {
        if(!chosenTimesheet?.id) return;

        getBearer("get")
        axios.get(getApiLink(`/api/comment/?timesheet_id=${chosenTimesheet.id}`)).then(({data}) => {
            setComments(data)
        })

    }, [chosenTimesheet])

    const [isFixedEditBlock, setIsFixedEditBlock] = useState(false)
    const [amountStatistic, setAmountStatistic] = useState(0)

    return (
        <BlockToDuplicate.Provider value={setItemToDuplicate}>
            <AmountStatistic.Provider value={setAmountStatistic}>
                <FixedTopEdit.Provider value={setIsFixedEditBlock}>
                    <BlockToEdit.Provider value={setItemToEdit}>
                        <CostsStyles style={{paddingBottom: isOpenDownSidebar ? "270px" : (isWindowMobile ? "60px" : "80px")}}
                                     className={`section-table ${isFixedEditBlock && "fixed-edit-block"}`}>

                            <CostsHeader itemToDuplicate={itemToDuplicate} setItemToDuplicate={setItemToDuplicate} isFixedEditBlock={isFixedEditBlock} itemToEdit={itemToEdit}/>
                            {chosenTimesheet?.id && <CostsTable itemToEdit={itemToEdit} rowsSelectValue={rowsSelectValue}/>}

                            <div className="section-table__footer">
                                <div className="section-table__row-per-page visible-on-mob">
                    <span>
                        <Translate>costs_page.table.rows_per_page</Translate>
                    </span>

                                    <CustomSelect list={RowsPerPage()} defaultValue={RowsPerPage()[3]}
                                                  selectValue={rowsSelectValue}
                                                  setSelectedItem={setRowsSelectValue}/>
                                </div>
                                {rowsSelectValue.value !== 0 && expenseList.length > rowsSelectValue.value &&
                                    <button onClick={handleAddRows} className="section-table__see-more btn"
                                            type="button">
                                        <Translate>costs_page.table.show_more</Translate>
                                        <svg width="15" height="15" viewBox="0 0 15 15">
                                            <use xlinkHref="#arrow-down"></use>
                                        </svg>
                                    </button>}
                                <div className="section-table__row-per-page visible-on-desktop">
                    <span>
                        <Translate>costs_page.table.rows_per_page</Translate>
                    </span>

                                    <CustomSelect list={RowsPerPage()} defaultValue={RowsPerPage()[3]}
                                                  selectValue={rowsSelectValue}
                                                  setSelectedItem={setRowsSelectValue}/>
                                </div>
                            </div>
                        </CostsStyles>

                        <DownSidebar comments={comments}
                                     amountStatistic={amountStatistic}
                                     setComments={setComments}
                                     type={"cost"} statisticAllAmount={timesheetStatistic.all_sum}
                                     statisticAllElements={timesheetStatistic.expenses}
                                     setIsOpenDownSidebar={setIsOpenDownSidebar}/>
                    </BlockToEdit.Provider>
                </FixedTopEdit.Provider>
            </AmountStatistic.Provider>
        </BlockToDuplicate.Provider>
    )
}
