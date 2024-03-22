import React, {useEffect, useState} from 'react'
import {IEmployee, ITimesheet, IVacation} from "../../../models";
import {useSelector} from "react-redux";
import {MonthNumber} from "../../../constants/MonthNumber";
import {getBearer} from "../../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import { Translate } from '../../../components/translate/Translate';
import ExcelJS from "exceljs";
import imageToBase64 from "image-to-base64/browser";
import logo from "../../../assets/html/img/logo.png";
import {Projects} from "../../../components/excel/Projects";
import FileSaver from "file-saver";
import {Vacations} from "../../../components/excel/Vacations";

interface IVacationsExcelProps {
    listYear: any
    vacations: IVacation[]
    translate: any
}

export const VacationsExcel = async ({listYear, vacations, translate}: IVacationsExcelProps) => {

    const documentName = `Vacations`

    const workbook = new ExcelJS.Workbook();
    const worksheetTimesheet = workbook.addWorksheet(documentName);

    const base64Logo = await imageToBase64(logo) // Path to the image

    const imageId = workbook.addImage({
        base64: base64Logo,
        extension: 'png',
    });

    Vacations({worksheet: worksheetTimesheet, listYear, vacations, translate, logo: imageId})

    workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], {type: 'application/octet-stream'});
        FileSaver.saveAs(blob, `${documentName}.xlsx`);
    });

}
