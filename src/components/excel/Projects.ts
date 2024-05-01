import React, {useEffect} from 'react'
import ExcelJS from "exceljs";
import {MonthNumber} from "../../constants/MonthNumber";
import {IEmployee, IProject, ITimesheet} from "../../models";

interface IProjectsProps {
    projects: IProject[]
    translate: any
    worksheet: ExcelJS.Worksheet
    logo: number
    listYear: any
}

export const Projects = ({worksheet, translate, listYear, projects, logo}: IProjectsProps) => {

    projects = projects?.slice()?.sort((a, b) => +a.archive - +b.archive)

    worksheet.columns = [
        {header: '', key: 'col0', width: 8.00},
        {header: '', key: 'col1', width: 5.00},
        {header: '', key: 'col2', width: 12.33},
        {header: '', key: 'col3', width: 38.33},
    ];


    worksheet.addRow({})
    worksheet.getRow(1).height = 25;

    const styleForHeader: Partial<ExcelJS.Style> = {
        font: {bold: true, size: 22},
        alignment: {vertical: 'middle', horizontal: 'center'}
    };

    worksheet.mergeCells('B2:D2');
    worksheet.getCell('B2').value = "Projects";
    worksheet.getCell('B2').style = styleForHeader;

    worksheet.addRow({})

    const date = listYear
    worksheet.mergeCells('C4:D4');
    worksheet.getCell('C4').value = date;
    worksheet.getCell('C4').style = {font: {bold: true, size: 14}};
    worksheet.getCell('C4').numFmt = "0000"
    worksheet.getCell('C4').alignment = {
        horizontal: 'right'
    };

    worksheet.addRow({})

    const styleForTableHeader: Partial<ExcelJS.Style> = {
        font: {bold: true, size: 11, color: {argb: 'ffffff'}},
        alignment: {vertical: 'middle', horizontal: 'center'},
        fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: 'EF3129'}
        },
        border: {
            top: {style: 'thin', color: {argb: '000000'}},
            left: {style: 'thin', color: {argb: '000000'}},
            bottom: {style: 'thin', color: {argb: '000000'}},
            right: {style: 'thin', color: {argb: '000000'}}
        }
    };

    worksheet.addRow({
        col1: 'No',
        col2: 'Number',
        col3: 'Project description',
    }).eachCell((cell, colNumber) => {
        cell.style = styleForTableHeader;
    });

    worksheet.getRow(6).height = 18;

    const styleForTableBody: Partial<ExcelJS.Style> = {
        font: {size: 10},
        alignment: {vertical: 'middle', horizontal: 'left', wrapText: true},
        border: {
            top: {style: 'hair', color: {argb: '000000'}},
            left: {style: 'hair', color: {argb: '000000'}},
            bottom: {style: 'hair', color: {argb: '000000'}},
            right: {style: 'hair', color: {argb: '000000'}},
        }
    }
    const styleForTableBodyRetire: Partial<ExcelJS.Style> = {
        font: {size: 10, color: {argb: 'cccccc'}},
        alignment: {vertical: 'middle', horizontal: 'left', wrapText: true},
        border: {
            top: {style: 'hair', color: {argb: '000000'}},
            left: {style: 'hair', color: {argb: '000000'}},
            bottom: {style: 'hair', color: {argb: '000000'}},
            right: {style: 'hair', color: {argb: '000000'}},
        }
    }

    projects?.map((item: IProject, index: number) => {
        return worksheet.addRow({
            col1: index + 1,
            col2: item.name,
            col3: item.description,
        }).eachCell((cell, colNumber) => {
            cell.style = item.archive ? styleForTableBodyRetire : styleForTableBody;

            if (colNumber === 2 || colNumber === 3) {
                cell.style = item.archive ?
                    {
                        ...styleForTableBody,
                        alignment: {vertical: 'middle', horizontal: 'center'},
                        font: {size: 10, color: {argb: 'cccccc'}},
                    }
                    :
                    {
                        ...styleForTableBody,
                        alignment: {vertical: 'middle', horizontal: 'center'},
                    }
            }
        });
    })


    worksheet.addImage(logo, {
        // @ts-ignore
        tl: {col: 4.0, row: 0.5},
        // @ts-ignore
        br: {col: 4.5, row: 1},
    });

}
