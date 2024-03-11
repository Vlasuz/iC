import React from 'react'
import {IExpense, ITimesheet} from "../../../models";
import {MonthNumber} from "../../../constants/MonthNumber";
import ExcelJS from "exceljs";
import FileSaver from "file-saver";
import {Costs} from "../../../components/excel/Costs";
import imageToBase64 from "image-to-base64/browser";
import logo from "../../../assets/html/img/logo.png";

interface ICostsExportTableProps {
    chosenTimesheet: ITimesheet
    expenses: IExpense[]
    translate: any
}

export const CostsExcel = async ({chosenTimesheet, expenses, translate}: ICostsExportTableProps) => {

    const documentName = `${chosenTimesheet?.date?.split('/').reverse().join('')}_Costs_${chosenTimesheet?.user?.first_name}_${chosenTimesheet?.user?.last_name}`

    const workbook = new ExcelJS.Workbook();
    const worksheetCost = workbook.addWorksheet("Costs");

    const base64Logo = await imageToBase64(logo) // Path to the image

    const imageId = workbook.addImage({
        base64: base64Logo,
        extension: 'png',
    });

    Costs({worksheet: worksheetCost, translate, chosenTimesheet, expenses, logo: imageId})

    workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], {type: 'application/octet-stream'});
        FileSaver.saveAs(blob, `${documentName}.xlsx`);
    });


}
