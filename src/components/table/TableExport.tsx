import jsPDF from 'jspdf';
import 'jspdf-autotable';
import React, {useEffect, useState} from 'react'
import {useClickOutside} from "../../hooks/ClickOutside";
import {Translate} from "../translate/Translate";
import html2pdf from 'html2pdf.js';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';



interface ITableExportProps {
    title?: string
}

export const TableExport: React.FC<ITableExportProps> = ({title}) => {

    const tableToExcel = function() {
        const uri = 'data:application/vnd.ms-excel;base64,';
        const template = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
        <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
    </head>
    <body>
        <table>{table}</table>
    </body>
    </html>`;

        // @ts-ignore
        const base64 = function(s) {
            return window.btoa(unescape(encodeURIComponent(s)));
        };

        // @ts-ignore
        const format = function(s, c) {
            // @ts-ignore
            return s.replace(/{(\w+)}/g, function(m, p) {
                return c[p];
            });
        };

        // @ts-ignore
        return function(table, filename = 'excel-export') {
            if (!table.nodeType) table = document.getElementById(table);

            const ctx = {
                worksheet: filename,
                table: table.innerHTML
            };

            const blob = new Blob([format(template, ctx)], {
                type: 'application/vnd.ms-excel'
            });

            // @ts-ignore
            if (navigator.msSaveBlob) {
                // @ts-ignore
                navigator.msSaveBlob(blob, filename + '.xls');
            } else {
                const link = document.createElement('a');
                if (link.download !== undefined) {
                    const url = URL.createObjectURL(blob);
                    link.setAttribute('href', url);
                    link.setAttribute('download', filename + '.xls');
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        };
    }();


    const convertToPDF = () => {
        const element = document.getElementById('my-table');

        const opt = {
            margin: 0.5,
            filename: 'timesheet.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 6 },
            jsPDF: { unit: 'in', format: 'letter', } // Установка альбомной ориентации
        };

        html2pdf().from(element).set(opt).save();
    };



    const [isExportSelectOpen, setIsExportSelectOpen] = useState(false)
    const {rootEl} = useClickOutside(setIsExportSelectOpen)

    return (
        <div ref={rootEl} className={isExportSelectOpen ? "section-table__export drop-down is-right-default is-active" : "section-table__export drop-down is-right-default"}>
            <button onClick={_ => setIsExportSelectOpen(prev => !prev)} className="section-table__export--target drop-down__target" type="button">
                {title === 'export all' ? <Translate>summary_page.main.export_all</Translate> : <Translate>employees_admin.table.export</Translate>}
                <svg width="16" height="17" viewBox="0 0 16 17">
                    <use xlinkHref="#download"></use>
                </svg>
            </button>
            <div className="section-table__export--block drop-down__block">
                <ul className="drop-down__list">
                    <li>
                        <a onClick={e => tableToExcel('my-table', "timesheet")}>
                            <Translate>export_as</Translate> .xlsx
                        </a>
                    </li>
                    <li>
                        {/*<a onClick={e => exportToPdf()}>*/}
                        <a onClick={e => convertToPDF()}>
                            <Translate>export_as</Translate> .pdf
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
