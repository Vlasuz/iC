import React, {createContext, useEffect, useState} from 'react'
import {CostsHeader} from "./components/costsHeader/CostsHeader";
import {CostsTable} from "./components/costsTable/CostsTable";
import {RowsPerPage} from "../../constants/RowsPerPage";
import {CustomSelect} from "../../components/customSelect/CustomSelect";
import {useDispatch, useSelector} from "react-redux";
import {IExpense, ITask, ITimesheet} from "../../models";
import {getBearer} from "../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../functions/getApiLink";
import {setExpenses, setTasks} from "../../storage/toolkit";
import {CostsStyles} from "./Costs.styles";
import {DownSidebar} from "../../components/downSidebar/DownSidebar";

interface ICostsProps {

}

export const BlockToEdit: any = createContext(null)

export const Costs: React.FC<ICostsProps> = () => {

    const dispatch = useDispatch()

    const expenseList: IExpense[] = useSelector((state: any) => state.toolkit.expenses)
    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)

    const [rowsSelectValue, setRowsSelectValue] = useState(RowsPerPage()[3])
    const [itemToEdit, setItemToEdit] = useState<IExpense>()
    const [isOpenDownSidebar, setIsOpenDownSidebar] = useState(false)

    useEffect(() => {
        if(!Object.keys(chosenTimesheet).length) return;

        getBearer("get")
        axios.get(getApiLink(`/api/timesheet/my/expenses/?timesheet_id=${chosenTimesheet.id}`)).then(({data}) => {
            dispatch(setExpenses(data))
        })
    }, [chosenTimesheet])

    const handleAddRows = () => {
        const plusCount = 1
        setRowsSelectValue({
            value: rowsSelectValue.value + plusCount,
            label: expenseList.length === +rowsSelectValue.label + plusCount ? "All" : String(+rowsSelectValue.label + plusCount)
        })
    }

    return (
        <BlockToEdit.Provider value={setItemToEdit}>
            <CostsStyles style={{paddingBottom: isOpenDownSidebar ? "300px" : "100px"}} className="section-table">

            <CostsHeader itemToEdit={itemToEdit} />

            <CostsTable rowsSelectValue={rowsSelectValue} />

            <div className="section-table__footer">
                <div className="section-table__row-per-page visible-on-mob">
                    <span>Rows per page:</span>

                    <CustomSelect list={RowsPerPage()} defaultValue={RowsPerPage()[3]} selectValue={rowsSelectValue} setSelectedItem={setRowsSelectValue}/>
                </div>
                {rowsSelectValue.value !== 0 && expenseList.length > rowsSelectValue.value &&
                    <button onClick={handleAddRows} className="section-table__see-more btn" type="button">
                        Show more
                        <svg width="15" height="15" viewBox="0 0 15 15">
                            <use xlinkHref="#arrow-down"></use>
                        </svg>
                    </button>}
                <div className="section-table__row-per-page visible-on-desktop">
                    <span>Rows per page:</span>

                    <CustomSelect list={RowsPerPage()} defaultValue={RowsPerPage()[3]} selectValue={rowsSelectValue} setSelectedItem={setRowsSelectValue}/>
                </div>
            </div>
            </CostsStyles>

            <DownSidebar setIsOpenDownSidebar={setIsOpenDownSidebar}/>
        </BlockToEdit.Provider>
    )
}
