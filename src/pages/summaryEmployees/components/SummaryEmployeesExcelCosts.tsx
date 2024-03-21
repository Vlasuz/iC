import ExcelJS from "exceljs";
import {MonthNumber} from "../../../constants/MonthNumber";
import {IProject, ITimesheet} from "../../../models";

interface IProps {
    worksheet: ExcelJS.Worksheet
    chosenTimesheet: ITimesheet
    projects: IProject[]
    users: any
    translate: any
    logo: any
}

export const SummaryEmployeesExcelCosts = ({worksheet, projects, chosenTimesheet, translate, users, logo}: IProps) => {

    let totalHours = 0
    // Создание основных колонок
    worksheet.columns = [
        {header: '', key: 'colEmpty', width: 8.33},
        {header: '', key: 'colNo', width: 7.00},
        {header: '', key: 'colUsers', width: 13.50},
    ];

    const projectColumns = projects.map((project, index) => ({
        header: '', key: `col${index + 1}`, width: 9.33
    }));

    const totalColumn = {header: '', key: 'colTotal', width: 9.67};

    worksheet.columns = worksheet.columns.concat(projectColumns, totalColumn);
    // Создание основных колонок


    worksheet.addRow({})
    worksheet.getRow(1).height = 25;

    const styleForHeader: Partial<ExcelJS.Style> = {
        font: {bold: true, size: 22},
        alignment: {vertical: 'middle', horizontal: 'left'}
    };

    worksheet.mergeCells('B2:N2');
    worksheet.getCell('B2').value = "Project Controling (Costs)";
    worksheet.getCell('B2').style = styleForHeader;

    worksheet.addRow({})

    const date = `${translate(MonthNumber()[+(chosenTimesheet?.date[3] + chosenTimesheet?.date[4])]?.translate_code)}, 20${chosenTimesheet?.date && chosenTimesheet?.date[6]}${chosenTimesheet?.date && chosenTimesheet?.date[7]}`
    worksheet.mergeCells('B4:N4');
    worksheet.getCell('B4').value = {
        richText: [
            {text: date, font: {bold: true, size: 14}},
        ]
    };

    worksheet.addRow({})

    const styleForTableHeader: Partial<ExcelJS.Style> = {
        font: {bold: true, size: 10, color: {argb: 'ffffff'}},
        alignment: {vertical: 'top', horizontal: 'center', wrapText: true},
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


    // Создание строки шапки 1
    const rowHeaderOne: any = {
        colNo: 'iC Ukraine Internal',
    }

    projects.map((project, index) => {
        rowHeaderOne[`col${index + 1}`] = project.name
    })

    rowHeaderOne[`colTotal`] = "Costs"

    worksheet.addRow(rowHeaderOne).eachCell((cell, colNumber) => {
        cell.style = styleForTableHeader;

        if (colNumber === 2 || colNumber === 3 || colNumber === projects.length + 4) {
            cell.style = {
                font: {bold: true, size: 10, color: {argb: 'ffffff'}},
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
            }
        }
    });

    worksheet.mergeCells(`B6`, `C6`);

    // Создание строки шапки 1



    // Создание строки шапки 2
    const rowHeader: any = {
        colNo: 'No',
        colUsers: 'Users',
    }

    projects.map((project, index) => {
        rowHeader[`col${index + 1}`] = project.description
    })

    rowHeader[`colTotal`] = "Total"

    worksheet.addRow(rowHeader).eachCell((cell, colNumber) => {
        cell.style = styleForTableHeader;

        if (colNumber === 2 || colNumber === 3 || colNumber === projects.length + 4) {
            cell.style = {
                font: {bold: true, size: 10, color: {argb: 'ffffff'}},
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
            }
        }
    });

    // Создание строки шапки 2



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

    users.map((user: any, index: number) => {
        const rowUser: any = {
            colNo: 'No',
            colUsers: 'Users',
        }

        let allAmount = 0

        rowUser[`colNo`] = index + 1
        rowUser[`colUsers`] = `${user?.user?.user?.first_name} ${user?.user?.user?.last_name}`

        projects.forEach((project, index) => {

            if(user.timesheet.expenses.some((proj: any) => proj?.project?.id === project?.id)) {
                rowUser[`col${index + 1}`] = user.timesheet.expenses.filter((proj: any) => proj?.project?.id === project?.id)[0]?.sum

                allAmount += user.timesheet.expenses.filter((proj: any) => proj?.project?.id === project?.id)[0]?.sum
                totalHours += user.timesheet.expenses.filter((proj: any) => proj?.project?.id === project?.id)[0]?.sum
            } else {
                rowUser[`col${index + 1}`] = 0
            }

        })

        rowUser[`colTotal`] = allAmount

        worksheet.addRow(rowUser).eachCell((cell, colNumber) => {
            cell.style = styleForTableBody;

            if(cell?.value && String(cell?.value) !== "0") {
                cell.style = {
                    font: {size: 10, bold: true},
                    alignment: {vertical: 'middle', horizontal: 'center'},
                    border: {
                        top: {style: 'hair', color: {argb: '000000'}},
                        left: {style: 'hair', color: {argb: '000000'}},
                        bottom: {style: 'hair', color: {argb: '000000'}},
                        right: {style: 'hair', color: {argb: '000000'}},
                    }
                }
            }

            if (colNumber === projects.length + 4) {
                cell.style = {
                    alignment: {vertical: 'middle', horizontal: 'center'},
                    fill: {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {argb: 'EBEBEB'}
                    },
                    font: {size: 10.0},
                    border: {
                        top: {style: 'hair', color: {argb: '000000'}},
                        left: {style: 'hair', color: {argb: '000000'}},
                        bottom: {style: 'hair', color: {argb: '000000'}},
                        right: {style: 'hair', color: {argb: '000000'}},
                    }
                }
                cell.numFmt = '#,##0.00';
            } else if (colNumber === 3) {
                cell.style = {
                    alignment: {vertical: 'middle', horizontal: 'left', wrapText: true},
                    fill: {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {argb: 'EBEBEB'}
                    },
                    font: {size: 10.0},
                    border: {
                        top: {style: 'hair', color: {argb: '000000'}},
                        left: {style: 'hair', color: {argb: '000000'}},
                        bottom: {style: 'hair', color: {argb: '000000'}},
                        right: {style: 'hair', color: {argb: '000000'}},
                    }
                }
            } else if (colNumber === 2) {
                cell.style = {
                    alignment: {vertical: 'middle', horizontal: 'center', wrapText: true},
                    fill: {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {argb: 'EBEBEB'}
                    },
                    font: {size: 10.0},
                    border: {
                        top: {style: 'hair', color: {argb: '000000'}},
                        left: {style: 'hair', color: {argb: '000000'}},
                        bottom: {style: 'hair', color: {argb: '000000'}},
                        right: {style: 'hair', color: {argb: '000000'}},
                    }
                }
            } else if (colNumber !== 2 && colNumber !== 3) {
                cell.numFmt = '#,##0.00';
            }
        });

        worksheet.getRow(8 + index).height = 37;

    })



    const styleForTableFooter: Partial<ExcelJS.Style> = {
        font: {bold: true, size: 10, color: {argb: '000000'}},
        alignment: {vertical: 'top', horizontal: 'center', wrapText: true},
        fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: 'C7C7C7'}
        },
        border: {
            top: {style: 'thin', color: {argb: '000000'}},
            left: {style: 'thin', color: {argb: '000000'}},
            bottom: {style: 'thin', color: {argb: '000000'}},
            right: {style: 'thin', color: {argb: '000000'}}
        }
    }

    const rowFooter: any = {
        colNo: 'Total expense / month',
        // colUsers: 'Users',
    }

    projects.map((project, index) => {
        let sum = 0;

        users.forEach((user: any) => {
            if(user.timesheet.expenses.some((proj: any) => proj.project.id === project.id)) {
                sum += user.timesheet.expenses.filter((proj: any) => proj.project.id === project.id)[0]?.sum
            }
        })

        rowFooter[`col${index + 1}`] = sum
    })

    rowFooter[`colTotal`] = totalHours

    worksheet.addRow(rowFooter).eachCell((cell, colNumber) => {
        cell.style = styleForTableFooter;


        if(colNumber === projects.length + 4) {
            cell.numFmt = '#,##0.00';
            cell.style = {
                font: {bold: true, size: 10, color: {argb: 'EF3129'}},
                alignment: {vertical: 'top', horizontal: 'center', wrapText: true},
                fill: {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: {argb: 'C7C7C7'}
                },
                border: {
                    top: {style: 'thin', color: {argb: '000000'}},
                    left: {style: 'thin', color: {argb: '000000'}},
                    bottom: {style: 'thin', color: {argb: '000000'}},
                    right: {style: 'thin', color: {argb: '000000'}}
                }
            }
        } else if (colNumber !== 2 && colNumber !== 3) {
            cell.numFmt = '#,##0.00';
        }
    });

    worksheet.mergeCells(`B${8 + users.length}`, `C${8 + users.length}`);

    worksheet.addImage(logo, {
        // @ts-ignore
        tl: { col: projects.length + 3.9, row: 0.9 },
        // @ts-ignore
        br: { col: projects.length + 4, row: 2.3 }
    });

}