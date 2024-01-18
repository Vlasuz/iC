import React, {useEffect} from 'react'
import {IEmployee} from "../../../models";
import {useSelector} from "react-redux";

interface IEmployeesTableExportProps {

}

export const EmployeesTableExport: React.FC<IEmployeesTableExportProps> = () => {

    const employees: IEmployee[] = useSelector((state: any) => state.toolkit.employees)

    return (
        <table id="my-table" className="table-to-download-excel">
            <thead>
            <tr>
                <th style={{background: "#FF0A00", padding: "5px 10px", width: "25px"}}>№</th>
                <th style={{background: "#FF0A00", padding: "5px 10px", width: "127px"}}>Name</th>
                <th style={{background: "#FF0A00", padding: "5px 10px", width: "172px"}}>Position of company</th>
                <th style={{background: "#FF0A00", padding: "5px 10px", width: "99px"}}>Status</th>
                <th style={{background: "#FF0A00", padding: "5px 10px", width: "210px"}}>Email</th>
                <th style={{background: "#FF0A00", padding: "5px 10px", width: "76px"}}>Projects</th>
                <th style={{background: "#FF0A00", padding: "5px 10px", width: "98px"}}>Phone number</th>
                <th style={{background: "#FF0A00", padding: "5px 10px", width: "85px"}}>Vacations</th>
            </tr>
            </thead>
            <tbody>
            {
                employees?.map((employee, index) =>
                    <tr key={employee.id}>
                        <td style={{padding: "10px 20px"}}>{index + 1}</td>
                        <td style={{padding: "10px 20px"}}>{employee.first_name} {employee.last_name}</td>
                        <td style={{padding: "10px 20px"}}>{employee.role}</td>
                        <td style={{padding: "10px 20px"}}>{employee.status}</td>
                        <td style={{padding: "10px 20px"}}>{employee.email}</td>
                        <td style={{padding: "10px 20px"}}>{employee.projects.length}</td>
                        <td style={{padding: "10px 20px"}}>{employee.phone}</td>
                        <td style={{padding: "10px 20px"}}>{employee.holidays}</td>
                    </tr>
                )
            }
            </tbody>
        </table>
    )
}
