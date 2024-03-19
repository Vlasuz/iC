import React, {useEffect} from 'react'
import ExcelJS from "exceljs";
import {MonthNumber} from "../../constants/MonthNumber";
import {IExpense, ITimesheet} from "../../models";

interface ICostProps {
    chosenTimesheet: ITimesheet
    expenses: IExpense[]
    translate: any
    worksheet: ExcelJS.Worksheet
    logo: number
}

export const Costs = ({worksheet, translate, chosenTimesheet, expenses, logo}: ICostProps) => {

    const documentAuthor = `${chosenTimesheet?.user?.first_name} ${chosenTimesheet?.user?.last_name}`
    const approvalDate = chosenTimesheet?.status === "approve" ? chosenTimesheet?.updated_at : ''

    worksheet.columns = [
        {header: '', key: 'col0', width: 3.33},
        {header: '', key: 'col1', width: 3.33},
        {header: '', key: 'col2', width: 10},
        {header: '', key: 'col3', width: 13.33},
        {header: '', key: 'col4', width: 22.50},
        {header: '', key: 'col5', width: 54.83},
        {header: '', key: 'col6', width: 11.67},
        {header: '', key: 'col7', width: 6.17},
    ];


    worksheet.addRow({})
    worksheet.getRow(1).height = 25;

    const styleForHeader: Partial<ExcelJS.Style> = {
        font: {bold: true, size: 22},
        alignment: {vertical: 'middle', horizontal: 'center'}
    };

    worksheet.mergeCells('B2:G2');
    worksheet.getCell('B2').value = "Timesheet (Costs Report)";
    worksheet.getCell('B2').style = styleForHeader;

    worksheet.addRow({})

    worksheet.mergeCells('B4:D4');
    worksheet.getCell('B4').value = {
        richText: [
            {text: 'Name: ', font: {bold: true, size: 14}},
            {text: String(documentAuthor), font: {bold: false, size: 14}}
        ]
    };

    const date = `${translate(MonthNumber()[+(chosenTimesheet?.date[3] + chosenTimesheet?.date[4])]?.translate_code)}, 20${chosenTimesheet?.date && chosenTimesheet?.date[6]}${chosenTimesheet?.date && chosenTimesheet?.date[7]}`
    worksheet.mergeCells('E4:H4');
    worksheet.getCell('E4').value = {
        richText: [
            {text: date, font: {bold: true, size: 14}},
        ]
    };
    worksheet.getCell('E4').alignment = {
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
        col2: 'Date',
        col3: 'Project Num',
        col4: 'Project description',
        col5: 'Description of the expense',
        col6: 'Costs (UAH)',
    }).eachCell((cell, colNumber) => {
        cell.style = styleForTableHeader;
    });

    worksheet.mergeCells(`G6:H6`);

    worksheet.getRow(6).height = 18;

    const styleForTableBody: Partial<ExcelJS.Style> = {
        font: {size: 10},
        alignment: {vertical: 'middle', horizontal: 'center'},
        border: {
            top: {style: 'hair', color: {argb: '000000'}},
            left: {style: 'hair', color: {argb: '000000'}},
            bottom: {style: 'hair', color: {argb: '000000'}},
            right: {style: 'hair', color: {argb: '000000'}},
        }
    }

    expenses.slice().reverse().map((item: any, index: number) => {
        return worksheet.addRow({
            col1: index + 1,
            col2: item.date,
            col3: item.project.name,
            col4: item.project.description,
            col5: item.description,
            col6: item.sum,
        }).eachCell((cell, colNumber) => {
            cell.style = styleForTableBody;

            if (colNumber === 7) {
                cell.style = {
                    font: {size: 10},
                    fill: {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {argb: 'ffffff'}
                    },
                    alignment: {vertical: 'middle', horizontal: 'center'},
                    border: {
                        top: {style: 'hair', color: {argb: '000000'}},
                        left: {style: 'hair', color: {argb: '000000'}},
                        bottom: {style: 'hair', color: {argb: '000000'}},
                        right: {style: 'hair', color: {argb: '000000'}},
                    }
                }
                cell.numFmt = '0.00';
            }
            if (colNumber === 3) {
                cell.style = {
                    font: {size: 10},
                    fill: {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {argb: 'ffffff'}
                    },
                    alignment: {vertical: 'middle', horizontal: 'center'},
                    border: {
                        top: {style: 'hair', color: {argb: '000000'}},
                        left: {style: 'hair', color: {argb: '000000'}},
                        bottom: {style: 'hair', color: {argb: '000000'}},
                        right: {style: 'hair', color: {argb: '000000'}},
                    }
                }
                cell.numFmt = 'dd/mm/yy';
            }
        });
    })

    for(let a = 0; a < expenses.length; a++) {
        worksheet.mergeCells(`G${a + 7}:H${a + 7}`);
    }

    worksheet.addRow({})

    const taskLength = expenses.length
    const rowNumberForTotal = taskLength + 8;

    const styleForTotal: Partial<ExcelJS.Style> = {
        font: {bold: true, size: 16, color: {argb: 'EF3129'}},
        alignment: {vertical: 'middle', horizontal: 'right'},
    };

    const total = expenses.reduce((sum: number, current: any) => {
        return sum + current.sum
    }, 0)

    // worksheet.mergeCells(`E${rowNumberForTotal}:G${rowNumberForTotal}`);
    // worksheet.getCell(`E${rowNumberForTotal}`).value = `Total: ${total.toFixed(2)} UAH`;
    // worksheet.getCell(`E${rowNumberForTotal}`).style = styleForTotal;

    worksheet.getCell(`F${rowNumberForTotal}`).value = `Total:`;
    worksheet.getCell(`F${rowNumberForTotal}`).style = styleForTotal;
    worksheet.getCell(`G${rowNumberForTotal}`).value = +total;
    worksheet.getCell(`G${rowNumberForTotal}`).style = styleForTotal;
    worksheet.getCell(`G${rowNumberForTotal}`).numFmt = '0.00';
    worksheet.getCell(`H${rowNumberForTotal}`).value = ` UAH`;
    worksheet.getCell(`H${rowNumberForTotal}`).style = styleForTotal;

    if (!!approvalDate) {
        worksheet.addRow({})

        const rowNumberForApproval = taskLength + 10;
        worksheet.mergeCells(`A${rowNumberForApproval}:D${rowNumberForApproval}`);
        worksheet.getCell(`A${rowNumberForApproval}`).value = {
            richText: [
                {text: 'Approval: ', font: {bold: true, size: 14}},
                {text: String(documentAuthor), font: {size: 14}}
            ]
        };
        const rowNumberForApprovalDate = taskLength + 11;
        worksheet.mergeCells(`A${rowNumberForApprovalDate}:D${rowNumberForApprovalDate}`);
        worksheet.getCell(`A${rowNumberForApprovalDate}`).value = {
            richText: [
                {text: 'Date: ', font: {bold: true, size: 14}},
                {text: String(approvalDate), font: {size: 14}}
            ]
        };
    }


    worksheet.addImage(logo, {
        // @ts-ignore
        tl: { col: 7.5, row: 0 },
        // @ts-ignore
        br: { col: 8, row: 1 },
    });

}
