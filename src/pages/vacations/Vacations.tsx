import React, {useEffect} from 'react'

interface IVacationsProps {

}

export const Vacations: React.FC<IVacationsProps> = () => {

    return (
        <section className="section-table">
            <div className="section-table__header">
                <div className="section-table__header--row is-always-row">
                    <div className="section-table__header--col">
                        <h1 className="section-table__title title">
                            Vacations
                        </h1>
                    </div>
                </div>
                <div className="section-table__header--row is-alternative-row">
                    <div className="section-table__header--col">
                        <form className="section-table__search is-alternative">
                            <label className="section-table__search--label">
                                <input type="search" required name="search" placeholder="Search a project"
                                       className="section-table__search--input"/>
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
                                                    <input type="radio" name="year" value="2021" />
                                                    <span>2021</span>
                                                </label>
                                            </li>
                                            <li className="splide__slide">
                                                <label>
                                                    <input type="radio" name="year" value="2022" />
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
                                                    <input type="radio" name="year" value="2024" disabled />
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
                                        <a href="#">
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
            <div className="section-table__main is-alternative add-border table-vacations">
                <div className="section-table__main--container" data-simplebar data-simplebar-auto-hide="false">
                    <div className="section-table__main--wrapper">
                        <div className="section-table__head">
                            <div className="section-table__head-row">
                                <div className="section-table__head-th visible-on-mob">
										<span className="section-table__main--param">
											<span>№</span>
											<span>
												<div className="section-table__main--sort drop-down-absolute">
													<button
                                                        className="section-table__main--sort-target drop-down-absolute__target"
                                                        data-drop-down-target="name-sort" type="button">
														<svg width="13" height="13" viewBox="0 0 13 13">
															<use xlinkHref="#user"></use>
														</svg>
														Name
														<svg width="10" height="15" viewBox="0 0 11 15">
															<use xlinkHref="#sort-up-down"></use>
														</svg>
													</button>
													<div
                                                        className="section-table__main--sort-block drop-down-absolute__block"
                                                        id="name-sort" style={{minWidth: "150px"}}>
														<ul className="drop-down__list">
															<li>
																<a href="#">
																	<svg width="15" height="16" viewBox="0 0 15 16">
																		<use
                                                                            xlinkHref="#sort-asc"></use>
																	</svg>
																	A-Z
																</a>
															</li>
															<li>
																<a href="#">
																	<svg width="15" height="16" viewBox="0 0 15 16">
																		<use
                                                                            xlinkHref="#sort-asc"></use>
																	</svg>
																	Z-A
																</a>
															</li>
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
                                    <div className="section-table__main--sort drop-down-absolute">
                                        <button
                                            className="section-table__main--sort-target drop-down-absolute__target"
                                            data-drop-down-target="name-sort-2" type="button">
                                            <svg width="13" height="13" viewBox="0 0 13 13">
                                                <use xlinkHref="#user"></use>
                                            </svg>
                                            Name
                                            <svg width="10" height="15" viewBox="0 0 11 15">
                                                <use xlinkHref="#sort-up-down"></use>
                                            </svg>
                                        </button>
                                        <div className="section-table__main--sort-block drop-down-absolute__block"
                                             id="name-sort-2" style={{minWidth: "150px"}}>
                                            <ul className="drop-down__list">
                                                <li>
                                                    <a href="#">
                                                        <svg width="15" height="16" viewBox="0 0 15 16">
                                                            <use xlinkHref="#sort-asc"></use>
                                                        </svg>
                                                        A-Z
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <svg width="15" height="16" viewBox="0 0 15 16">
                                                            <use xlinkHref="#sort-asc"></use>
                                                        </svg>
                                                        Z-A
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="section-table__head-th">
										<span className="section-table__main--param is-center">
											Remain
										</span>
                                </div>
                                <div className="section-table__head-th">
										<span className="section-table__main--param is-center">
											Extra
										</span>
                                </div>
                                <div className="section-table__head-th">
										<span className="section-table__main--param is-center">
											D/y
										</span>
                                </div>
                                <div className="section-table__head-th is-accent-col">
										<span className="section-table__main--param is-center">
											Total
										</span>
                                </div>
                                <div className="section-table__head-th">
										<span className="section-table__main--param is-center">
											Jan
										</span>
                                </div>
                                <div className="section-table__head-th">
										<span className="section-table__main--param is-center">
											Feb
										</span>
                                </div>
                                <div className="section-table__head-th">
										<span className="section-table__main--param is-center">
											Mar
										</span>
                                </div>
                                <div className="section-table__head-th">
										<span className="section-table__main--param is-center">
											Apr
										</span>
                                </div>
                                <div className="section-table__head-th">
										<span className="section-table__main--param is-center">
											May
										</span>
                                </div>
                                <div className="section-table__head-th">
										<span className="section-table__main--param is-center">
											Jun
										</span>
                                </div>
                                <div className="section-table__head-th">
										<span className="section-table__main--param is-center">
											Jul
										</span>
                                </div>
                                <div className="section-table__head-th">
										<span className="section-table__main--param is-center">
											Aug
										</span>
                                </div>
                                <div className="section-table__head-th">
										<span className="section-table__main--param is-center">
											Sep
										</span>
                                </div>
                                <div className="section-table__head-th">
										<span className="section-table__main--param is-center">
											Oct
										</span>
                                </div>
                                <div className="section-table__head-th">
										<span className="section-table__main--param is-center">
											Nov
										</span>
                                </div>
                                <div className="section-table__head-th">
										<span className="section-table__main--param is-center">
											Dec
										</span>
                                </div>
                                <div className="section-table__head-th is-accent-col">
										<span className="section-table__main--param is-center">
											Remain days
										</span>
                                </div>
                            </div>
                        </div>
                        <div className="section-table__body">
                            <div className="section-table__row drop-down-2">
                                <div className="section-table__param visible-on-mob">
                                    <span>1</span>
                                    <span>Olena Rybak</span>
                                </div>
                                <div className="section-table__param visible-on-desktop is-none-vertical-hover">
                                    1
                                </div>
                                <div className="section-table__param visible-on-desktop is-none-vertical-hover">
                                    Olena Rybak
                                </div>
                                <div className="section-table__param">
                                    1.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    22.0
                                </div>
                                <div className="section-table__param">
                                    23.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    23.0
                                </div>
                                <div className="drop-down-2__block">
                                    <ul className="drop-down-2__list">
                                        <li>
                                            <a href="#">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#edit"></use>
                                                </svg>
                                                Edit extra days
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="section-table__row drop-down-2">
                                <div className="section-table__param visible-on-mob">
                                    <span>1</span>
                                    <span>Olena Rybak</span>
                                </div>
                                <div className="section-table__param visible-on-desktop is-none-vertical-hover">
                                    1
                                </div>
                                <div className="section-table__param visible-on-desktop is-none-vertical-hover">
                                    Olena Rybak
                                </div>
                                <div className="section-table__param">
                                    1.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    22.0
                                </div>
                                <div className="section-table__param">
                                    23.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    23.0
                                </div>
                                <div className="drop-down-2__block">
                                    <ul className="drop-down-2__list">
                                        <li>
                                            <a href="#">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#edit"></use>
                                                </svg>
                                                Edit extra days
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="section-table__row drop-down-2">
                                <div className="section-table__param visible-on-mob">
                                    <span>1</span>
                                    <span>Olena Rybak</span>
                                </div>
                                <div className="section-table__param visible-on-desktop is-none-vertical-hover">
                                    1
                                </div>
                                <div className="section-table__param visible-on-desktop is-none-vertical-hover">
                                    Olena Rybak
                                </div>
                                <div className="section-table__param">
                                    1.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    22.0
                                </div>
                                <div className="section-table__param">
                                    23.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    23.0
                                </div>
                                <div className="drop-down-2__block">
                                    <ul className="drop-down-2__list">
                                        <li>
                                            <a href="#">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#edit"></use>
                                                </svg>
                                                Edit extra days
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="section-table__row drop-down-2">
                                <div className="section-table__param visible-on-mob">
                                    <span>1</span>
                                    <span>Olena Rybak</span>
                                </div>
                                <div className="section-table__param visible-on-desktop is-none-vertical-hover">
                                    1
                                </div>
                                <div className="section-table__param visible-on-desktop is-none-vertical-hover">
                                    Olena Rybak
                                </div>
                                <div className="section-table__param">
                                    1.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    22.0
                                </div>
                                <div className="section-table__param">
                                    23.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    23.0
                                </div>
                                <div className="drop-down-2__block">
                                    <ul className="drop-down-2__list">
                                        <li>
                                            <a href="#">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#edit"></use>
                                                </svg>
                                                Edit extra days
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="section-table__row drop-down-2">
                                <div className="section-table__param visible-on-mob">
                                    <span>1</span>
                                    <span>Olena Rybak</span>
                                </div>
                                <div className="section-table__param visible-on-desktop is-none-vertical-hover">
                                    1
                                </div>
                                <div className="section-table__param visible-on-desktop is-none-vertical-hover">
                                    Olena Rybak
                                </div>
                                <div className="section-table__param">
                                    1.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    22.0
                                </div>
                                <div className="section-table__param">
                                    23.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    23.0
                                </div>
                                <div className="drop-down-2__block">
                                    <ul className="drop-down-2__list">
                                        <li>
                                            <a href="#">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#edit"></use>
                                                </svg>
                                                Edit extra days
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="section-table__row drop-down-2">
                                <div className="section-table__param visible-on-mob">
                                    <span>1</span>
                                    <span>Olena Rybak</span>
                                </div>
                                <div className="section-table__param visible-on-desktop is-none-vertical-hover">
                                    1
                                </div>
                                <div className="section-table__param visible-on-desktop is-none-vertical-hover">
                                    Olena Rybak
                                </div>
                                <div className="section-table__param">
                                    1.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    22.0
                                </div>
                                <div className="section-table__param">
                                    23.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    23.0
                                </div>
                                <div className="drop-down-2__block">
                                    <ul className="drop-down-2__list">
                                        <li>
                                            <a href="#">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#edit"></use>
                                                </svg>
                                                Edit extra days
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="section-table__row drop-down-2">
                                <div className="section-table__param visible-on-mob">
                                    <span>1</span>
                                    <span>Olena Rybak</span>
                                </div>
                                <div className="section-table__param visible-on-desktop is-none-vertical-hover">
                                    1
                                </div>
                                <div className="section-table__param visible-on-desktop is-none-vertical-hover">
                                    Olena Rybak
                                </div>
                                <div className="section-table__param">
                                    1.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    22.0
                                </div>
                                <div className="section-table__param">
                                    23.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    0.0
                                </div>
                                <div className="section-table__param">
                                    23.0
                                </div>
                                <div className="drop-down-2__block">
                                    <ul className="drop-down-2__list">
                                        <li>
                                            <a href="#">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#edit"></use>
                                                </svg>
                                                Edit extra days
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-table__footer">
                <div className="section-table__row-per-page visible-on-mob">
                    <span>Rows per page:</span>
                    <select name="row-per-page"
                            className="section-table__row-per-page--select custom-select is-center">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="40">40</option>
                        <option value="all">All</option>
                    </select>
                </div>
                <button className="section-table__see-more btn" type="button">
                    Show more
                    <svg width="15" height="15" viewBox="0 0 15 15">
                        <use xlinkHref="#arrow-down"></use>
                    </svg>
                </button>
                <div className="section-table__row-per-page visible-on-desktop">
                    <span>Rows per page:</span>
                    <select name="row-per-page"
                            className="section-table__row-per-page--select custom-select is-center">
                        <option value="20">20</option>
                        <option value="40">40</option>
                        <option value="60">60</option>
                        <option value="all">All</option>
                    </select>
                </div>
            </div>
        </section>
    )
}
