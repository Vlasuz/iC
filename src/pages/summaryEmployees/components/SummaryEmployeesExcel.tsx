import React from 'react'
import {IExpense, IProject, ITimesheet} from "../../../models";
import {MonthNumber} from "../../../constants/MonthNumber";
import ExcelJS from "exceljs";
import FileSaver from "file-saver";
import {SummaryEmployeesExcelTimesheet} from "./SummaryEmployeesExcelTimesheet";
import {SummaryEmployeesExcelCosts} from "./SummaryEmployeesExcelCosts";
import logo from './../../../assets/html/img/logo.png'
import imageToBase64 from "image-to-base64/browser";

interface ISummaryEmployeesExcelProps {
    chosenTimesheet: ITimesheet
    projects: IProject[]
    users: any
    translate: any
}

export const SummaryEmployeesExcel = async ({
                                                chosenTimesheet,
                                                projects,
                                                users,
                                                translate
                                            }: ISummaryEmployeesExcelProps) => {


    console.log(projects, users)


    const documentName = `${chosenTimesheet?.date?.split('/').reverse().join('')}_Project_Controling_${MonthNumber()[+(chosenTimesheet?.date[3] + chosenTimesheet?.date[4])]?.en_title}`

    const workbook = new ExcelJS.Workbook();
    const worksheetTimesheet = workbook.addWorksheet("Timesheet");
    const worksheetCosts = workbook.addWorksheet("Costs");

    const base64Logo = await imageToBase64(logo) // Path to the image

    const imageId = workbook.addImage({
        base64: base64Logo,
        extension: 'png',
    });

    SummaryEmployeesExcelTimesheet({worksheet: worksheetTimesheet, chosenTimesheet, projects, users, translate, logo: imageId})
    SummaryEmployeesExcelCosts({worksheet: worksheetCosts, chosenTimesheet, projects, users, translate, logo: imageId})




    workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], {type: 'application/octet-stream'});
        FileSaver.saveAs(blob, `${documentName}.xlsx`);
    });


}
