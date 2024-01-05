import React, {useEffect, useState} from 'react'
import {IStatistic, ITask, ITimesheet, IUser} from "../../../models";
import {useSelector} from "react-redux";
import {MonthNumber} from "../../../constants/MonthNumber";
import {currency} from "../../../constants/Currency";

interface ISummaryExportTableProps {
    statistic: IStatistic | undefined
    statisticList: any
}

export const SummaryExportTable: React.FC<ISummaryExportTableProps> = ({statistic, statisticList}) => {

    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)
    const userData: IUser = useSelector((state: any) => state.toolkit.user)

    const styleForOtherText = {
        fontSize: "16px",
    }

    const tdStyle = {
        verticalAlign: "middle",
        fontSize: "10px",
        border: "1px solid rgba(208, 206, 206, 1)",
    }

    console.log(statistic)

    return (
        statisticList.length && <table
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
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td style={{fontSize: "18px", color: "red", height: "30px", textAlign: "right", verticalAlign: "top"}}>
                    <b>iC</b>
                </td>
                {/*<td style={{height: "30px"}}>*/}
                {/*    <img width={30} height={30} src="https://ic.timesheet.space/static/media/logo.7e472f052ce8ccb0ca47.webp" alt=""/>*/}
                {/*</td>*/}
            </tr>

            <tr>
                <td colSpan={5} style={{textAlign: "center", fontSize: "24px"}}>
                    <b>Timesheet (Overview)</b>
                </td>
            </tr>

            <tr>
                <td style={{height: "40px"}}></td>
            </tr>

            <tr>
                <td style={{paddingBottom: "20px", ...styleForOtherText}} colSpan={3}>
                    <b>Name:</b> {userData.first_name} {userData.last_name}</td>
                <td style={{textAlign: "right", paddingBottom: "20px", ...styleForOtherText}} colSpan={2}>
                    <b>{`${chosenTimesheet?.date && MonthNumber()[+`${chosenTimesheet?.date[3]}${chosenTimesheet?.date[4]}`]}`},
                        20{`${chosenTimesheet?.date && chosenTimesheet?.date[6]}${chosenTimesheet?.date && chosenTimesheet?.date[7]}`}</b>
                </td>
            </tr>

            <tr></tr>

            <tr>
                <th style={{
                    ...tdStyle,
                    padding: "1px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                    width: "25px"
                }}>No
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "1px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                    width: "85px"
                }}>Project Num
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "1px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                    width: "auto"
                }}>Project description
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "1px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                    width: "184px"
                }}>Working hours
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "1px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                    width: "169px"
                }}>Costs (UAH)
                </th>
            </tr>


            {
                statisticList?.map((summaryItem: any, index: number) => {
                    return (
                        <tr key={index}>
                            <td style={{
                                textAlign: "center",
                                ...tdStyle
                            }}>
                                {index + 1}
                            </td>
                            <td style={{
                                textAlign: "center",
                                ...tdStyle
                            }}>
                                {summaryItem.project.name}
                            </td>
                            <td style={{

                                textAlign: "left",
                                width: "245px",
                                padding: "2px 10px",
                                ...tdStyle
                            }}>
                                {summaryItem.project.description}
                            </td>
                            <td style={{
                                textAlign: "center",
                                padding: "2px 10px",
                                ...tdStyle
                            }}>
                                {summaryItem.task.hours}
                            </td>
                            <td style={{
                                textAlign: "center",
                                padding: "2px 10px",
                                ...tdStyle
                            }}>
                                {summaryItem.expense.sum}
                            </td>
                        </tr>
                    )
                })
            }


            <tr></tr>

            <tr>
                <td></td>
                <td></td>
                <td style={{textAlign: "right", paddingTop: "20px", ...styleForOtherText}}>
                    <b>Total:</b>
                </td>
                <td style={{textAlign: "center", paddingTop: "20px", ...styleForOtherText}}>
                    <b>{statistic?.all_hours} hours</b>
                </td>
                <td style={{textAlign: "center", paddingTop: "20px", ...styleForOtherText}}>
                    <b>{statistic?.all_sum} {currency}</b>
                </td>
            </tr>

            {chosenTimesheet.status === "approve" && <>
                <tr></tr>

                <tr>
                    <td style={{textAlign: "left", paddingTop: "20px", ...styleForOtherText}} colSpan={3}>
                        <b>Approval: </b> {chosenTimesheet.manager.first_name} {chosenTimesheet.manager.last_name}
                    </td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td style={{textAlign: "left", ...styleForOtherText}} colSpan={3}>
                        <b>Date: </b>
                        {chosenTimesheet.updated_at[3]}{chosenTimesheet.updated_at[4]}/{chosenTimesheet.updated_at[0]}{chosenTimesheet.updated_at[1]}/{chosenTimesheet.updated_at[6]}{chosenTimesheet.updated_at[7]}
                    </td>
                    <td></td>
                    <td></td>
                </tr>
            </>}

            </tbody>

        </table>
    )
}
