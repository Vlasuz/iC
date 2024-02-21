import jsPDF from 'jspdf';
import 'jspdf-autotable';
import React, {useEffect, useState} from 'react'
import {useClickOutside} from "../../hooks/ClickOutside";
import {Translate} from "../translate/Translate";
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';



interface ITableExportProps {
    title?: string
    onClick?: any
}

export const TableExport: React.FC<ITableExportProps> = ({title, onClick}) => {





    const tableToExcel = function() {
        const uri = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
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
            if (!table.nodeType) table = document.querySelectorAll(table);

            // @ts-ignore
            table.forEach((tbl) => {
                const ctx = {
                    worksheet: filename,
                    table: tbl.innerHTML
                };

                const content = format(template, ctx);
                const blob = new Blob([content], { type: 'application/vnd.ms-excel' });

                // Создаем объект URL для Blob
                const url = window.URL.createObjectURL(blob);

                // Создаем ссылку для скачивания
                const link = document.createElement('a');
                link.setAttribute('href', url);

                // Добавляем заголовок Content-Disposition
                link.setAttribute('download', `${filename}.xls`);
                link.setAttribute('target', '_blank');
                link.style.visibility = 'hidden';

                // Добавляем ссылку в DOM и эмулируем клик для скачивания файла
                document.body.appendChild(link);
                link.click();

                // Удаляем ссылку из DOM и освобождаем ресурсы
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            });
        };
    }();



    const convertToPDF = () => {
        const element = document.querySelectorAll('.table-to-download-excel');

        element.forEach(tbl => {
            const opt = {
                margin: 0.5,
                filename: 'timesheet.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 6 },
                jsPDF: { unit: 'in', format: 'letter', } // Установка альбомной ориентации
            };

            html2pdf().from(tbl).set(opt).save();
        })
    };



    const [isExportSelectOpen, setIsExportSelectOpen] = useState(false)
    const {rootEl} = useClickOutside(setIsExportSelectOpen)

    return (
        <div ref={rootEl} className={isExportSelectOpen ? "section-table__export drop-down is-right-default is-active" : "section-table__export drop-down is-right-default"}>
            <button onClick={_ => {
                setIsExportSelectOpen(prev => !prev)
                onClick && onClick()
            }} className="section-table__export--target drop-down__target" type="button">
                {title === 'export all' ? <Translate>summary_page.main.export_all</Translate> : <Translate>employees_admin.table.export</Translate>}
                <svg width="16" height="17" viewBox="0 0 16 17">
                    <use xlinkHref="#download"></use>
                </svg>
            </button>
            <div className="section-table__export--block drop-down__block">
                <ul className="drop-down__list">
                    <li>
                        <a onClick={e => tableToExcel('.table-to-download-excel', "timesheet")}>
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
