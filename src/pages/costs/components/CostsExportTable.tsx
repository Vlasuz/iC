import React, {useEffect, useState} from 'react'
import {IExpense, IStatistic, ITask, ITimesheet, IUser} from "../../../models";
import {useSelector} from "react-redux";
import {MonthNumber} from "../../../constants/MonthNumber";
import {currency} from "../../../constants/Currency";

interface ICostsExportTableProps {
    user?: any
}

export const CostsExportTable: React.FC<ICostsExportTableProps> = ({user}) => {

    const expenseList: IExpense[] = useSelector((state: any) => state.toolkit.expenses)
    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)
    const timesheetStatistic: IStatistic = useSelector((state: any) => state.toolkit.timesheetStatistic)
    const userData: IUser = useSelector((state: any) => state.toolkit.user)

    const styleForOtherText = {
        fontSize: "16px",
    }

    const tdStyle = {
        verticalAlign: "middle",
        fontSize: "10px",
        border: "1px solid rgba(208, 206, 206, 1)",
    }

    return (
        <table
            border={2}
            style={{
                borderCollapse: 'collapse',
                backgroundColor: '#fff',
                fontFamily: 'Calibri',
                width: '100%',
            }}
            id="my-table"
            className="table-to-download-excel"
        >

            <tbody>
            <tr>
                <td style={{height: "30px"}}>
                    <img width={30} height={30} src="https://ic.timesheet.space/static/media/logo.7e472f052ce8ccb0ca47.webp" alt=""/>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                {/*<td colSpan={2} style={{*/}
                {/*    textAlign: "right",*/}
                {/*    verticalAlign: "middle",*/}
                {/*    background: "red",*/}
                {/*    color: "#fff",*/}
                {/*    width: "20px",*/}
                {/*    fontSize: "18px",*/}
                {/*}}>*/}
                {/*    <b>iC</b>*/}
                {/*</td>*/}
            </tr>

            <tr>
                <td colSpan={6} style={{textAlign: "center", fontSize: "24px"}}>
                    <b>Timesheet (Costs Report)</b>
                </td>
            </tr>

            <tr>
                <td style={{height: "40px"}}></td>
            </tr>

            <tr>
                <td style={{paddingBottom: "20px", ...styleForOtherText}} colSpan={3}>
                    <b>Name:</b> {user?.first_name ?? userData.first_name} {user?.last_name ?? userData.last_name}</td>
                <td style={{textAlign: "right", paddingBottom: "20px", ...styleForOtherText}} colSpan={3}>

                    <b>{chosenTimesheet?.date && MonthNumber()[+`${chosenTimesheet?.date[3]}${chosenTimesheet?.date[4]}`].translate},
                        20{`${chosenTimesheet?.date && chosenTimesheet?.date[6]}${chosenTimesheet?.date && chosenTimesheet?.date[7]}`}</b>
                </td>
            </tr>

            <tr></tr>

            <tr>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                    width: "25px"
                }}>No
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                    width: "65px"
                }}>Date
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                    width: "85px"
                }}>Project Num
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                    width: "245px"
                }}>Project description
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                    width: "auto"
                }}>Description of the expense
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                    width: "78px"
                }}>Time
                </th>
            </tr>


            {
                expenseList.map((expenseItem, index) => {
                    return (
                        <tr key={index}>
                            <td style={{
                                textAlign: "center",
                                ...tdStyle
                            }}>{index + 1}</td>
                            <td style={{
                                textAlign: "center",
                                ...tdStyle
                            }}>
                                {expenseItem.date.substring(3, 5)}/{expenseItem.date.substring(0, 2)}/{expenseItem.date.substring(6)}
                            </td>
                            <td style={{
                                textAlign: "center",
                                ...tdStyle
                            }}>{expenseItem.project.name}</td>
                            <td style={{
                                textAlign: "left",
                                width: "245px",
                                padding: "2px 5px",
                                ...tdStyle
                            }}>{expenseItem.project.description}</td>
                            <td style={{
                                textAlign: "left",
                                padding: "2px 5px",
                                ...tdStyle
                            }}>{expenseItem.description}</td>
                            <td style={{
                                textAlign: "center",
                                width: "75px",
                                ...tdStyle
                            }}>{expenseItem.sum}</td>
                        </tr>
                    )
                })
            }


            <tr></tr>

            <tr>
                <td></td>
                <td></td>
                <td style={{textAlign: "right", paddingTop: "20px", ...styleForOtherText}} colSpan={4}>
                    <b>Total: {timesheetStatistic.all_sum} {currency}</b></td>
            </tr>

            {chosenTimesheet.status === "approve" && <>
                <tr></tr>

                <tr>
                    <td style={{textAlign: "left", paddingTop: "20px", ...styleForOtherText}} colSpan={4}>
                        <b>Approval: </b> {chosenTimesheet.manager.first_name} {chosenTimesheet.manager.last_name}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td style={{textAlign: "left", ...styleForOtherText}} colSpan={4}>
                        <b>Date: </b>
                        {chosenTimesheet.updated_at[3]}{chosenTimesheet.updated_at[4]}/{chosenTimesheet.updated_at[0]}{chosenTimesheet.updated_at[1]}/{chosenTimesheet.updated_at[6]}{chosenTimesheet.updated_at[7]}
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </>}

            </tbody>

        </table>
    )
}
