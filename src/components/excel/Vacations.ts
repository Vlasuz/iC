import ExcelJS from "exceljs";
import {IVacation} from "../../models";
import React from "react";

interface IVacationsProps {
    vacations: IVacation[]
    translate: any
    worksheet: ExcelJS.Worksheet
    logo: number
    listYear: any
}

export const Vacations = ({worksheet, translate, listYear, vacations, logo}: IVacationsProps) => {

    worksheet.columns = [
        {header: '', key: 'col0', width: 8.00},
        {header: '', key: 'col1', width: 4.00},
        {header: '', key: 'col2', width: 18.50},
        {header: '', key: 'col3', width: 7.0},
        {header: '', key: 'col4', width: 7.0},
        {header: '', key: 'col5', width: 7.0},
        {header: '', key: 'col6', width: 7.0},
        {header: '', key: 'col7_1', width: 7.0},
        {header: '', key: 'col7_2', width: 7.0},
        {header: '', key: 'col7_3', width: 7.0},
        {header: '', key: 'col7_4', width: 7.0},
        {header: '', key: 'col7_5', width: 7.0},
        {header: '', key: 'col7_6', width: 7.0},
        {header: '', key: 'col7_7', width: 7.0},
        {header: '', key: 'col7_8', width: 7.0},
        {header: '', key: 'col7_9', width: 7.0},
        {header: '', key: 'col7_10', width: 7.0},
        {header: '', key: 'col7_11', width: 7.0},
        {header: '', key: 'col7_12', width: 7.0},
        {header: '', key: 'col8', width: 7.0},
    ];


    worksheet.addRow({})
    worksheet.getRow(1).height = 25;

    const styleForHeader: Partial<ExcelJS.Style> = {
        font: {bold: true, size: 22},
        alignment: {vertical: 'middle', horizontal: 'center'}
    };

    worksheet.mergeCells('B2:T2');
    worksheet.getCell('B2').value = "Vacations";
    worksheet.getCell('B2').style = styleForHeader;

    worksheet.addRow({})

    const date = listYear
    worksheet.mergeCells('Q4:T4');
    worksheet.getCell('Q4').value = date;
    worksheet.getCell('Q4').style = {font: {bold: true, size: 14}};
    worksheet.getCell('Q4').numFmt = "0000"
    worksheet.getCell('Q4').alignment = {
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
        col3: 'Н-ні',
        col4: "Дод-ві",
        col5: "Д/р",
        col6: "Усього",
        col7_1: "1",
        col7_2: "2",
        col7_3: "3",
        col7_4: "4",
        col7_5: "5",
        col7_6: "6",
        col7_7: "7",
        col7_8: "8",
        col7_9: "9",
        col7_10: "10",
        col7_11: "11",
        col7_12: "12",
        col8: "Н-ні",
    }).eachCell((cell, colNumber) => {
        cell.style = styleForTableHeader;
    });

    worksheet.getRow(6).height = 18;

    const styleForTableBody: Partial<ExcelJS.Style> = {
        font: {size: 10},
        alignment: {vertical: 'middle', horizontal: 'center', wrapText: true},
        border: {
            top: {style: 'hair', color: {argb: '000000'}},
            left: {style: 'hair', color: {argb: '000000'}},
            bottom: {style: 'hair', color: {argb: '000000'}},
            right: {style: 'hair', color: {argb: '000000'}},
        }
    }

    vacations?.map((item: IVacation, index: number) => {
        let amountDays = 0

        const rowObject: any = {
            col1: index + 1,
            col2: `${item.user.first_name} ${item.user.last_name}`,
            col3: item.remain,
            col4: item.extra,
            col5: item.user.holidays,
            col6: +item.remain + +item.extra + +item.user.holidays,
        }

        item.months.map((item2, index2) => {
            amountDays += item2.days
            rowObject[`col7_${index2 + 1}`] = item2.days
        })

        rowObject.col8 = +item.remain + +item.extra + +item.user.holidays - amountDays

        worksheet.addRow(rowObject).eachCell((cell, colNumber) => {
            cell.style = styleForTableBody;

            if (cell?.value && String(cell?.value) !== "0") {
                cell.style = {
                    ...styleForTableBody,
                    font: {size: 10, bold: true},
                }
            }

            if (colNumber === 2) {
                cell.style = {
                    ...styleForTableBody,
                    fill: {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {argb: 'EFEFEF'}
                    },
                }
                cell.numFmt = "0"
            } else if (colNumber === 3) {
                cell.style = {
                    ...styleForTableBody,
                    alignment: {vertical: 'middle', horizontal: 'left', wrapText: true},
                    fill: {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {argb: 'EFEFEF'}
                    },
                }
            } else if (colNumber === 7 || colNumber === 20) {
                cell.style = {
                    ...styleForTableBody,
                    fill: {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {argb: 'E6CBCB'}
                    },
                }
            }

            if (colNumber !== 2) {
                cell.numFmt = "#0.0"
            }
        });

        worksheet.getCell(`G${index + 7}`).value = { formula: `SUM(D${index + 7}:F${index + 7})` };
        worksheet.getCell(`T${index + 7}`).value = { formula: `SUM(G${index + 7}:S${index + 7})` };

        return worksheet.getRow(index + 7).height = 20;
    })


    worksheet.addImage(logo, {
        // @ts-ignore
        tl: {col: 19.9, row: 0.2},
        // @ts-ignore
        br: {col: 20, row: 1.3},
    });

}
