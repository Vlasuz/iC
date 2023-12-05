import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from 'react'
import {HeaderSearch} from "../../../contexts";
import {PopupContext} from "../../../App";
import {EmployeesItem} from "./EmployeesItem";

interface IEmployeesHeaderProps {

}

export const EmployeesHeader: React.FC<IEmployeesHeaderProps> = () => {

    const setSearchValueContext: Dispatch<SetStateAction<string>> = useContext(HeaderSearch)
    const setPopup: any = useContext(PopupContext)
    const [searchValue, setSearchValue] = useState<string>('')

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearchValueContext(searchValue)
    }


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


    return (
        <div className="section-table__header">
            <div className="section-table__header--row is-always-row">
                <div className="section-table__header--col">
                    <h1 className="section-table__title title">
                        Employees
                    </h1>
                </div>
            </div>
            <div className="section-table__header--row row-2">
                <div className="section-table__header--col">
                    <a onClick={_ => setPopup({popup: "add-new-employee-popup"})} className="section-table__add btn open-popup">
                        Add new employee
                        <svg width="16" height="15" viewBox="0 0 16 15">
                            <use xlinkHref="#plus"></use>
                        </svg>
                    </a>
                    <form onSubmit={handleSearch} className="section-table__search">
                        <label className="section-table__search--label">
                            <input onChange={e => setSearchValue(e.target.value)} value={searchValue} type="search" name="search" autoComplete="off" placeholder="Search an employee" className="section-table__search--input"/>
                        </label>
                        <button className="section-table__search--submit btn is-grey is-min-on-mob"
                                type="submit">
                            Search
                            <svg width="15" height="15" viewBox="0 0 15 15">
                                <use xlinkHref="#search"></use>
                            </svg>
                        </button>
                    </form>
                </div>
                <div className="section-table__header--col">
                    <div className="section-table__change-date drop-down">
                        <button className="section-table__change-date--target drop-down__target" type="button">
                            2023
                            <svg width="10" height="7" viewBox="0 0 10 7"
                                 className="section-table__change-date--target-arrow drop-down__target--arrow">
                                <use xlinkHref="#drop-down-arrow"></use>
                            </svg>
                        </button>
                        <div className="section-table__change-date--block drop-down__block">
                            <div className="section-table__change-date--slider splide">
                                <div className="splide__track">
                                    <ul className="splide__list">
                                        <li className="splide__slide">
                                            <label>
                                                <input type="radio" name="year" value="2021"/>
                                                <span>2021</span>
                                            </label>
                                        </li>
                                        <li className="splide__slide">
                                            <label>
                                                <input type="radio" name="year" value="2022"/>
                                                <span>2022</span>
                                            </label>
                                        </li>
                                        <li className="splide__slide">
                                            <label>
                                                <input type="radio" name="year" value="2023" checked readOnly />
                                                <span>2023</span>
                                            </label>
                                        </li>
                                        <li className="splide__slide is-disabled">
                                            <label>
                                                <input type="radio" name="year" value="2024" disabled/>
                                                <span>2024</span>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                                <div className="splide__arrows">
                                    <button className="splide__arrow splide__arrow--prev" type="button">
                                        <svg width="7" height="10" viewBox="0 0 7 10">
                                            <use xlinkHref="#arrow-prev"></use>
                                        </svg>
                                    </button>
                                    <button className="splide__arrow splide__arrow--next" type="button">
                                        <svg width="7" height="10" viewBox="0 0 7 10">
                                            <use xlinkHref="#arrow-next"></use>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section-table__export drop-down is-right-default">
                        <button className="section-table__export--target drop-down__target" type="button">
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
                </div>
            </div>
        </div>
    )
}
