import React, {useEffect} from 'react'
import ExcelJS from "exceljs";
import {MonthNumber} from "../../../constants/MonthNumber";
import FileSaver from "file-saver";
import {IExpense, ITask, ITimesheet} from "../../../models";
import {Overview} from "../../../components/excel/Overview";
import {Timesheet} from "../../../components/excel/Timesheet";
import {Costs} from "../../../components/excel/Costs";
import logo from './../../../assets/html/img/logo.png'
import imageToBase64 from 'image-to-base64/browser';

interface ISummaryExcelProps {
    chosenTimesheet: ITimesheet
    translate: any
    data: any
    tasks: ITask[]
    expenses: IExpense[]
}

export const SummaryExcel = async ({chosenTimesheet, translate, data, tasks, expenses}: ISummaryExcelProps) => {

    const documentName = `${chosenTimesheet?.date?.split('/').reverse().join('')}_Full_Timesheet_${chosenTimesheet?.user?.first_name}_${chosenTimesheet?.user?.last_name}_${MonthNumber()[+(chosenTimesheet?.date[3] + chosenTimesheet?.date[4])]?.en_title}`

    const workbook = new ExcelJS.Workbook();
    const worksheetOverview = workbook.addWorksheet("Overview");
    const worksheetTimesheet = workbook.addWorksheet("Timesheet");
    const worksheetCost = workbook.addWorksheet("Costs");

    const base64Logo = await imageToBase64(logo) // Path to the image

    const imageId = workbook.addImage({
        base64: base64Logo,
        extension: 'png',
    });

    Overview({translate, chosenTimesheet, data, worksheet: worksheetOverview})
    Timesheet({worksheet: worksheetTimesheet, chosenTimesheet, tasks, translate, logo: imageId})
    Costs({worksheet: worksheetCost, translate, chosenTimesheet, expenses, logo: imageId})

    workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], {type: 'application/octet-stream'});
        FileSaver.saveAs(blob, `${documentName}.xlsx`);
    });

}
