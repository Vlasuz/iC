import React, {useEffect, useState} from 'react'
import {IEmployee, ITimesheet, IVacation} from "../../../models";
import {useSelector} from "react-redux";
import {MonthNumber} from "../../../constants/MonthNumber";
import {getBearer} from "../../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import { Translate } from '../../../components/translate/Translate';

interface IVacationsTableExportProps {

}

export const VacationsTableExport: React.FC<IVacationsTableExportProps> = () => {

    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)
    const [vacations, setVacations] = useState<IVacation[]>([])
    getBearer("get")
    axios.get(getApiLink(`/api/admin/employee/vacations/`)).then(({data}) => {
        setVacations(data)
    }).catch(er => console.log(er))

    // const [total, setTotal] = useState(0)
    // const [totalMonth, setTotalMonth] = useState(0)

    // useEffect(() => {
    //     // setTotal(0)
    //     // setTotal(prev => prev + +itemData.remain + +extraDays + +itemData.user.holidays)
    //     // itemData.months.map(item => setTotalMonth(prev => prev + item.days))
    // }, [extraDays])

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
                <td colSpan={19} style={{textAlign: "center", fontSize: "24px"}}>
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
                    fontWeight: "700",
                    color: "rgba(0, 0, 0, 1)",
                }}>No
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "rgba(0, 0, 0, 1)",
                }}>Name
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "rgba(0, 0, 0, 1)",
                }}>
                    <Translate>vacations_admin.remain</Translate>
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "rgba(0, 0, 0, 1)",
                }}>
                    <Translate>vacations_admin.extra</Translate>
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "rgba(0, 0, 0, 1)",
                }}>
                    <Translate>vacations_admin.days_per_year</Translate>
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "rgba(0, 0, 0, 1)",
                }}>
                    <Translate>vacations_admin.total</Translate>
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "rgba(0, 0, 0, 1)",
                }}>
                    <Translate>vacations_admin.jan</Translate>
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "rgba(0, 0, 0, 1)",
                }}>
                    <Translate>vacations_admin.feb</Translate>
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "rgba(0, 0, 0, 1)",
                }}>
                    <Translate>vacations_admin.mar</Translate>
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "rgba(0, 0, 0, 1)",
                }}>
                    <Translate>vacations_admin.apr</Translate>
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "rgba(0, 0, 0, 1)",
                }}>
                    <Translate>vacations_admin.may</Translate>
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "rgba(0, 0, 0, 1)",
                }}>
                    <Translate>vacations_admin.jun</Translate>
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "rgba(0, 0, 0, 1)",
                }}>
                    <Translate>vacations_admin.jul</Translate>
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "rgba(0, 0, 0, 1)",
                }}>
                    <Translate>vacations_admin.aug</Translate>
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "rgba(0, 0, 0, 1)",
                }}>
                    <Translate>vacations_admin.sep</Translate>
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "rgba(0, 0, 0, 1)",
                }}>
                    <Translate>vacations_admin.oct</Translate>
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "rgba(0, 0, 0, 1)",
                }}>
                    <Translate>vacations_admin.nov</Translate>
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "rgba(0, 0, 0, 1)",
                }}>
                    <Translate>vacations_admin.dec</Translate>
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    fontWeight: "700",
                    color: "rgba(0, 0, 0, 1)",
                }}>
                    <Translate>vacations_admin.remain_days</Translate>
                </th>
            </tr>


            {
                vacations.map((vacation, index) => {

                    const amountMonth = vacation.months.reduce((sum: any, item) => {
                        sum = sum + item.days
                        return sum
                    }, 0)

                    return (
                        <tr key={index}>
                            <td style={{
                                textAlign: "center",
                                width: "25px",
                                background: "#D0D0D0",
                                ...tdStyle
                            }}>
                                {index + 1}
                            </td>
                            <td style={{
                                textAlign: "left",
                                width: "127px",
                                background: "#D0D0D0",
                                ...tdStyle
                            }}>
                                {vacation.user.first_name} {vacation.user.last_name}
                            </td>
                            <td style={{
                                textAlign: "center",
                                width: "50x",
                                ...tdStyle
                            }}>
                                {vacation.remain.toFixed(1)}
                            </td>
                            <td style={{
                                textAlign: "center",
                                width: "33px",
                                ...tdStyle
                            }}>
                                {vacation.extra}
                            </td>
                            <td style={{
                                textAlign: "center",
                                width: "28px",
                                ...tdStyle
                            }}>
                                {vacation.user.holidays}
                            </td>
                            <td style={{
                                textAlign: "center",
                                width: "66px",
                                background: "#D6B6B6",
                                ...tdStyle
                            }}>
                                {+vacation.remain + +vacation.extra + +vacation.user.holidays}
                            </td>
                            {
                                vacation.months.map((item, index2) =>
                                    <td key={index2} style={{
                                        textAlign: "center",
                                        width: "25px",
                                        ...tdStyle
                                    }}>

                                        {item.days.toFixed(1)}
                                    </td>
                                )
                            }
                            <td style={{
                                textAlign: "center",
                                width: "69px",
                                background: "#D6B6B6",
                                ...tdStyle
                            }}>
                                {(+vacation.remain + +vacation.extra + +vacation.user.holidays - amountMonth).toFixed(1)}
                            </td>
                        </tr>
                    )
                })
            }

            </tbody>

        </table>
    )
}
