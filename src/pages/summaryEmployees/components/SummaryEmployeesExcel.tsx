import React from 'react'
import {IAllUserProjects, IExpense, IProject, ITimesheet} from "../../../models";
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


    const today = `${String(new Date().getFullYear()).slice(2, 4)}${(new Date().getMonth() + 1) < 10 ? "0" + (new Date().getMonth() + 1) : new Date().getMonth() + 1}${new Date().getDate() < 10 ? "0" + new Date().getDate() : new Date().getDate()}`
    const documentName = `${today}_Project_Controling_${MonthNumber()[+(chosenTimesheet?.date[3] + chosenTimesheet?.date[4])]?.en_title}`

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
