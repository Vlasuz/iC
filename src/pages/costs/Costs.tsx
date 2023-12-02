import React, {useEffect} from 'react'

interface ICostsProps {

}

export const Costs: React.FC<ICostsProps> = () => {

    return (
        <section className="section-table">
            <div className="section-table__header">
                <div className="section-table__header--row is-always-row">
                    <div className="section-table__header--col">
                        <h1 className="section-table__title title change-title" id="main-title">
                            <span>Costs</span>
                            <span>Costs / Add costs</span>
                        </h1>
                    </div>
                    <div className="section-table__header--col">
                        <div className="section-table__notification notification drop-down-absolute">
                            <button className="notification__target drop-down-absolute__target is-has-notice"
                                    data-drop-down-target="notification-block" type="button">
                                <svg width="17" height="20" viewBox="0 0 17 20">
                                    <use xlinkHref="#notification"></use>
                                </svg>
                            </button>
                            <div className="notification__block drop-down-absolute__block is-right-default"
                                 id="notification-block">
                                <h2 className="notification__block--title">
                                    Your notifications
                                </h2>
                                <div className="notification__block--wrapper custom-scrollbar" data-simplebar
                                     data-simplebar-auto-hide="false">
                                    <ul className="notification__list">
                                        <li>
                                            <div className="notification__item">
                                                <div className="notification__block--text">
                                                    <p>
                                                        <b>You have a new comment from Irina Omelianenko:</b>
                                                        No problems, take your time. Don’t forget please about the fact
                                                        that 19th was weekend
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="notification__item">
                                                <div className="notification__block--icon is-success">
                                                    <svg width="20" height="20" viewBox="0 0 20 20">
                                                        <use xlinkHref="#round-check"></use>
                                                    </svg>
                                                </div>
                                                <div className="notification__block--text">
                                                    <p>
                                                        Your timesheet for October was successfully approved!
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="notification__item">
                                                <div className="notification__block--icon is-danger">
                                                    <svg width="20" height="20" viewBox="0 0 20 20">
                                                        <use xlinkHref="#round-error"></use>
                                                    </svg>
                                                </div>
                                                <div className="notification__block--text">
                                                    <p>
                                                        Your timesheet for September was rejected!
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="notification__item">
                                                <div className="notification__block--text">
                                                    <p>
                                                        <b>You have a new comment from Irina Omelianenko:</b>
                                                        No problems, take your time. Don’t forget please about the fact
                                                        that 19th was weekend
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="notification__item">
                                                <div className="notification__block--icon is-success">
                                                    <svg width="20" height="20" viewBox="0 0 20 20">
                                                        <use xlinkHref="#round-check"></use>
                                                    </svg>
                                                </div>
                                                <div className="notification__block--text">
                                                    <p>
                                                        Your timesheet for October was successfully approved!
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="notification__item">
                                                <div className="notification__block--icon is-danger">
                                                    <svg width="20" height="20" viewBox="0 0 20 20">
                                                        <use xlinkHref="#round-error"></use>
                                                    </svg>
                                                </div>
                                                <div className="notification__block--text">
                                                    <p>
                                                        Your timesheet for September was rejected!
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="notification__item">
                                                <div className="notification__block--text">
                                                    <p>
                                                        <b>You have a new comment from Irina Omelianenko:</b>
                                                        No problems, take your time. Don’t forget please about the fact
                                                        that 19th was weekend
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="notification__item">
                                                <div className="notification__block--icon is-success">
                                                    <svg width="20" height="20" viewBox="0 0 20 20">
                                                        <use xlinkHref="#round-check"></use>
                                                    </svg>
                                                </div>
                                                <div className="notification__block--text">
                                                    <p>
                                                        Your timesheet for October was successfully approved!
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="notification__item">
                                                <div className="notification__block--icon is-danger">
                                                    <svg width="20" height="20" viewBox="0 0 20 20">
                                                        <use xlinkHref="#round-error"></use>
                                                    </svg>
                                                </div>
                                                <div className="notification__block--text">
                                                    <p>
                                                        Your timesheet for September was rejected!
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-table__header--block block-for-is-active">
                    <div className="section-table__header--block-item">
                        <div>
                            <div className="section-table__header--row row-2">
                                <div className="section-table__header--col">
                                    <button type="button" className="section-table__add btn add-is-active"
                                            data-add-active-change-title="main-title">
                                        Add expence
                                        <svg width="16" height="15" viewBox="0 0 16 15">
                                            <use xlinkHref="#plus"></use>
                                        </svg>
                                    </button>
                                    <form className="section-table__search">
                                        <label className="section-table__search--label">
                                            <input type="search" required name="search" placeholder="Search a project"
                                                   className="section-table__search--input" />
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
                                    <div className="section-table__change-full-date drop-down">
                                        <button className="section-table__change-full-date--target drop-down__target"
                                                type="button">
                                            <span>April, 2023</span>
                                            <svg width="10" height="7" viewBox="0 0 10 7"
                                                 className="section-table__change-full-date--target-arrow drop-down__target--arrow">
                                                <use xlinkHref="#drop-down-arrow"></use>
                                            </svg>
                                        </button>
                                        <div className="section-table__change-full-date--block drop-down__block">
                                            <div className="section-table__change-full-date--months">
                                                <ul>
                                                    <li>
                                                        <label>
                                                            <input type="radio" name="month" value="1" checked readOnly />
                                                                <span>January</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            <input type="radio" name="month" value="7" />
                                                                <span>July</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            <input type="radio" name="month" value="2" />
                                                                <span>February</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            <input type="radio" name="month" value="8" />
                                                                <span>August</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            <input type="radio" name="month" value="3" />
                                                                <span>March</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            <input type="radio" name="month" value="9" />
                                                                <span>September</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            <input type="radio" name="month" value="4" />
                                                                <span>April</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            <input type="radio" name="month" value="10" />
                                                                <span>October</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            <input type="radio" name="month" value="5" />
                                                                <span>May</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            <input type="radio" name="month" value="11" />
                                                                <span>November</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            <input type="radio" name="month" value="6" />
                                                                <span>June</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label>
                                                            <input type="radio" name="month" value="12" />
                                                                <span>December</span>
                                                        </label>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="section-table__change-full-date--slider splide">
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
                                        <button className="section-table__export--target drop-down__target"
                                                type="button">
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
                    </div>
                    <div className="section-table__header--block-item">
                        <div>
                            <div className="section-table__header--add-costs section-table__add-costs">
                                <button className="section-table__add-costs--back back-btn remove-is-active"
                                        data-remove-active-change-title="main-title" type="button" aria-label="Go back">
                                    <svg width="7" height="10" viewBox="0 0 7 10">
                                        <use xlinkHref="#arrow-prev"></use>
                                    </svg>
                                    <span className="visible-on-mob">
											Go back
										</span>
                                </button>
                                <div className="section-table__add-costs--set-date">
                                    <input type="text" name="date" placeholder="Set date" autoComplete="off" readOnly
                                           className="input date-input none-disabled-style" required
                                           data-prev-arrow-path="img/sprites.svg#arrow-prev"
                                           data-next-arrow-path="img/sprites.svg#arrow-next"/>
                                        <svg width="10" height="7" viewBox="0 0 10 7">
                                            <use xlinkHref="#drop-down-arrow"></use>
                                        </svg>
                                </div>
                                <div className="section-table__add-task--project drop-down">
                                    <button className="section-table__add-task--project-target drop-down__target"
                                            type="button">
                                        Choose project
                                        <svg width="10" height="7" viewBox="0 0 10 7"
                                             className="drop-down__target--arrow">
                                            <use xlinkHref="#drop-down-arrow"></use>
                                        </svg>
                                    </button>
                                    <div className="section-table__main--project-name-block drop-down__block">
                                        <div className="project-popup">
                                            <div className="project-popup__body" data-simplebar
                                                 data-simplebar-auto-hide="false">
                                                <div className="project-popup__block">
                                                    <h2>Сommonly used</h2>
                                                    <ul className="project-popup__list">
                                                        <li className="project-popup__item">
                                                            <a href="#">
                                                                61x210204_Ukraine EE Building Certification Study
                                                            </a>
                                                        </li>
                                                        <li className="project-popup__item">
                                                            <a href="#">
                                                                61x210204_Ukraine EE Building Certification Study
                                                            </a>
                                                        </li>
                                                        <li className="project-popup__item">
                                                            <a href="#">
                                                                61x210204_Ukraine EE Building Certification Study
                                                            </a>
                                                        </li>
                                                        <li className="project-popup__item">
                                                            <a href="#">
                                                                61x210204_Ukraine EE Building Certification Study
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="project-popup__block">
                                                    <h2>All projects</h2>
                                                    <ul className="project-popup__list">
                                                        <li className="project-popup__item">
                                                            <a href="#">
                                                                61xA210739_Kremenchuk Bridge supervision
                                                            </a>
                                                        </li>
                                                        <li className="project-popup__item">
                                                            <a href="#">
                                                                61xA210739_Kremenchuk Bridge supervision
                                                            </a>
                                                        </li>
                                                        <li className="project-popup__item">
                                                            <a href="#">
                                                                61xA210739_Kremenchuk Bridge supervision
                                                            </a>
                                                        </li>
                                                        <li className="project-popup__item">
                                                            <a href="#">
                                                                61xA210739_Kremenchuk Bridge supervision
                                                            </a>
                                                        </li>
                                                        <li className="project-popup__item">
                                                            <a href="#">
                                                                61xA210739_Kremenchuk Bridge supervision
                                                            </a>
                                                        </li>
                                                        <li className="project-popup__item">
                                                            <a href="#">
                                                                61xA210739_Kremenchuk Bridge supervision
                                                            </a>
                                                        </li>
                                                        <li className="project-popup__item">
                                                            <a href="#">
                                                                61xA210739_Kremenchuk Bridge supervision
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <form className="project-popup__search">
                                                <label>
                                                    <input type="search" name="search" className="input"
                                                           placeholder="Search a project" required/>
                                                </label>
                                                <button className="btn is-grey" type="submit">
                                                    Search
                                                    <svg width="15" height="15" viewBox="0 0 15 15">
                                                        <use xlinkHref="#search"></use>
                                                    </svg>
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="section-table__add-costs--text">
                                    <label>
                                        <input type="text" name="costs" required
                                               placeholder="Write short description of the expence" className="input" />
                                    </label>
                                </div>
                                <div className="section-table__add-costs--cost">
                                    <input type="text" name="cost" placeholder="Cost" required className="input" />
                                </div>
                                <button className="section-table__add-costs--submit btn" type="submit">
                                    Add expence
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section-table__main table-costs add-border">
                <div className="section-table__main--container" data-simplebar data-simplebar-auto-hide="false">
                    <div className="section-table__main--wrapper">
                        <div className="section-table__head">
                            <div className="section-table__head-row">
                                <div className="section-table__head-th visible-on-mob">
										<span className="section-table__main--param">
											<span>№</span>
											<span>
												<div className="section-table__main--sort drop-down-absolute is-mode-1">
													<button
                                                        className="section-table__main--sort-target drop-down-absolute__target"
                                                        data-drop-down-target="date-sort-mob" type="button">
														<svg width="13" height="13" viewBox="0 0 13 13">
															<use xlinkHref="#calendar-selected"></use>
														</svg>
														Date
														<svg width="10" height="15" viewBox="0 0 11 15">
															<use xlinkHref="#sort-up-down"></use>
														</svg>
													</button>
													<div
                                                        className="section-table__main--sort-block drop-down-absolute__block"
                                                        id="date-sort-mob" style={{minWidth: "150px"}}>
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
										<span className="section-table__main--param">
											№
										</span>
                                </div>
                                <div className="section-table__head-th visible-on-desktop">
                                    <div className="section-table__main--sort drop-down-absolute is-center">
                                        <button className="section-table__main--sort-target drop-down-absolute__target"
                                                data-drop-down-target="date-sort" type="button">
                                            <svg width="13" height="13" viewBox="0 0 13 13">
                                                <use xlinkHref="#calendar-selected"></use>
                                            </svg>
                                            Date
                                            <svg width="10" height="15" viewBox="0 0 11 15">
                                                <use xlinkHref="#sort-up-down"></use>
                                            </svg>
                                        </button>
                                        <div className="section-table__main--sort-block drop-down-absolute__block"
                                             id="date-sort" style={{minWidth: "150px"}}>
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
                                    <div className="section-table__main--project-name drop-down-absolute">
                                        <button
                                            className="section-table__main--project-name-target drop-down-absolute__target"
                                            type="button" data-drop-down-target="project-name">
                                            <svg width="13" height="13" viewBox="0 0 13 13">
                                                <use xlinkHref="#project"></use>
                                            </svg>
                                            Project name
                                            <svg width="10" height="7" viewBox="0 0 10 7"
                                                 className="drop-down-absolute__target--arrow">
                                                <use xlinkHref="#drop-down-arrow"></use>
                                            </svg>
                                        </button>
                                        <div
                                            className="section-table__main--project-name-block drop-down-absolute__block"
                                            id="project-name">
                                            <div className="project-popup">
                                                <div className="project-popup__body custom-scrollbar" data-simplebar
                                                     data-simplebar-auto-hide="false">
                                                    <div className="project-popup__block">
                                                        <h2>Сommonly used</h2>
                                                        <ul className="project-popup__list">
                                                            <li className="project-popup__item">
                                                                <a href="#">
                                                                    61x210204_Ukraine EE Building Certification Study
                                                                </a>
                                                            </li>
                                                            <li className="project-popup__item">
                                                                <a href="#">
                                                                    61x210204_Ukraine EE Building Certification Study
                                                                </a>
                                                            </li>
                                                            <li className="project-popup__item">
                                                                <a href="#">
                                                                    61x210204_Ukraine EE Building Certification Study
                                                                </a>
                                                            </li>
                                                            <li className="project-popup__item">
                                                                <a href="#">
                                                                    61x210204_Ukraine EE Building Certification Study
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="project-popup__block">
                                                        <h2>All projects</h2>
                                                        <ul className="project-popup__list">
                                                            <li className="project-popup__item">
                                                                <a href="#">
                                                                    61xA210739_Kremenchuk Bridge supervision
                                                                </a>
                                                            </li>
                                                            <li className="project-popup__item">
                                                                <a href="#">
                                                                    61xA210739_Kremenchuk Bridge supervision
                                                                </a>
                                                            </li>
                                                            <li className="project-popup__item">
                                                                <a href="#">
                                                                    61xA210739_Kremenchuk Bridge supervision
                                                                </a>
                                                            </li>
                                                            <li className="project-popup__item">
                                                                <a href="#">
                                                                    61xA210739_Kremenchuk Bridge supervision
                                                                </a>
                                                            </li>
                                                            <li className="project-popup__item">
                                                                <a href="#">
                                                                    61xA210739_Kremenchuk Bridge supervision
                                                                </a>
                                                            </li>
                                                            <li className="project-popup__item">
                                                                <a href="#">
                                                                    61xA210739_Kremenchuk Bridge supervision
                                                                </a>
                                                            </li>
                                                            <li className="project-popup__item">
                                                                <a href="#">
                                                                    61xA210739_Kremenchuk Bridge supervision
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <form className="project-popup__search">
                                                    <label>
                                                        <input type="search" name="search" className="input"
                                                               placeholder="Search a project" required />
                                                    </label>
                                                    <button className="btn is-grey" type="submit">
                                                        Search
                                                        <svg width="15" height="15" viewBox="0 0 15 15">
                                                            <use xlinkHref="#search"></use>
                                                        </svg>
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="section-table__head-th">
                                    <div className="section-table__main--project-name drop-down-absolute">
                                        <button
                                            className="section-table__main--project-name-target drop-down-absolute__target is-start"
                                            data-drop-down-target="project-description" type="button">
                                            <svg width="13" height="13" viewBox="0 0 13 13">
                                                <use xlinkHref="#comments"></use>
                                            </svg>
                                            Project description
                                            <svg width="10" height="7" viewBox="0 0 10 7"
                                                 className="drop-down-absolute__target--arrow">
                                                <use xlinkHref="#drop-down-arrow"></use>
                                            </svg>
                                        </button>
                                        <div
                                            className="section-table__main--project-name-block drop-down-absolute__block"
                                            id="project-description">
                                            <div className="project-popup">
                                                <div className="project-popup__body" data-simplebar
                                                     data-simplebar-auto-hide="false">
                                                    <div className="project-popup__block">
                                                        <h2>Сommonly used</h2>
                                                        <ul className="project-popup__list">
                                                            <li className="project-popup__item">
                                                                <a href="#">
                                                                    61x210204_Ukraine EE Building Certification Study
                                                                </a>
                                                            </li>
                                                            <li className="project-popup__item">
                                                                <a href="#">
                                                                    61x210204_Ukraine EE Building Certification Study
                                                                </a>
                                                            </li>
                                                            <li className="project-popup__item">
                                                                <a href="#">
                                                                    61x210204_Ukraine EE Building Certification Study
                                                                </a>
                                                            </li>
                                                            <li className="project-popup__item">
                                                                <a href="#">
                                                                    61x210204_Ukraine EE Building Certification Study
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="project-popup__block">
                                                        <h2>All projects</h2>
                                                        <ul className="project-popup__list">
                                                            <li className="project-popup__item">
                                                                <a href="#">
                                                                    61xA210739_Kremenchuk Bridge supervision
                                                                </a>
                                                            </li>
                                                            <li className="project-popup__item">
                                                                <a href="#">
                                                                    61xA210739_Kremenchuk Bridge supervision
                                                                </a>
                                                            </li>
                                                            <li className="project-popup__item">
                                                                <a href="#">
                                                                    61xA210739_Kremenchuk Bridge supervision
                                                                </a>
                                                            </li>
                                                            <li className="project-popup__item">
                                                                <a href="#">
                                                                    61xA210739_Kremenchuk Bridge supervision
                                                                </a>
                                                            </li>
                                                            <li className="project-popup__item">
                                                                <a href="#">
                                                                    61xA210739_Kremenchuk Bridge supervision
                                                                </a>
                                                            </li>
                                                            <li className="project-popup__item">
                                                                <a href="#">
                                                                    61xA210739_Kremenchuk Bridge supervision
                                                                </a>
                                                            </li>
                                                            <li className="project-popup__item">
                                                                <a href="#">
                                                                    61xA210739_Kremenchuk Bridge supervision
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <form className="project-popup__search">
                                                    <label>
                                                        <input type="search" name="search" className="input"
                                                               placeholder="Search a project" required />
                                                    </label>
                                                    <button className="btn is-grey" type="submit">
                                                        Search
                                                        <svg width="15" height="15" viewBox="0 0 15 15">
                                                            <use xlinkHref="#search"></use>
                                                        </svg>
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="section-table__head-th">
										<span className="section-table__main--param">
											<svg width="13" height="13" viewBox="0 0 13 13">
												<use xlinkHref="#pin"></use>
											</svg>
											Description of the expence
										</span>
                                </div>
                                <div className="section-table__head-th">
                                    <div className="section-table__main--func drop-down-absolute">
                                        <button className="section-table__main--func-target drop-down-absolute__target"
                                                data-drop-down-target="cost-sort" type="button">
                                            <svg width="13" height="13" viewBox="0 0 20 20">
                                                <use xlinkHref="#money"></use>
                                            </svg>
                                            Cost (UAH)
                                            <svg width="10" height="15" viewBox="0 0 11 15">
                                                <use xlinkHref="#sort-up-down"></use>
                                            </svg>
                                        </button>
                                        <div
                                            className="section-table__main--func-block drop-down-absolute__block is-right-default"
                                            id="cost-sort" style={{minWidth: "150px"}}>
                                            <ul className="drop-down__list">
                                                <li>
                                                    <a href="#">
                                                        Ascending
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        Descending
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section-table__body">
                            <div className="section-table__row drop-down-2">
                                <div className="section-table__param visible-on-mob">
                                    <span>1</span>
                                    <span>
											04/24/2023
										</span>
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    1
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    04/24/2023
                                </div>
                                <div className="section-table__param is-center">
                                    61x200495
                                </div>
                                <div className="section-table__param">
                                    Ukraine EE Building Certification Study
                                </div>
                                <div className="section-table__param">
                                    Present for the team`s Anniversary
                                </div>
                                <div className="section-table__param is-center">
                                    5000.00
                                </div>
                                <div className="drop-down-2__block">
                                    <ul className="drop-down-2__list">
                                        <li>
                                            <a href="#">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#edit"></use>
                                                </svg>
                                                Edit
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#remove-table-item-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#trash"></use>
                                                </svg>
                                                Delete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="section-table__row drop-down-2">
                                <div className="section-table__param visible-on-mob">
                                    <span>1</span>
                                    <span>
											04/24/2023
										</span>
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    1
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    04/24/2023
                                </div>
                                <div className="section-table__param is-center">
                                    61x200495
                                </div>
                                <div className="section-table__param">
                                    Ukraine EE Building Certification Study
                                </div>
                                <div className="section-table__param">
                                    Present for the team`s Anniversary
                                </div>
                                <div className="section-table__param is-center">
                                    5000.00
                                </div>
                                <div className="drop-down-2__block">
                                    <ul className="drop-down-2__list">
                                        <li>
                                            <a href="#">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#edit"></use>
                                                </svg>
                                                Edit
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#remove-table-item-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#trash"></use>
                                                </svg>
                                                Delete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="section-table__row drop-down-2">
                                <div className="section-table__param visible-on-mob">
                                    <span>1</span>
                                    <span>
											04/24/2023
										</span>
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    1
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    04/24/2023
                                </div>
                                <div className="section-table__param is-center">
                                    61x200495
                                </div>
                                <div className="section-table__param">
                                    Ukraine EE Building Certification Study
                                </div>
                                <div className="section-table__param">
                                    Present for the team`s Anniversary
                                </div>
                                <div className="section-table__param is-center">
                                    5000.00
                                </div>
                                <div className="drop-down-2__block">
                                    <ul className="drop-down-2__list">
                                        <li>
                                            <a href="#">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#edit"></use>
                                                </svg>
                                                Edit
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#remove-table-item-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#trash"></use>
                                                </svg>
                                                Delete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="section-table__row drop-down-2">
                                <div className="section-table__param visible-on-mob">
                                    <span>1</span>
                                    <span>
											04/24/2023
										</span>
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    1
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    04/24/2023
                                </div>
                                <div className="section-table__param is-center">
                                    61x200495
                                </div>
                                <div className="section-table__param">
                                    Ukraine EE Building Certification Study
                                </div>
                                <div className="section-table__param">
                                    Present for the team`s Anniversary
                                </div>
                                <div className="section-table__param is-center">
                                    5000.00
                                </div>
                                <div className="drop-down-2__block">
                                    <ul className="drop-down-2__list">
                                        <li>
                                            <a href="#">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#edit"></use>
                                                </svg>
                                                Edit
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#remove-table-item-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#trash"></use>
                                                </svg>
                                                Delete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="section-table__row drop-down-2">
                                <div className="section-table__param visible-on-mob">
                                    <span>1</span>
                                    <span>
											04/24/2023
										</span>
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    1
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    04/24/2023
                                </div>
                                <div className="section-table__param is-center">
                                    61x200495
                                </div>
                                <div className="section-table__param">
                                    Ukraine EE Building Certification Study
                                </div>
                                <div className="section-table__param">
                                    Present for the team`s Anniversary
                                </div>
                                <div className="section-table__param is-center">
                                    5000.00
                                </div>
                                <div className="drop-down-2__block">
                                    <ul className="drop-down-2__list">
                                        <li>
                                            <a href="#">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#edit"></use>
                                                </svg>
                                                Edit
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#remove-table-item-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#trash"></use>
                                                </svg>
                                                Delete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="section-table__row drop-down-2">
                                <div className="section-table__param visible-on-mob">
                                    <span>1</span>
                                    <span>
											04/24/2023
										</span>
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    1
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    04/24/2023
                                </div>
                                <div className="section-table__param is-center">
                                    61x200495
                                </div>
                                <div className="section-table__param">
                                    Ukraine EE Building Certification Study
                                </div>
                                <div className="section-table__param">
                                    Present for the team`s Anniversary
                                </div>
                                <div className="section-table__param is-center">
                                    5000.00
                                </div>
                                <div className="drop-down-2__block">
                                    <ul className="drop-down-2__list">
                                        <li>
                                            <a href="#">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#edit"></use>
                                                </svg>
                                                Edit
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#remove-table-item-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#trash"></use>
                                                </svg>
                                                Delete
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="section-table__row drop-down-2">
                                <div className="section-table__param visible-on-mob">
                                    <span>1</span>
                                    <span>
											04/24/2023
										</span>
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    1
                                </div>
                                <div className="section-table__param visible-on-desktop is-center">
                                    04/24/2023
                                </div>
                                <div className="section-table__param is-center">
                                    61x200495
                                </div>
                                <div className="section-table__param">
                                    Ukraine EE Building Certification Study
                                </div>
                                <div className="section-table__param">
                                    Present for the team`s Anniversary
                                </div>
                                <div className="section-table__param is-center">
                                    5000.00
                                </div>
                                <div className="drop-down-2__block">
                                    <ul className="drop-down-2__list">
                                        <li>
                                            <a href="#">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#edit"></use>
                                                </svg>
                                                Edit
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#remove-table-item-popup" className="open-popup">
                                                <svg width="15" height="16" viewBox="0 0 15 16">
                                                    <use xlinkHref="#trash"></use>
                                                </svg>
                                                Delete
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
                    <select name="row-per-page" className="section-table__row-per-page--select custom-select">
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
                    <select name="row-per-page" className="section-table__row-per-page--select custom-select">
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
