import React, {useEffect, useState} from 'react'
import {IProject, ITimesheet, IVacation} from "../../../models";
import {useSelector} from "react-redux";
import {getBearer} from "../../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {MonthNumber} from "../../../constants/MonthNumber";
import {Translate} from "../../../components/translate/Translate";

interface IProjectsTabelExportProps {

}

export const ProjectsTableExport: React.FC<IProjectsTabelExportProps> = () => {

    const chosenTimesheet: ITimesheet = useSelector((state: any) => state.toolkit.chosenTimesheet)
    const projects: IProject[] = useSelector((state: any) => state.toolkit.projects)

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
                <td colSpan={2} style={{
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
                <td colSpan={3} style={{textAlign: "center", fontSize: "24px"}}>
                    <b>Projects</b>
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
                    width: "77px",
                    color: "rgba(0, 0, 0, 1)",
                }}>Number
                </th>
                <th style={{
                    ...tdStyle,
                    padding: "2px 0",
                    fontSize: "10px",
                    width: "462x",
                    fontWeight: "700",
                    color: "rgba(0, 0, 0, 1)",
                }}>
                    Project description
                </th>
            </tr>


            {
                projects.map((project, index) => {
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
                                textAlign: "center",
                                width: "77px",
                                ...tdStyle
                            }}>
                                {project.name}
                            </td>
                            <td style={{
                                textAlign: "left",
                                width: "462x",
                                ...tdStyle
                            }}>
                                {project.description}
                            </td>
                        </tr>
                    )
                })
            }

            </tbody>

        </table>
    )
}
