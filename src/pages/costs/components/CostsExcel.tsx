import React from 'react'
import {IExpense, ITimesheet} from "../../../models";
import {MonthNumber} from "../../../constants/MonthNumber";
import ExcelJS from "exceljs";
import FileSaver from "file-saver";
import {Costs} from "../../../components/excel/Costs";

interface ICostsExportTableProps {
    chosenTimesheet: ITimesheet
    expenses: IExpense[]
    translate: any
}

export const CostsExcel = async ({chosenTimesheet, expenses, translate}: ICostsExportTableProps) => {

    const documentName = `${chosenTimesheet?.date?.split('/').reverse().join('')}_Costs_${chosenTimesheet?.user?.first_name}_${chosenTimesheet?.user?.last_name}`

    const workbook = new ExcelJS.Workbook();
    const worksheetCost = workbook.addWorksheet("Costs");

    Costs({worksheet: worksheetCost, translate, chosenTimesheet, expenses})

    workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], {type: 'application/octet-stream'});
        FileSaver.saveAs(blob, `${documentName}.xlsx`);
    });


}
