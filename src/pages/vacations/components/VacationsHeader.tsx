import React, {useEffect, useState} from 'react'
import {useScrollTopValue} from "../../../hooks/ScrollTopValue";
import {useClickOutside} from "../../../hooks/ClickOutside";
import {Translate} from "../../../components/translate/Translate";

interface IVacationsHeaderProps {
    sortByName: any
    setSortByName: any
}

export const VacationsHeader: React.FC<IVacationsHeaderProps> = ({sortByName, setSortByName}) => {

    const {scrollY} = useScrollTopValue()

    const [isOpenSortByName, setIsOpenSortByName] = useState(false)

    const sortByNameList = [
        {
            value: "default",
            label: <Translate>by_default</Translate>
        },
        {
            value: "sortDown",
            label: "A-Z"
        },
        {
            value: "sortUp",
            label: "Z-A"
        }
    ]

    const {rootEl} = useClickOutside(setIsOpenSortByName)

    return (
        <div className="section-table__head">
            <div className="section-table__head-row">
                <div className="section-table__head-th visible-on-mob">
					<span className="section-table__main--param">
						<span>№</span>
						<span>
							<div ref={rootEl}
                                 className={`section-table__main--sort drop-down-absolute ${isOpenSortByName && "is-active"}`}>
								<button onClick={_ => setIsOpenSortByName(prev => !prev)}
                                        className="section-table__main--sort-target drop-down-absolute__target">
									<svg width="13" height="13" viewBox="0 0 13 13">
										<use xlinkHref="#user"></use>
									</svg>
									<Translate>employees_admin.table.name</Translate>
									<svg width="10" height="15" viewBox="0 0 11 15">
										<use xlinkHref="#sort-up-down"></use>
									</svg>
								</button>
								<div
                                    className={`section-table__main--sort-block drop-down-absolute__block ${isOpenSortByName && "is-active"}`}
                                    id="name-sort" style={{minWidth: "150px", transform: `translateY(${-scrollY}px)`}}>
									<ul className="drop-down__list drop-down__list-date">
                                        {sortByNameList.map(item =>
                                            <li key={item.value}
                                                className={item.value === sortByName ? "is-active" : ""}>
                                                <a onClick={_ => {
                                                    setSortByName(item.value === sortByName ? "" : item.value)
                                                    setIsOpenSortByName(false)
                                                }}>
                                                    <svg width="15" height="16" viewBox="0 0 15 16">
                                                        <use xlinkHref="#sort-asc"/>
                                                    </svg>
                                                    {
                                                        item.label
                                                    }
                                                </a>
                                            </li>
                                        )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </span>
                    </span>
                </div>
                <div className="section-table__head-th visible-on-desktop">
                    <span className="section-table__main--param is-center">
                        №
                    </span>
                </div>
                <div className="section-table__head-th visible-on-desktop">
                    <div ref={rootEl} className="section-table__main--sort drop-down-absolute">
                        <button
                            onClick={_ => setIsOpenSortByName(prev => !prev)}
                            className={`section-table__main--sort-target drop-down-absolute__target ${isOpenSortByName && "is-active"}`}>
                            <svg width="13" height="13" viewBox="0 0 13 13">
                                <use xlinkHref="#user"></use>
                            </svg>
                            <Translate>employees_admin.table.name</Translate>
                            <svg width="10" height="15" viewBox="0 0 11 15">
                                <use xlinkHref="#sort-up-down"></use>
                            </svg>
                        </button>
                        <div
                            className={`section-table__main--sort-block drop-down-absolute__block ${isOpenSortByName && "is-active"}`}
                            id="name-sort-2" style={{minWidth: "150px", transform: `translateY(${-scrollY}px)`}}>
                            <ul className="drop-down__list drop-down__list-date">

                                {
                                    sortByNameList.map(item =>
                                        <li key={item.value} className={item.value === sortByName ? "is-active" : ""}>
                                            <a onClick={_ => {
                                                setSortByName(item.value === sortByName ? "" : item.value)
                                                setIsOpenSortByName(false)
                                            }}>
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#sort-asc"/>
                                                </svg>
                                                {
                                                    item.label
                                                }
                                            </a>
                                        </li>
                                    )
                                }

                            </ul>
                        </div>
                    </div>
                </div>
                <div className="section-table__head-th">
                    <span className="section-table__main--param is-center">
                        <Translate>vacations_admin.remain</Translate>
                    </span>
                </div>
                <div className="section-table__head-th">
                    <span className="section-table__main--param is-center">
                        <Translate>vacations_admin.extra</Translate>
                    </span>
                </div>
                <div className="section-table__head-th">
                    <span className="section-table__main--param is-center">
                        <Translate>vacations_admin.days_per_year</Translate>
                    </span>
                </div>
                <div className="section-table__head-th is-accent-col">
                    <span className="section-table__main--param is-center">
                        <Translate>vacations_admin.total</Translate>
                    </span>
                </div>
                {/*<div className="section-table__head-th">*/}
                {/*    <span className="section-table__main--param is-center">*/}
                {/*        <Translate>vacations_admin.total</Translate>*/}
                {/*    </span>*/}
                {/*</div>*/}
                <div className="section-table__head-th">
                    <span className="section-table__main--param is-center">
                    	<Translate>vacations_admin.jan</Translate>
                    </span>
                </div>
                <div className="section-table__head-th">
                    <span className="section-table__main--param is-center">
                    	<Translate>vacations_admin.feb</Translate>
                    </span>
                </div>
                <div className="section-table__head-th">
                    <span className="section-table__main--param is-center">
                    	<Translate>vacations_admin.mar</Translate>
                    </span>
                </div>
                <div className="section-table__head-th">
                    <span className="section-table__main--param is-center">
                    	<Translate>vacations_admin.apr</Translate>
                    </span>
                </div>
                <div className="section-table__head-th">
                    <span className="section-table__main--param is-center">
                    	<Translate>vacations_admin.may</Translate>
                    </span>
                </div>
                <div className="section-table__head-th">
                    <span className="section-table__main--param is-center">
                    	<Translate>vacations_admin.jun</Translate>
                    </span>
                </div>
                <div className="section-table__head-th">
                    <span className="section-table__main--param is-center">
                    	<Translate>vacations_admin.jul</Translate>
                    </span>
                </div>
                <div className="section-table__head-th">
                    <span className="section-table__main--param is-center">
                    	<Translate>vacations_admin.aug</Translate>
                    </span>
                </div>
                <div className="section-table__head-th">
                    <span className="section-table__main--param is-center">
                    	<Translate>vacations_admin.sep</Translate>
                    </span>
                </div>
                <div className="section-table__head-th">
                    <span className="section-table__main--param is-center">
                    	<Translate>vacations_admin.oct</Translate>
                    </span>
                </div>
                <div className="section-table__head-th">
                    <span className="section-table__main--param is-center">
                    	<Translate>vacations_admin.nov</Translate>
                    </span>
                </div>
                <div className="section-table__head-th">
                    <span className="section-table__main--param is-center">
                    	<Translate>vacations_admin.dec</Translate>
                    </span>
                </div>
                <div className="section-table__head-th is-accent-col">
                    <span className="section-table__main--param is-center">
                    	<Translate>vacations_admin.remain_days</Translate>
                    </span>
                </div>
            </div>
        </div>
    )
}
