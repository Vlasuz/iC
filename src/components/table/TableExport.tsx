import jsPDF from 'jspdf';
import 'jspdf-autotable';
import React, {useEffect, useState} from 'react'
import {useClickOutside} from "../../hooks/ClickOutside";
import {Translate} from "../translate/Translate";

interface ITableExportProps {
    title?: string
}

export const TableExport: React.FC<ITableExportProps> = ({title}) => {

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



    const exportToPdf = async () => {
        const doc = new jsPDF({
            orientation: "landscape",
        });
        const table = document.getElementById('my-table'); // Замените 'my-table' на ID вашей таблицы

        const fontUrl = '"https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap';
        const fontData = await fetch(fontUrl).then(res => res.arrayBuffer());
        // @ts-ignore
        doc.addFileToVFS('FontName.ttf', fontData);
        doc.addFont('FontName.ttf', 'FontName', 'normal');

        // Использование загруженного шрифта
        doc.setFont('FontName');


        // Генерация PDF из HTML элемента
        // @ts-ignore
        doc.autoTable({ html: table });

        console.log(table)

        // Сохранение PDF
        doc.save('table.pdf');
    };


    const [isExportSelectOpen, setIsExportSelectOpen] = useState(false)
    const {rootEl} = useClickOutside(setIsExportSelectOpen)

    return (
        <div ref={rootEl} className={isExportSelectOpen ? "section-table__export drop-down is-right-default is-active" : "section-table__export drop-down is-right-default"}>
            <button onClick={_ => setIsExportSelectOpen(prev => !prev)} className="section-table__export--target drop-down__target" type="button">
                {title ?? <Translate>employees_admin.table.export</Translate>}
                <svg width="16" height="17" viewBox="0 0 16 17">
                    <use xlinkHref="#download"></use>
                </svg>
            </button>
            <div className="section-table__export--block drop-down__block">
                <ul className="drop-down__list">
                    <li>
                        <a onClick={e => tableToExcel('my-table', e)}>
                            Export as .xlsx
                        </a>
                    </li>
                    <li>
                        <a onClick={e => exportToPdf()}>
                            Export as .pdf
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}
