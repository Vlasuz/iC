import React, {useEffect, useState} from 'react'
import {ITimesheet} from "../../../models";
import {useSelector} from "react-redux";
import {MonthNumber} from "../../../constants/MonthNumber";

interface ISummaryEmployeesExportTableProps {
    statisticForTable: any
    isOpen: boolean
}

export const SummaryEmployeesExportTable: React.FC<ISummaryEmployeesExportTableProps> = ({statisticForTable, isOpen}) => {

    const [statProjectForExport, setStatProjectForExport]: any = useState([])
    const [statUserForExport, setStatUserForExport]: any = useState([])
    const [allSumForTable, setAllSumForTable] = useState(0)

    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)

    useEffect(() => {
        setAllSumForTable(0)

        statUserForExport.reduce((sum: any, cur: any) => {
            setAllSumForTable(prev => prev + cur.all_hours)
        }, 0)
    }, [statUserForExport])

    useEffect(() => {
        const log = statisticForTable.map((user: any) => {
            return user?.data?.map((proj: any) => proj.project)
        })

        setStatUserForExport(statisticForTable)

        let newArray: any = []
        let finalArray: any = []

        for (let i = 0; i < log.length; i++) {
            newArray.push(...log[i])
        }

        for (let i = 0; i < newArray.length; i++) {
            if (!finalArray.some((item: any) => item.id === newArray[i].id)) {
                finalArray.push(newArray[i])
            }
        }

        setStatProjectForExport(finalArray)
    }, [statisticForTable])

    const findProject: any = (data: any, proj: any) => {
        return data.filter((item: any) => item.project.id === proj.id)[0]?.task?.hours ?? 0
    }
    const sumTotalForProj: any = (proj: any) => {

        let sum = 0;
        let amount = 0;

        statisticForTable.forEach((user: any) => {

            sum = user.data.filter((item: any) => item.project.id === proj.id).reduce((_: any, current: any) => {
                amount = amount + current.task.hours
            }, amount)

        })

        return sum;
    }

    return (
        <>

            {isOpen && <table
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

                <tr>
                    <td style={{height: "21px"}}>

                    </td>
                </tr>

                <tr>
                    <td style={{textAlign: "center", fontSize: "24px"}} colSpan={statProjectForExport.length + 2}>
                        <b>Project Controling</b>
                    </td>
                </tr>

                <tr>
                    <td style={{height: "21px"}}>

                    </td>
                </tr>

                <tr>
                    <td style={{fontSize: "12px"}} colSpan={statProjectForExport.length + 2}>
                        <b style={{textAlign: "center"}}>{chosenTimesheet?.date && MonthNumber()[+`${chosenTimesheet?.date[3]}${chosenTimesheet?.date[4]}`].translate},
                            20{`${chosenTimesheet?.date && chosenTimesheet?.date[6]}${chosenTimesheet?.date && chosenTimesheet?.date[7]}`}</b>
                    </td>
                </tr>

                <tr>
                    <td style={{height: "21px"}}>

                    </td>
                </tr>

                <tr>
                    <td></td>
                    <td></td>

                    {
                        statProjectForExport.map((item: any) =>
                            <td style={{verticalAlign: "top", textAlign: "center"}}>
                                {item?.name}
                            </td>
                        )
                    }
                </tr>

                <tr>
                    <td style={{width: "25px", textAlign: "center"}}>
                        <b>No</b>
                    </td>
                    <td style={{width: "138px", textAlign: "center"}}>
                        <b>Users</b>
                    </td>

                    {
                        statProjectForExport.map((item: any) =>
                            <td style={{width: "91px", textAlign: "center", verticalAlign: "top"}}>
                                <b>{item?.description}</b>
                            </td>
                        )
                    }

                    <td style={{width: "48px", verticalAlign: "top", textAlign: "center"}}>
                        <b>Total</b>
                    </td>
                </tr>

                {
                    statUserForExport.map((item: any, index: number) =>
                        <tr>
                            <td style={{textAlign: "center", background: "#f2f2f2"}}>
                                {index + 1}
                            </td>
                            <td style={{background: "#f2f2f2"}}>
                                {item.user.first_name} {item.user.last_name}
                            </td>

                            {
                                statProjectForExport.map((proj: any) =>
                                    <td style={{textAlign: "center"}}>
                                        {
                                            findProject(item.data, proj)
                                        }
                                    </td>
                                )
                            }

                            <td style={{textAlign: "center"}}>
                                {item?.all_hours}
                            </td>

                        </tr>
                    )
                }

                <tr>
                    <td></td>
                    <td>
                        <b>Total hours / month</b>
                    </td>

                    {
                        statProjectForExport.map((proj: any) =>
                            <td style={{textAlign: "center"}}>
                                {
                                    sumTotalForProj(proj)
                                }
                            </td>
                        )
                    }

                    <td style={{textAlign: "center", color: "#ff0000"}}>
                        <b>{allSumForTable}</b>
                    </td>
                </tr>

            </table>}

        </>
    )
}
