import React, {useEffect} from 'react'
import ExcelJS from "exceljs";
import {MonthNumber} from "../../constants/MonthNumber";
import {IEmployee, ITimesheet} from "../../models";

interface IEmployeesProps {
    employees: IEmployee[]
    translate: any
    worksheet: ExcelJS.Worksheet
    logo: number
    listYear: any
}

export const Employees = ({worksheet, translate, listYear, employees, logo}: IEmployeesProps) => {

    worksheet.columns = [
        {header: '', key: 'col0', width: 8.00},
        {header: '', key: 'col1', width: 5.33},
        {header: '', key: 'col2', width: 13.33},
        {header: '', key: 'col3', width: 18.33},
        {header: '', key: 'col4', width: 10.17},
        {header: '', key: 'col5', width: 22.50},
        {header: '', key: 'col6', width: 8.0},
        {header: '', key: 'col7', width: 16.33},
        {header: '', key: 'col8', width: 10.50},
    ];


    worksheet.addRow({})
    worksheet.getRow(1).height = 25;

    const styleForHeader: Partial<ExcelJS.Style> = {
        font: {bold: true, size: 22},
        alignment: {vertical: 'middle', horizontal: 'center'}
    };

    worksheet.mergeCells('B2:I2');
    worksheet.getCell('B2').value = "Employees";
    worksheet.getCell('B2').style = styleForHeader;

    worksheet.addRow({})

    const date = listYear
    worksheet.mergeCells('G4:I4');
    worksheet.getCell('G4').value = {
        richText: [
            {text: date, font: {bold: true, size: 14}},
        ]
    };
    worksheet.getCell('G4').alignment = {
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
        col2: 'Name',
        col3: 'Position',
        col4: 'Category',
        col5: 'Email',
        col6: 'Projects',
        col7: 'Phone number',
        col8: 'Vacation',
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

    employees?.map((item: IEmployee, index: number) => {
        return worksheet.addRow({
            col1: index + 1,
            col2: `${item.first_name} ${item.last_name}`,
            col3: item.role,
            col4: item.status,
            col5: item.email,
            col6: item.all_projects ? "All projects" : item.projects.length,
            col7: item.phone,
            col8: item.holidays,
        }).eachCell((cell, colNumber) => {
            cell.style = item.archive ? styleForTableBodyRetire : styleForTableBody;

            if (colNumber === 2 || colNumber === 5 || colNumber === 9) {
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
        tl: {col: 8.5, row: 0.5},
        // @ts-ignore
        br: {col: 9, row: 2},
    });

}
