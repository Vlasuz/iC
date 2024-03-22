import React, {useEffect} from 'react'
import {MonthNumber} from "../../../constants/MonthNumber";
import ExcelJS from "exceljs";
import imageToBase64 from "image-to-base64/browser";
import logo from "../../../assets/html/img/logo.png";
import {Timesheet} from "../../../components/excel/Timesheet";
import FileSaver from "file-saver";
import {Employees} from "../../../components/excel/Employees";
import {IEmployee} from "../../../models";

interface IEmployeesExcelProps {
    listYear: any
    employees: IEmployee[],
    translate: any
}

export const EmployeesExcel = async ({listYear, employees, translate}: IEmployeesExcelProps) => {

    const documentName = `Employees`

    const workbook = new ExcelJS.Workbook();
    const worksheetTimesheet = workbook.addWorksheet(documentName);

    const base64Logo = await imageToBase64(logo) // Path to the image

    const imageId = workbook.addImage({
        base64: base64Logo,
        extension: 'png',
    });

    Employees({worksheet: worksheetTimesheet, listYear, employees, translate, logo: imageId})

    workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], {type: 'application/octet-stream'});
        FileSaver.saveAs(blob, `${documentName}.xlsx`);
    });

}
