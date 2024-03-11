import React, {useEffect} from 'react'
import ExcelJS from "exceljs";
import {MonthNumber} from "../../constants/MonthNumber";
import {ITask, ITimesheet} from "../../models";

interface ITimesheetProps {
    worksheet: ExcelJS.Worksheet
    chosenTimesheet: ITimesheet
    tasks: ITask[]
    translate: any
    logo: number
}

export const Timesheet = ({worksheet, chosenTimesheet, tasks, translate, logo}: ITimesheetProps) => {

    const documentAuthor = `${chosenTimesheet?.user?.first_name} ${chosenTimesheet?.user?.last_name}`
    const approvalDate = chosenTimesheet?.status === "approve" ? chosenTimesheet?.updated_at : ''

    worksheet.columns = [
        {header: '', key: 'col0', width: 3.33},
        {header: '', key: 'col1', width: 3.33},
        {header: '', key: 'col2', width: 10},
        {header: '', key: 'col3', width: 13.33},
        {header: '', key: 'col4', width: 22.50},
        {header: '', key: 'col5', width: 47.67},
        {header: '', key: 'col6', width: 12.83},
        {header: '', key: 'col7', width: 6.0},
        {header: '', key: 'col8', width: 6.50},
    ];


    worksheet.addRow({})
    worksheet.getRow(1).height = 25;

    const styleForHeader: Partial<ExcelJS.Style> = {
        font: {bold: true, size: 24},
        alignment: {vertical: 'middle', horizontal: 'center'}
    };



    worksheet.mergeCells('B2:I2');
    worksheet.getCell('B2').value = "Timesheet (Presence Report)";
    worksheet.getCell('B2').style = styleForHeader;

    worksheet.addRow({})

    worksheet.mergeCells('B4:D4');
    worksheet.getCell('B4').value = {
        richText: [
            {text: 'Name: ', font: {bold: true, size: 16}},
            {text: String(documentAuthor), font: {bold: false, size: 16}}
        ]
    };

    const date = `${translate(MonthNumber()[+(chosenTimesheet?.date[3] + chosenTimesheet?.date[4])]?.translate_code)}, 20${chosenTimesheet?.date && chosenTimesheet?.date[6]}${chosenTimesheet?.date && chosenTimesheet?.date[7]}`
    worksheet.mergeCells('F4:I4');
    worksheet.getCell('F4').value = {
        richText: [
            {text: date, font: {bold: true, size: 16}},
        ]
    };
    worksheet.getCell('F4').alignment = {
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
        col5: 'Task',
        col6: 'Time',
        col7: 'Hours',
        col8: 'Total',
    }).eachCell((cell, colNumber) => {
        cell.style = styleForTableHeader;
    });
    worksheet.getRow(6).height = 18;

    const styleForTableBody: Partial<ExcelJS.Style> = {
        font: {size: 10},
        border: {
            top: {style: 'hair', color: {argb: '000000'}},
            left: {style: 'hair', color: {argb: '000000'}},
            bottom: {style: 'hair', color: {argb: '000000'}},
            right: {style: 'hair', color: {argb: '000000'}},
        }
    }

    let startRow = 7;
    let amountToMerge = 7;
    let amountHours = 0
    const result: any = [];

    tasks.slice().reverse().map((item: any, index: number) => {
        const plusNum = index

        if (!result.some((item2: any) => item2.date === item.date)) {
            result.push(item);
            amountHours = 0
            if(result.some((item2: any) => item2.date === item.date)) {
                const endLine = amountToMerge - 1 + tasks.filter((item2: any) => item2.date === item.date).length
                worksheet.mergeCells(`C${amountToMerge}:C${endLine}`);
                worksheet.mergeCells(`I${amountToMerge}:I${endLine}`);
                tasks.filter((item2: any) => {
                    if(item2.date === item.date) {
                        amountHours += item2.hours
                    }
                })
            }
        }

        amountToMerge += 1


        worksheet.getCell(`B${startRow + plusNum}`).value = index + 1;
        worksheet.getCell(`B${startRow + plusNum}`).style = {...styleForTableBody, alignment: {vertical: 'middle', horizontal: 'center'},};
        worksheet.getCell(`C${startRow + plusNum}`).value = item.date;
        worksheet.getCell(`C${startRow + plusNum}`).style = {...styleForTableBody, alignment: {vertical: 'middle', horizontal: 'center'},};
        worksheet.getCell(`D${startRow + plusNum}`).value = item.project.name;
        worksheet.getCell(`D${startRow + plusNum}`).style = {...styleForTableBody, alignment: {vertical: 'middle', horizontal: 'center'},};
        worksheet.getCell(`E${startRow + plusNum}`).value = item.project.description;
        worksheet.getCell(`E${startRow + plusNum}`).style = {...styleForTableBody, alignment: {vertical: 'middle', horizontal: 'center'},};
        worksheet.getCell(`F${startRow + plusNum}`).value = item.task;
        worksheet.getCell(`F${startRow + plusNum}`).style = {...styleForTableBody, alignment: {vertical: 'top', horizontal: 'left'},};
        worksheet.getCell(`G${startRow + plusNum}`).value = item.time;
        worksheet.getCell(`G${startRow + plusNum}`).style = {...styleForTableBody, alignment: {vertical: 'middle', horizontal: 'center'},};
        worksheet.getCell(`H${startRow + plusNum}`).value = item.hours;
        worksheet.getCell(`H${startRow + plusNum}`).style = {...styleForTableBody, alignment: {vertical: 'middle', horizontal: 'center'},};
        worksheet.getCell(`I${startRow + plusNum}`).value = amountHours;
        worksheet.getCell(`I${startRow + plusNum}`).style = {...styleForTableBody, alignment: {vertical: 'middle', horizontal: 'center'},};

    })


    worksheet.addRow({})

    const taskLength = tasks.length
    const rowNumberForTotal = taskLength + 8;

    const styleForTotal: Partial<ExcelJS.Style> = {
        font: {bold: true, size: 16, color: {argb: 'EF3129'}},
        alignment: {vertical: 'middle', horizontal: 'right'},
    };

    const total = tasks.reduce((sum: number, current: any) => {
        return sum + current.hours
    }, 0)

    worksheet.mergeCells(`F${rowNumberForTotal}:I${rowNumberForTotal}`);
    worksheet.getCell(`F${rowNumberForTotal}`).value = `Total: ${total} hours`;
    worksheet.getCell(`F${rowNumberForTotal}`).style = styleForTotal;

    if (!!approvalDate) {
        worksheet.addRow({})

        const rowNumberForApproval = taskLength + 10;
        worksheet.mergeCells(`B${rowNumberForApproval}:E${rowNumberForApproval}`);
        worksheet.getCell(`B${rowNumberForApproval}`).value = {
            richText: [
                {text: 'Bpproval: ', font: {bold: true, size: 16}},
                {text: String(documentAuthor), font: {size: 16}}
            ]
        };
        const rowNumberForApprovalDate = taskLength + 11;
        worksheet.mergeCells(`B${rowNumberForApprovalDate}:E${rowNumberForApprovalDate}`);
        worksheet.getCell(`B${rowNumberForApprovalDate}`).value = {
            richText: [
                {text: 'Date: ', font: {bold: true, size: 16}},
                {text: String(approvalDate), font: {size: 16}}
            ]
        };
    }

    worksheet.addImage(logo, {
    // @ts-ignore
        tl: { col: 8, row: 0 },
    // @ts-ignore
        br: { col: 9, row: 1 }
    });

}
