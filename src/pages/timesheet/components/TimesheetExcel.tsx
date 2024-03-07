import React from 'react'
import {ITask, ITimesheet} from "../../../models";
import {MonthNumber} from "../../../constants/MonthNumber";
import ExcelJS from "exceljs";
import FileSaver from "file-saver";
import logo from './../../../assets/html/img/logo.png'
import {Timesheet} from "../../../components/excel/Timesheet";

interface ITimesheetExcelProps {
    chosenTimesheet: ITimesheet
    tasks: ITask[]
    translate: any
}

export const TimesheetExcel = async ({chosenTimesheet, tasks, translate}: ITimesheetExcelProps) => {

    const documentName = `${chosenTimesheet?.date?.split('/').reverse().join('')}_Timesheet_${chosenTimesheet?.user?.first_name}_${chosenTimesheet?.user?.last_name}`

    const workbook = new ExcelJS.Workbook();
    const worksheetTimesheet = workbook.addWorksheet(documentName);

    Timesheet({worksheet: worksheetTimesheet, chosenTimesheet, tasks, translate})

    workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], {type: 'application/octet-stream'});
        FileSaver.saveAs(blob, `${documentName}.xlsx`);
    });


}
