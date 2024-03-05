import React from 'react'
import {IExpense, ITimesheet} from "../../../models";
import {MonthNumber} from "../../../constants/MonthNumber";
import ExcelJS from "exceljs";
import FileSaver from "file-saver";

interface ICostsExportTableProps {
    chosenTimesheet: ITimesheet
    expenses: IExpense[]
    translate: any
}

export const CostsExcel = async ({chosenTimesheet, expenses, translate}: ICostsExportTableProps) => {

    const documentName = `${chosenTimesheet?.date?.split('/').reverse().join('')}_Costs_${chosenTimesheet?.user?.first_name}_${chosenTimesheet?.user?.last_name}`
    const documentAuthor = `${chosenTimesheet?.user?.first_name} ${chosenTimesheet?.user?.last_name}`
    const approvalDate = chosenTimesheet?.status === "approve" ? chosenTimesheet?.updated_at : ''

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(documentName);


    worksheet.columns = [
        {header: '', key: 'col1', width: 3.33},
        {header: '', key: 'col2', width: 10},
        {header: '', key: 'col3', width: 13.33},
        {header: '', key: 'col4', width: 22.50},
        {header: '', key: 'col5', width: 54.83},
        {header: '', key: 'col6', width: 22.67},
    ];


    worksheet.addRow({})
    worksheet.getRow(1).height = 25;

    const styleForHeader: Partial<ExcelJS.Style> = {
        font: {bold: true, size: 24},
        alignment: {vertical: 'middle', horizontal: 'center'}
    };

    worksheet.mergeCells('A2:F2');
    worksheet.getCell('A2').value = "Timesheet (Costs Report)";
    worksheet.getCell('A2').style = styleForHeader;

    worksheet.addRow({})

    worksheet.mergeCells('A4:C4');
    worksheet.getCell('A4').value = {
        richText: [
            {text: 'Name: ', font: {bold: true, size: 16}},
            {text: String(documentAuthor), font: {bold: false, size: 16}}
        ]
    };

    const date = `${translate(MonthNumber()[+(chosenTimesheet?.date[3] + chosenTimesheet?.date[4])]?.translate_code)}, 20${chosenTimesheet?.date && chosenTimesheet?.date[6]}${chosenTimesheet?.date && chosenTimesheet?.date[7]}`
    worksheet.mergeCells('E4:F4');
    worksheet.getCell('E4').value = {
        richText: [
            {text: date, font: {bold: true, size: 16}},
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
        col6: 'Cost (UAH)',
    }).eachCell((cell, colNumber) => {
        cell.style = styleForTableHeader;
    });
    worksheet.getRow(6).height = 18;

    const styleForTableBody: Partial<ExcelJS.Style> = {
        font: {size: 10},
        alignment: {vertical: 'middle', horizontal: 'center'},
        border: {
            top: {style: 'dotted', color: {argb: '000000'}},
            left: {style: 'dotted', color: {argb: '000000'}},
            bottom: {style: 'dotted', color: {argb: '000000'}},
            right: {style: 'dotted', color: {argb: '000000'}},
        }
    }

    expenses.slice().reverse().map((item: any, index: number) => {
        return worksheet.addRow({
            col1: index + 1,
            col2: item.date,
            col3: item.project.name,
            col4: item.project.description,
            col5: item.description,
            col6: item.sum.toFixed(2),
        }).eachCell((cell, colNumber) => {
            cell.style = styleForTableBody;
        });
    })


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

    worksheet.mergeCells(`E${rowNumberForTotal}:F${rowNumberForTotal}`);
    worksheet.getCell(`E${rowNumberForTotal}`).value = `Total: ${total.toFixed(2)} UAH`;
    worksheet.getCell(`E${rowNumberForTotal}`).style = styleForTotal;

    if (!!approvalDate) {
        worksheet.addRow({})

        const rowNumberForApproval = taskLength + 10;
        worksheet.mergeCells(`A${rowNumberForApproval}:D${rowNumberForApproval}`);
        worksheet.getCell(`A${rowNumberForApproval}`).value = {
            richText: [
                {text: 'Approval: ', font: {bold: true, size: 16}},
                {text: String(documentAuthor), font: {size: 16}}
            ]
        };
        const rowNumberForApprovalDate = taskLength + 11;
        worksheet.mergeCells(`A${rowNumberForApprovalDate}:D${rowNumberForApprovalDate}`);
        worksheet.getCell(`A${rowNumberForApprovalDate}`).value = {
            richText: [
                {text: 'Date: ', font: {bold: true, size: 16}},
                {text: String(approvalDate), font: {size: 16}}
            ]
        };
    }

    workbook.xlsx.writeBuffer().then(buffer => {
        const blob = new Blob([buffer], {type: 'application/octet-stream'});
        FileSaver.saveAs(blob, `${documentName}.xlsx`);
    });


}
