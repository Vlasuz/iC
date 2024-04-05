import React, {useEffect, useState} from 'react'
import {VacationsStyled} from "./Vacations.styled";
import {TableExportCustom} from "../../components/table/TableExportCustom";
import {TableSelectYear} from "../../components/table/TableSelectYear";
import {VacationsHeader} from "./components/VacationsHeader";
import {useDispatch, useSelector } from 'react-redux';
import {IEmployee, IUser, IVacation} from "../../models";
import {VacationsItem} from "./components/VacationsItem";
import {getBearer} from "../../functions/getBearer";
import axios from "axios";
import {getApiLink} from "../../functions/getApiLink";
import {setEmployeesList} from "../../storage/toolkit";
import {Translate} from "../../components/translate/Translate";
import {CustomSelect} from "../../components/customSelect/CustomSelect";
import {RowsPerPage} from "../../constants/RowsPerPage";
import {VacationsExcel} from "./components/VacationsExcel";
import {useTranslation} from "react-i18next";
import {ProjectsExcel} from "../projects/components/ProjectsExcel";

interface IVacationsProps {

}

export const Vacations: React.FC<IVacationsProps> = () => {

    const [valueSearch, setValueSearch] = useState<string>("")
    const [sortByName, setSortByName] = useState<string>("default")
    const [selectValue, setSelectValue] = useState(RowsPerPage()[0])
    const [vacations, setVacations] = useState<IVacation[]>([])
    const [isLoad, setIsLoad] = useState(false)

    const user: IUser = useSelector((state: any) => state.toolkit.user)

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        getBearer("get")
        axios.get(getApiLink("/api/admin/employee/vacations/" + (valueSearch && `?search=${valueSearch}`))).then(({data}) => {
            setVacations(data)
        }).catch(er => console.log(er))
    }

    useEffect(() => {
        if(!user.id) return;
        if(sortByName !== "default") return;

        getBearer("get")
        axios.get(getApiLink(`/api/admin/employee/vacations/`)).then(({data}) => {
            setVacations(data)
        }).catch(er => console.log(er))
    }, [valueSearch, user, sortByName])


    useEffect(() => {
        if (isLoad) return;

        setSelectValue(vacations.length > +RowsPerPage()[0].value ? RowsPerPage()[0] : RowsPerPage()[3])
        setTimeout(() => {
            setIsLoad(true)
        }, 1000)
    }, [vacations, isLoad])


    const handleAddRows = () => {
        const plusCount = window.innerWidth < 768 ? 10 : 20

        setSelectValue({
            value: vacations.length <= +selectValue.label + plusCount ? 0 : selectValue.value + plusCount,
            label: vacations.length <= +selectValue.label + plusCount ? "All" : String(+selectValue.label + plusCount)
        })
    }

    useEffect(() => {
        setSelectValue(vacations.length > +RowsPerPage()[0].value ? RowsPerPage()[0] : RowsPerPage()[3])
    }, [vacations])

    const dateNow = new Date()
    const [listYear, setListYear] = useState(dateNow.getFullYear())

    useEffect(() => {
        if(!user?.id) return;

        axios.get(getApiLink(`/api/admin/employee/vacations/?year=${listYear}`)).then(({data}) => {
            setVacations(data)
        })
    }, [listYear])

    const {t} = useTranslation()

    return (
        <VacationsStyled className="section-table">

            <div className="section-table__header">
                <div className="section-table__header--row is-always-row">
                    <div className="section-table__header--col">
                        <h1 className="section-table__title title">
                            <Translate>vacations_admin.vacations</Translate>
                        </h1>
                    </div>
                </div>
                <div className="section-table__header--row is-alternative-row">
                    <div className="section-table__header--col">
                        <form onSubmit={handleSearch} className="section-table__search is-alternative">
                            <label className="section-table__search--label">
                                <input type="search" name="search"
                                       className="section-table__search--input" onChange={e => setValueSearch(e.target.value)} value={valueSearch}/>
                                <span className="placeholder">
                                    {!valueSearch.length ? <Translate>vacations_admin.search_an_employee</Translate> : ""}
                                </span>
                            </label>
                            <button className="section-table__search--submit btn is-grey is-min-on-mob"
                                    type="submit">
                                <Translate>vacations_admin.search</Translate>
                                <svg width="15" height="15" viewBox="0 0 15 15">
                                    <use xlinkHref="#search"></use>
                                </svg>
                            </button>
                        </form>
                    </div>
                    <div className="section-table__header--col">
                        <TableSelectYear setYear={setListYear}/>

                        <TableExportCustom
                            excelFile={(e: any) => VacationsExcel({vacations, listYear, translate: t})}
                        />

                    </div>
                </div>
            </div>
            <div className="section-table__main is-alternative add-border table-vacations">
                <div className="section-table__main--container" data-simplebar data-simplebar-auto-hide="false">
                    <div className="section-table__main--wrapper">
                        <VacationsHeader
                            sortByName={sortByName}
                            setSortByName={setSortByName}
                        />

                        <div className="section-table__body">
                                {
                                    vacations
                                        ?.sort((a, b) => sortByName !== "default" ? (a.user?.last_name < b.user?.last_name ? sortByName === "sortUp" ? 1 : -1 : sortByName === "sortDown" ? 1 : -1) : 0)
                                        // ?.filter((item, index) => selectValue.value === 0 ? item : index < selectValue.value)
                                        // ?.sort((a, b) => +a.archive - +b.archive)

                                        ?.map((item: IVacation, index: number) => (
                                            <VacationsItem key={item.user.id} index={index + 1} itemData={item} />
                                        ))

                                }
                        </div>
                    </div>
                </div>
            </div>

            <div className="section-table__footer">
                <div className="section-table__row-per-page visible-on-mob">
                            <span>
                                <Translate>employees_admin.table.rows_per_page</Translate>
                            </span>

                    <CustomSelect list={RowsPerPage()} defaultValue={RowsPerPage()[0]} selectValue={selectValue} setSelectedItem={setSelectValue}/>
                </div>

                {selectValue.value !== 0 && vacations.length > selectValue.value &&
                    <button onClick={handleAddRows} className="section-table__see-more btn" type="button">
                        <Translate>employees_admin.table.show_more</Translate>
                        <svg width="15" height="15" viewBox="0 0 15 15">
                            <use xlinkHref="#arrow-down"></use>
                        </svg>
                    </button>}

                <div className="section-table__row-per-page visible-on-desktop">
                            <span>
                                <Translate>employees_admin.table.rows_per_page</Translate>
                            </span>

                    <CustomSelect list={RowsPerPage()} defaultValue={RowsPerPage()[0]} selectValue={selectValue} setSelectedItem={setSelectValue}/>

                </div>
            </div>
        </VacationsStyled>
    )
}
