import React, {useEffect} from 'react'
import {IEmployee, IExpense, IStatistic, ITimesheet, IUser} from "../../../models";
import {useSelector} from "react-redux";
import {MonthNumber} from "../../../constants/MonthNumber";
import {currency} from "../../../constants/Currency";

interface IEmployeesTableExportProps {

}

export const EmployeesTableExport: React.FC<IEmployeesTableExportProps> = () => {

    const employees: IEmployee[] = useSelector((state: any) => state.toolkit.employees)
    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)

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
                <td></td>
                <td colSpan={1} style={{
                    // textAlign: "right",
                    // verticalAlign: "middle",
                    // background: "red",
                    // color: "#fff",
                    // width: "20px",
                    // fontSize: "18px",
                }}>
                    {/*<b>iC</b>*/}
                </td>
            </tr>

            <tr>
                <td colSpan={8} style={{textAlign: "center", fontSize: "24px"}}>
                    <b>Employees</b>
                </td>
            </tr>

            <tr>
                <td style={{height: "40px"}}></td>
            </tr>

            <tr>
                {/*<td style={{paddingBottom: "20px", ...styleForOtherText}} colSpan={3}>*/}
                {/*    <b>Name:</b> {user?.first_name ?? userData.first_name} {user?.last_name ?? userData.last_name}</td>*/}
                <td style={{textAlign: "left", paddingBottom: "20px", ...styleForOtherText}} colSpan={3}>

                    <b>{chosenTimesheet?.date && MonthNumber()[+`${chosenTimesheet?.date[3]}${chosenTimesheet?.date[4]}`].translate},
                        20{`${chosenTimesheet?.date && chosenTimesheet?.date[6]}${chosenTimesheet?.date && chosenTimesheet?.date[7]}`}</b>
                </td>
            </tr>

            <tr>
                <td style={{height: "40px"}}></td>
            </tr>

            <tr>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                }}>No
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                }}>Name
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                }}>Position
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                }}>Category
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                }}>Email
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                }}>Email
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                }}>Phone number
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "400",
                    color: "rgba(117, 113, 113, 1)",
                }}>Vacation
                </th>
            </tr>


            {
                employees.map((employee, index) => {
                    return (
                        <tr key={index}>
                            <td style={{
                                textAlign: "center",
                                width: "25px",
                                ...tdStyle
                            }}>
                                {index + 1}
                            </td>
                            <td style={{
                                textAlign: "left",
                                width: "127px",
                                ...tdStyle
                            }}>
                                {employee?.first_name} {employee?.last_name}
                            </td>
                            <td style={{
                                textAlign: "left",
                                width: "172px",
                                ...tdStyle
                            }}>
                                {employee?.role}
                            </td>
                            <td style={{
                                textAlign: "left",
                                width: "99px",
                                ...tdStyle
                            }}>
                                {employee?.status}
                            </td>
                            <td style={{
                                textAlign: "left",
                                width: "210px",
                                ...tdStyle
                            }}>
                                {employee?.email}
                            </td>
                            <td style={{
                                textAlign: "left",
                                width: "76px",
                                ...tdStyle
                            }}>
                                {employee?.all_projects ? "All projects" : `${employee?.projects.length} projects`}
                            </td>
                            <td style={{
                                textAlign: "left",
                                width: "98px",
                                ...tdStyle
                            }}>
                                {employee?.phone}
                            </td>
                            <td style={{
                                textAlign: "left",
                                width: "85px",
                                ...tdStyle
                            }}>
                                {employee?.holidays}
                            </td>
                        </tr>
                    )
                })
            }

            </tbody>

        </table>
    )
}
