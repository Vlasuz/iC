import React, {useEffect, useState} from 'react'
import {useClickOutside} from "../../../../hooks/ClickOutside";

interface ITimesheetHeaderExportProps {

}

export const TimesheetHeaderExport: React.FC<ITimesheetHeaderExportProps> = () => {

    const tableToExcel = (function() {
        // Базовая строка для создания Excel-файла
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

        // Функция для кодирования строки в base64
        // @ts-ignore
        const base64 = function(s) {
            return window.btoa(unescape(encodeURIComponent(s)));
        };

        // Функция для замены переменных в шаблоне
        // @ts-ignore
        const format = function(s, c) {
            // @ts-ignore
            return s.replace(/{(\w+)}/g, function(m, p) {
                return c[p];
            });
        };

        // Функция, доступная снаружи, для создания Excel из таблицы
        // @ts-ignore
        return function(table, name) {
            // Проверяем, передана ли нода таблицы, если нет - ищем по ID
            if (!table.nodeType) table = document.getElementById(table);

            const ctx = {
                worksheet: name || 'Worksheet',
                table: table.innerHTML
            };

            // Создаем Excel-файл, переходя по ссылке
            window.location.href = uri + base64(format(template, ctx));
        };
    })();

    const [isExportSelectOpen, setIsExportSelectOpen] = useState(false)
    const {rootEl} = useClickOutside(setIsExportSelectOpen)

    return (
        <div ref={rootEl} className={isExportSelectOpen ? "section-table__export drop-down is-right-default is-active" : "section-table__export drop-down is-right-default"}>
            <button onClick={_ => setIsExportSelectOpen(prev => !prev)} className="section-table__export--target drop-down__target" type="button">
                Export
                <svg width="16" height="17" viewBox="0 0 16 17">
                    <use xlinkHref="#download"></use>
                </svg>
            </button>
            <div className="section-table__export--block drop-down__block">
                <ul className="drop-down__list">
                    <li>
                        <a href="#" onClick={e => tableToExcel('my-table', e)}>
                            Export as .xlsx
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            Export as .pdf
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
