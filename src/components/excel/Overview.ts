import React, {useEffect} from 'react'
import ExcelJS from "exceljs";
import {MonthNumber} from "../../constants/MonthNumber";
import {ITimesheet} from "../../models";

interface IOverviewProps {
    worksheet: ExcelJS.Worksheet
    translate: any
    chosenTimesheet: ITimesheet
    data: any
}

export const Overview = ({worksheet, translate, chosenTimesheet, data}: IOverviewProps) => {

    const documentAuthor = `${chosenTimesheet?.user?.first_name} ${chosenTimesheet?.user?.last_name}`
    const approvalDate = chosenTimesheet?.status === "approve" ? chosenTimesheet?.updated_at : ''


    worksheet.columns = [
        {header: '', key: 'colEmpty', width: 2.33},
        {header: '', key: 'colNo', width: 3.33},
        {header: '', key: 'col1', width: 13.67},
        {header: '', key: 'col2', width: 40.67},
        {header: '', key: 'col3', width: 23.67},
        {header: '', key: 'col4', width: 23.67},
    ];


    worksheet.addRow({})
    worksheet.getRow(1).height = 25;

    const styleForHeader: Partial<ExcelJS.Style> = {
        font: {bold: true, size: 22},
        alignment: {vertical: 'middle', horizontal: 'center'}
    };



    worksheet.mergeCells('B2:F2');
    worksheet.getCell('B2').value = "Timesheet (Overview)";
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
    worksheet.mergeCells('F4:F4');
    worksheet.getCell('F4').value = {
        richText: [
            {text: date, font: {bold: true, size: 14}},
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
        colNo: 'No',
        col1: 'Project Num',
        col2: 'Project description',
        col3: 'Working hours',
        col4: 'Costs (UAH)',
    }).eachCell((cell, colNumber) => {
        cell.style = styleForTableHeader;
    });
    worksheet.getRow(6).height = 18;




    const styleForTableBody: Partial<ExcelJS.Style> = {
        font: {size: 10, color: {argb: '000000'}},
        alignment: {vertical: 'middle', horizontal: 'center'},
        border: {
            top: {style: 'hair', color: {argb: '000000'}},
            left: {style: 'hair', color: {argb: '000000'}},
            bottom: {style: 'hair', color: {argb: '000000'}},
            right: {style: 'hair', color: {argb: '000000'}}
        }
    };

    let allHours = 0
    let allCosts = 0

    data.map((item: any, index: number) => {

        allHours += item?.task?.hours
        allCosts += item?.expense?.sum

        worksheet.addRow({
            colNo: index + 1,
            col1: item?.project?.name,
            col2: item?.project?.description,
            col3: item?.task?.hours,
            col4: item?.expense?.sum,
        }).eachCell((cell, colNumber) => {
            cell.style = styleForTableBody;

            if(colNumber === 5 || colNumber === 6) {
                cell.style = {
                    font: {size: 10, color: {argb: '000000'}},
                    alignment: {vertical: 'middle', horizontal: 'center'},
                    border: {
                        top: {style: 'hair', color: {argb: '000000'}},
                        left: {style: 'hair', color: {argb: '000000'}},
                        bottom: {style: 'hair', color: {argb: '000000'}},
                        right: {style: 'hair', color: {argb: '000000'}}
                    }
                }
                cell.numFmt = '#,##0.00';
            }
        });
    })

    worksheet.addRow({})



    const styleForTableTotal: Partial<ExcelJS.Style> = {
        font: {bold: true, size: 16, color: {argb: 'EF3129'}},
        alignment: {vertical: 'middle', horizontal: 'center'},
    };

    worksheet.addRow({
        col2: "Total: ",
        col3: allHours,
        col4: allCosts,
    }).eachCell((cell, colNumber) => {
        cell.style = styleForTableTotal;

        if(colNumber === 5 || colNumber === 6) {
            cell.numFmt = '#,##0.00';
        } else if(colNumber === 4) {
            cell.style = {
                font: {bold: true, size: 16, color: {argb: 'EF3129'}},
                alignment: {vertical: 'middle', horizontal: 'right'},
            }
        }
    });


    if (!!approvalDate) {
        worksheet.addRow({})

        const rowNumberForApproval = data.length + 10 + 10;
        worksheet.mergeCells(`B${rowNumberForApproval}:E${rowNumberForApproval}`);
        worksheet.getCell(`B${rowNumberForApproval}`).value = {
            richText: [
                {text: 'Approval: ', font: {bold: true, size: 16}},
                {text: String(documentAuthor), font: {size: 16}}
            ]
        };
        const rowNumberForApprovalDate = data.length + 10 + 11;
        worksheet.mergeCells(`B${rowNumberForApprovalDate}:E${rowNumberForApprovalDate}`);
        worksheet.getCell(`B${rowNumberForApprovalDate}`).value = {
            richText: [
                {text: 'Date: ', font: {bold: true, size: 16}},
                {text: String(approvalDate), font: {size: 16}}
            ]
        };
    }

}
