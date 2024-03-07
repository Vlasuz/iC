import React, {useEffect} from 'react'
import ExcelJS from "exceljs";
import {MonthNumber} from "../../../constants/MonthNumber";
import FileSaver from "file-saver";
import {IExpense, ITask, ITimesheet} from "../../../models";
import {Overview} from "../../../components/excel/Overview";
import {Timesheet} from "../../../components/excel/Timesheet";
import {Costs} from "../../../components/excel/Costs";

interface ISummaryExcelProps {
    chosenTimesheet: ITimesheet
    translate: any
    data: any
    tasks: ITask[]
    expenses: IExpense[]
}

export const SummaryExcel = ({chosenTimesheet, translate, data, tasks, expenses}: ISummaryExcelProps) => {

    const documentName = `${chosenTimesheet?.date?.split('/').reverse().join('')}_Full_Timesheet_${chosenTimesheet?.user?.first_name}_${chosenTimesheet?.user?.last_name}_${MonthNumber()[+(chosenTimesheet?.date[3] + chosenTimesheet?.date[4])]?.en_title}`

    const workbook = new ExcelJS.Workbook();
    const worksheetOverview = workbook.addWorksheet("Overview");
    const worksheetTimesheet = workbook.addWorksheet("Timesheet");
    const worksheetCost = workbook.addWorksheet("Costs");

    Overview({translate, chosenTimesheet, data, worksheet: worksheetOverview})
    Timesheet({worksheet: worksheetTimesheet, chosenTimesheet, tasks, translate})
    Costs({worksheet: worksheetCost, translate, chosenTimesheet, expenses})

    workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], {type: 'application/octet-stream'});
        FileSaver.saveAs(blob, `${documentName}.xlsx`);
    });

}
