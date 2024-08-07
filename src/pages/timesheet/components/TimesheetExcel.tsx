import React from 'react'
import {ITask, ITimesheet} from "../../../models";
import {MonthNumber} from "../../../constants/MonthNumber";
import ExcelJS from "exceljs";
import FileSaver from "file-saver";
import logo from './../../../assets/html/img/logo.png'
import imageToBase64 from 'image-to-base64/browser';
import {Timesheet} from "../../../components/excel/Timesheet";

interface ITimesheetExcelProps {
    chosenTimesheet: ITimesheet
    tasks: ITask[]
    translate: any
    currentMonth?: number | undefined
}

export const TimesheetExcel = async ({chosenTimesheet, tasks, translate, currentMonth}: ITimesheetExcelProps) => {
    

    const today = `${String(new Date().getFullYear()).slice(2, 4)}${(new Date().getMonth() + 1) < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1}${new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate()}`
    const documentName = `${today}_Timesheet_${chosenTimesheet?.user?.first_name}_${chosenTimesheet?.user?.last_name}_${MonthNumber()[currentMonth ?? +(chosenTimesheet?.date[3] + chosenTimesheet?.date[4])]?.en_title}`

    const workbook = new ExcelJS.Workbook();
    const worksheetTimesheet = workbook.addWorksheet(documentName);

    const base64Logo = await imageToBase64(logo) // Path to the image

    const imageId = workbook.addImage({
        base64: base64Logo,
        extension: 'png',
    });

    Timesheet({worksheet: worksheetTimesheet, chosenTimesheet, tasks, translate, currentMonth, logo: imageId})

    workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], {type: 'application/octet-stream'});
        FileSaver.saveAs(blob, `${documentName}.xlsx`);
    });


}
