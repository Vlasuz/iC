import React, {useEffect, useState} from 'react'
import {IProject, ITimesheet, IVacation} from "../../../models";
import {useSelector} from "react-redux";
import {getBearer} from "../../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../../functions/getApiLink";
import {MonthNumber} from "../../../constants/MonthNumber";
import {Translate} from "../../../components/translate/Translate";
import ExcelJS from "exceljs";
import imageToBase64 from "image-to-base64/browser";
import logo from "../../../assets/html/img/logo.png";
import FileSaver from "file-saver";
import {Projects} from "../../../components/excel/Projects";

interface IProjectsExcelProps {
    listYear: any
    projects: IProject[]
    translate: any
}

export const ProjectsExcel = async ({listYear, projects, translate}: IProjectsExcelProps) => {

    const documentName = `Projects`

    const workbook = new ExcelJS.Workbook();
    const worksheetTimesheet = workbook.addWorksheet(documentName);

    const base64Logo = await imageToBase64(logo) // Path to the image

    const imageId = workbook.addImage({
        base64: base64Logo,
        extension: 'png',
    });

    Projects({worksheet: worksheetTimesheet, listYear, projects, translate, logo: imageId})

    workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], {type: 'application/octet-stream'});
        FileSaver.saveAs(blob, `${documentName}.xlsx`);
    });
}
