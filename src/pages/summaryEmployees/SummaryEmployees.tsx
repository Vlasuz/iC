import React, {useEffect} from 'react'

interface ISummaryEmployeesProps {

}

export const SummaryEmployees: React.FC<ISummaryEmployeesProps> = () => {

    return (
        <section className="summary">
            <div className="summary__header page-header">
                <div className="page-header__col">
                    <h1 className="page-header__title title">
                        Summary / Employees
                    </h1>
                </div>
                <div className="page-header__col">
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
                                                    No problems, take your time. Don’t forget please about the fact that
                                                    19th was weekend
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
                                                    No problems, take your time. Don’t forget please about the fact that
                                                    19th was weekend
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
                                                    No problems, take your time. Don’t forget please about the fact that
                                                    19th was weekend
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
                <form className="page-header__row employees-row">
                    <div className="section-table__change-full-date drop-down employees-row__date">
                        <button className="section-table__change-full-date--target drop-down__target" type="button">
                            <span>April, 2023</span>
                            <svg width="10" height="7" viewBox="0 0 10 7"
                                 className="section-table__change-full-date--target-arrow drop-down__target--arrow">
                                <use xlinkHref="#drop-down-arrow"></use>
                            </svg>
                        </button>
                        <div className="section-table__change-full-date--block drop-down__block" style={{minWidth: "250px"}}>
                            <div className="section-table__change-full-date--months">
                                <ul>
                                    <li>
                                        <label>
                                            <input type="radio" name="month" value="1" checked />
                                                <span>January</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" name="month" value="7"/>
                                                <span>July</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" name="month" value="2"/>
                                                <span>February</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" name="month" value="8"/>
                                                <span>August</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" name="month" value="3"/>
                                                <span>March</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" name="month" value="9"/>
                                                <span>September</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" name="month" value="4"/>
                                                <span>April</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" name="month" value="10"/>
                                                <span>October</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" name="month" value="5"/>
                                                <span>May</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" name="month" value="11"/>
                                                <span>November</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" name="month" value="6"/>
                                                <span>June</span>
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input type="radio" name="month" value="12"/>
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
                                                <input type="radio" name="year" value="2023" checked />
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
                    <div className="employees-row__projects drop-down-absolute">
                        <button className="employees-row__projects--target drop-down-absolute__target"
                                data-drop-down-target="choose-project" type="button">
                            <span>Choose project</span>
                            <svg width="10" height="7" viewBox="0 0 10 7"
                                 className="employees-row__projects--target-arrow drop-down-absolute__target--arrow">
                                <use xlinkHref="#drop-down-arrow"></use>
                            </svg>
                        </button>
                        <div className="employees-row__projects--block drop-down-absolute__block" id="choose-project">
                            <div className="project-popup">
                                <div className="project-popup__body" data-simplebar data-simplebar-auto-hide="false">
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
                                <div className="project-popup__search">
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="employees-row__search">
                        <div className="section-table__search is-alternative">
                            <label className="section-table__search--label">
                                <input type="search" required name="search" placeholder="Search an employee"
                                       className="section-table__search--input" />
                            </label>
                            <button className="section-table__search--submit btn is-grey is-min-on-mob" type="submit">
                                Search
                                <svg width="15" height="15" viewBox="0 0 15 15">
                                    <use xlinkHref="#search"></use>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="page-header__select employees-row__sort">
                        <select name="sort" className="custom-select">
                            <option value="Pending first ">Pending first</option>
                            <option value="Rejected first ">Rejected first</option>
                            <option value="Approved first ">Approved first</option>
                        </select>
                    </div>
                    <div className="section-table__export is-min page-header__export drop-down is-right-default">
                        <button className="section-table__export--target drop-down__target" type="button">
                            Export all
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
                </form>
            </div>
            <div className="summary__main">
                <div className="summary-item">
                    <div className="summary-item__target">
                        <div className="summary-item__target--user summary-item__user">
                            <a href="index.html" className="summary-item__user--avatar">
                                <picture>
                                    <source srcSet="img/profile-avatar.avif" type="image/avif"/>
                                        <source srcSet="img/profile-avatar.webp" type="image/webp"/>
                                            <img src="img/profile-avatar.jpg" alt="" width="60" height="60"
                                                 loading="lazy"/>
                                </picture>
                            </a>
                            <div className="summary-item__user--info">
                                <h2 className="summary-item__user--name">Olena Rybak</h2>
                                <span className="summary-item__user--position">
										Managing director
									</span>
                            </div>
                            <button type="button" className="summary-item__user--favorite is-active">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <use xlinkHref="#star"></use>
                                </svg>
                            </button>
                        </div>
                        <div className="summary-item__target--status">
								<span>
									In progress
								</span>
                            <svg width="20" height="20" viewBox="0 0 20 20">
                                <use xlinkHref="#attention"></use>
                            </svg>
                        </div>
                        <button type="button" className="summary-item__target--toggle">
                            <svg width="10" height="7" viewBox="0 0 10 7" className="summary-item__target--arrow">
                                <use xlinkHref="#drop-down-arrow"></use>
                            </svg>
                        </button>
                    </div>
                    <div className="summary-item__block">
                        <div>
                            <div className="summary-item__elements-list">
                                <div className="summary-item__element">
                                    <h3 className="summary-item__element--name">61xA210739_Kremenchuk Bridge
                                        supervision</h3>
                                    <div className="summary-item__element--progress">
                                        <span>18 h</span>
                                        <span data-value="9%"></span>
                                    </div>
                                    <div className="summary-item__element--progress">
                                        <span>5 000 UAH</span>
                                        <span data-value="2%"></span>
                                    </div>
                                </div>
                                <div className="summary-item__element">
                                    <h3 className="summary-item__element--name">61xA210739_Kremenchuk Bridge
                                        supervision</h3>
                                    <div className="summary-item__element--progress">
                                        <span>8 h</span>
                                        <span data-value="9%"></span>
                                    </div>
                                    <div className="summary-item__element--progress">
                                        <span>522 000 UAH</span>
                                        <span data-value="2%"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="summary-item__total">
                                <b className="summary-item__total--title">
                                    Total
                                </b>
                                <div className="summary-item__total--element summary-item__total-element">
                                    <div className="summary-item__total-element--icon">
                                        <svg width="22" height="22" viewBox="0 0 22 22">
                                            <use xlinkHref="#time-2"></use>
                                        </svg>
                                    </div>
                                    <b className="summary-item__total-element--name">
                                        Time spent for projects
                                    </b>
                                    <a href="#" className="summary-item__total-element--link">
                                        Show full data
                                        <svg width="7" height="10" viewBox="0 0 7 10">
                                            <use xlinkHref="#arrow-next"></use>
                                        </svg>
                                    </a>
                                    <div className="summary-item__total-element--value">
                                        90 hours
                                    </div>
                                </div>
                                <div className="summary-item__total--element summary-item__total-element">
                                    <div className="summary-item__total-element--icon">
                                        <svg width="22" height="22" viewBox="0 0 22 22">
                                            <use xlinkHref="#money-2"></use>
                                        </svg>
                                    </div>
                                    <b className="summary-item__total-element--name">
                                        Time spent for projects
                                    </b>
                                    <a href="#" className="summary-item__total-element--link">
                                        Show full data
                                        <svg width="7" height="10" viewBox="0 0 7 10">
                                            <use xlinkHref="#arrow-next"></use>
                                        </svg>
                                    </a>
                                    <div className="summary-item__total-element--value">
                                        210 000 UAH
                                    </div>
                                </div>
                            </div>
                            <div className="summary-item__footer">
                                <div className="summary-item__footer--col">
                                    <div className="summary-item__message">
                                        <svg width="20" height="20" viewBox="0 0 13 13">
                                            <use xlinkHref="#attention"></use>
                                        </svg>
                                        <p>This summary already rejected by Irina Omelianenko on 03/05/2023.</p>
                                    </div>
                                </div>
                                <div className="summary-item__footer--col">
                                    <button className="summary-item__button btn is-grey is-transparent" type="button">
                                        Export monthly summary
                                        <svg width="16" height="17" viewBox="0 0 16 17">
                                            <use xlinkHref="#download"></use>
                                        </svg>
                                    </button>
                                    <a href="#" className="summary-item__button btn open-popup is-grey" type="button">
                                        Change decision
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="summary-item">
                    <div className="summary-item__target">
                        <div className="summary-item__target--user summary-item__user">
                            <a href="index.html" className="summary-item__user--avatar">
                                <picture>
                                    <source srcSet="img/profile-avatar.avif" type="image/avif"/>
                                        <source srcSet="img/profile-avatar.webp" type="image/webp"/>
                                            <img src="img/profile-avatar.jpg" alt="" width="60" height="60"
                                                 loading="lazy"/>
                                </picture>
                            </a>
                            <div className="summary-item__user--info">
                                <h2 className="summary-item__user--name">Olena Rybak</h2>
                                <span className="summary-item__user--position">
										Managing director
									</span>
                            </div>
                            <button type="button" className="summary-item__user--favorite is-active">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <use xlinkHref="#star"></use>
                                </svg>
                            </button>
                        </div>
                        <div className="summary-item__target--status">
								<span>
									In progress
								</span>
                            <svg width="20" height="20" viewBox="0 0 20 20">
                                <use xlinkHref="#attention"></use>
                            </svg>
                        </div>
                        <button type="button" className="summary-item__target--toggle">
                            <svg width="10" height="7" viewBox="0 0 10 7" className="summary-item__target--arrow">
                                <use xlinkHref="#drop-down-arrow"></use>
                            </svg>
                        </button>
                    </div>
                    <div className="summary-item__block">
                        <div>
                            <div className="summary-item__elements-list">
                                <div className="summary-item__element">
                                    <h3 className="summary-item__element--name">61xA210739_Kremenchuk Bridge
                                        supervision</h3>
                                    <div className="summary-item__element--progress">
                                        <span>18 h</span>
                                        <span data-value="9%"></span>
                                    </div>
                                    <div className="summary-item__element--progress">
                                        <span>5 000 UAH</span>
                                        <span data-value="2%"></span>
                                    </div>
                                </div>
                                <div className="summary-item__element">
                                    <h3 className="summary-item__element--name">61xA210739_Kremenchuk Bridge
                                        supervision</h3>
                                    <div className="summary-item__element--progress">
                                        <span>8 h</span>
                                        <span data-value="9%"></span>
                                    </div>
                                    <div className="summary-item__element--progress">
                                        <span>522 000 UAH</span>
                                        <span data-value="2%"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="summary-item__total">
                                <b className="summary-item__total--title">
                                    Total
                                </b>
                                <div className="summary-item__total--element summary-item__total-element">
                                    <div className="summary-item__total-element--icon">
                                        <svg width="22" height="22" viewBox="0 0 22 22">
                                            <use xlinkHref="#time-2"></use>
                                        </svg>
                                    </div>
                                    <b className="summary-item__total-element--name">
                                        Time spent for projects
                                    </b>
                                    <a href="#" className="summary-item__total-element--link">
                                        Show full data
                                        <svg width="7" height="10" viewBox="0 0 7 10">
                                            <use xlinkHref="#arrow-next"></use>
                                        </svg>
                                    </a>
                                    <div className="summary-item__total-element--value">
                                        90 hours
                                    </div>
                                </div>
                                <div className="summary-item__total--element summary-item__total-element">
                                    <div className="summary-item__total-element--icon">
                                        <svg width="22" height="22" viewBox="0 0 22 22">
                                            <use xlinkHref="#money-2"></use>
                                        </svg>
                                    </div>
                                    <b className="summary-item__total-element--name">
                                        Time spent for projects
                                    </b>
                                    <a href="#" className="summary-item__total-element--link">
                                        Show full data
                                        <svg width="7" height="10" viewBox="0 0 7 10">
                                            <use xlinkHref="#arrow-next"></use>
                                        </svg>
                                    </a>
                                    <div className="summary-item__total-element--value">
                                        210 000 UAH
                                    </div>
                                </div>
                            </div>
                            <div className="summary-item__footer add-cols">
                                <div className="summary-item__footer--col">

                                </div>
                                <div className="summary-item__footer--col">
                                    <button className="summary-item__button btn is-grey is-transparent" type="button">
                                        Export monthly summary
                                        <svg width="16" height="17" viewBox="0 0 16 17">
                                            <use xlinkHref="#download"></use>
                                        </svg>
                                    </button>
                                    <a href="#approve-timesheet-popup"
                                       className="summary-item__button btn open-popup is-success" type="button">
                                        Approved
                                        <svg width="16" height="17" viewBox="0 0 20 20">
                                            <use xlinkHref="#round-check"></use>
                                        </svg>
                                    </a>
                                    <a href="#rejected-timesheet-popup"
                                       className="summary-item__button btn is-error open-popup" type="button">
                                        Rejected
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="summary-item">
                    <div className="summary-item__target">
                        <div className="summary-item__target--user summary-item__user">
                            <a href="index.html" className="summary-item__user--avatar">
                                <picture>
                                    <source srcSet="img/profile-avatar.avif" type="image/avif"/>
                                        <source srcSet="img/profile-avatar.webp" type="image/webp"/>
                                            <img src="img/profile-avatar.jpg" alt="" width="60" height="60"
                                                 loading="lazy"/>
                                </picture>
                            </a>
                            <div className="summary-item__user--info">
                                <h2 className="summary-item__user--name">Irina Omelianenko</h2>
                                <span className="summary-item__user--position">
										Managing director
									</span>
                            </div>
                            <button type="button" className="summary-item__user--favorite is-active">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <use xlinkHref="#star"></use>
                                </svg>
                            </button>
                        </div>
                        <div className="summary-item__target--status is-danger">
								<span>
									03 / 09 / 2023
								</span>
                            <svg width="20" height="20" viewBox="0 0 20 20">
                                <use xlinkHref="#round-error"></use>
                            </svg>
                        </div>
                        <button type="button" className="summary-item__target--toggle">
                            <svg width="10" height="7" viewBox="0 0 10 7" className="summary-item__target--arrow">
                                <use xlinkHref="#drop-down-arrow"></use>
                            </svg>
                        </button>
                    </div>
                    <div className="summary-item__block">
                        <div>
                            <div className="summary-item__elements-list">
                                <div className="summary-item__element">
                                    <h3 className="summary-item__element--name">61xA210739_Kremenchuk Bridge
                                        supervision</h3>
                                    <div className="summary-item__element--progress">
                                        <span>18 h</span>
                                        <span data-value="9%"></span>
                                    </div>
                                    <div className="summary-item__element--progress">
                                        <span>5 000 UAH</span>
                                        <span data-value="2%"></span>
                                    </div>
                                </div>
                                <div className="summary-item__element">
                                    <h3 className="summary-item__element--name">61xA210739_Kremenchuk Bridge
                                        supervision</h3>
                                    <div className="summary-item__element--progress">
                                        <span>8 h</span>
                                        <span data-value="9%"></span>
                                    </div>
                                    <div className="summary-item__element--progress">
                                        <span>522 000 UAH</span>
                                        <span data-value="2%"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="summary-item__total">
                                <b className="summary-item__total--title">
                                    Total
                                </b>
                                <div className="summary-item__total--element summary-item__total-element">
                                    <div className="summary-item__total-element--icon">
                                        <svg width="22" height="22" viewBox="0 0 22 22">
                                            <use xlinkHref="#time-2"></use>
                                        </svg>
                                    </div>
                                    <b className="summary-item__total-element--name">
                                        Time spent for projects
                                    </b>
                                    <a href="#" className="summary-item__total-element--link">
                                        Show full data
                                        <svg width="7" height="10" viewBox="0 0 7 10">
                                            <use xlinkHref="#arrow-next"></use>
                                        </svg>
                                    </a>
                                    <div className="summary-item__total-element--value">
                                        90 hours
                                    </div>
                                </div>
                                <div className="summary-item__total--element summary-item__total-element">
                                    <div className="summary-item__total-element--icon">
                                        <svg width="22" height="22" viewBox="0 0 22 22">
                                            <use xlinkHref="#money-2"></use>
                                        </svg>
                                    </div>
                                    <b className="summary-item__total-element--name">
                                        Time spent for projects
                                    </b>
                                    <a href="#" className="summary-item__total-element--link">
                                        Show full data
                                        <svg width="7" height="10" viewBox="0 0 7 10">
                                            <use xlinkHref="#arrow-next"></use>
                                        </svg>
                                    </a>
                                    <div className="summary-item__total-element--value">
                                        210 000 UAH
                                    </div>
                                </div>
                            </div>
                            <div className="summary-item__footer add-cols">
                                <div className="summary-item__footer--col">
                                    <div className="summary-item__message is-danger">
                                        <svg width="20" height="20" viewBox="0 0 13 13">
                                            <use xlinkHref="#round-error"></use>
                                        </svg>
                                        <p>This summary already rejected by Irina Omelianenko on 03/05/2023.</p>
                                    </div>
                                </div>
                                <div className="summary-item__footer--col">
                                    <button className="summary-item__button btn is-grey is-transparent" type="button">
                                        Export monthly summary
                                        <svg width="16" height="17" viewBox="0 0 16 17">
                                            <use xlinkHref="#download"></use>
                                        </svg>
                                    </button>
                                    <a href="#approve-timesheet-popup"
                                       className="summary-item__button btn open-popup is-success" type="button">
                                        Approved
                                        <svg width="16" height="17" viewBox="0 0 20 20">
                                            <use xlinkHref="#round-check"></use>
                                        </svg>
                                    </a>
                                    <a href="#rejected-timesheet-popup"
                                       className="summary-item__button btn is-error open-popup" type="button">
                                        Rejected
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="summary-item">
                    <div className="summary-item__target">
                        <div className="summary-item__target--user summary-item__user">
                            <a href="index.html" className="summary-item__user--avatar">
                                <picture>
                                    <source srcSet="img/profile-avatar.avif" type="image/avif"/>
                                        <source srcSet="img/profile-avatar.webp" type="image/webp"/>
                                            <img src="img/profile-avatar.jpg" alt="" width="60" height="60"
                                                 loading="lazy"/>
                                </picture>
                            </a>
                            <div className="summary-item__user--info">
                                <h2 className="summary-item__user--name">Dmytro Ocheretyanyi</h2>
                                <span className="summary-item__user--position">
										Managing director
									</span>
                            </div>
                            <button type="button" className="summary-item__user--favorite">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <use xlinkHref="#star"></use>
                                </svg>
                            </button>
                        </div>
                        <div className="summary-item__target--status is-waiting">
								<span>
									Sent for approval 05 / 08 / 2023
								</span>
                            <svg width="20" height="20" viewBox="0 0 20 20">
                                <use xlinkHref="#time"></use>
                            </svg>
                        </div>
                        <button type="button" className="summary-item__target--toggle">
                            <svg width="10" height="7" viewBox="0 0 10 7" className="summary-item__target--arrow">
                                <use xlinkHref="#drop-down-arrow"></use>
                            </svg>
                        </button>
                    </div>
                    <div className="summary-item__block">
                        <div>
                            <div className="summary-item__elements-list">
                                <div className="summary-item__element">
                                    <h3 className="summary-item__element--name">61xA210739_Kremenchuk Bridge
                                        supervision</h3>
                                    <div className="summary-item__element--progress">
                                        <span>18 h</span>
                                        <span data-value="9%"></span>
                                    </div>
                                    <div className="summary-item__element--progress">
                                        <span>5 000 UAH</span>
                                        <span data-value="2%"></span>
                                    </div>
                                </div>
                                <div className="summary-item__element">
                                    <h3 className="summary-item__element--name">61xA210739_Kremenchuk Bridge
                                        supervision</h3>
                                    <div className="summary-item__element--progress">
                                        <span>8 h</span>
                                        <span data-value="9%"></span>
                                    </div>
                                    <div className="summary-item__element--progress">
                                        <span>522 000 UAH</span>
                                        <span data-value="2%"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="summary-item__total">
                                <b className="summary-item__total--title">
                                    Total
                                </b>
                                <div className="summary-item__total--element summary-item__total-element">
                                    <div className="summary-item__total-element--icon">
                                        <svg width="22" height="22" viewBox="0 0 22 22">
                                            <use xlinkHref="#time-2"></use>
                                        </svg>
                                    </div>
                                    <b className="summary-item__total-element--name">
                                        Time spent for projects
                                    </b>
                                    <a href="#" className="summary-item__total-element--link">
                                        Show full data
                                        <svg width="7" height="10" viewBox="0 0 7 10">
                                            <use xlinkHref="#arrow-next"></use>
                                        </svg>
                                    </a>
                                    <div className="summary-item__total-element--value">
                                        90 hours
                                    </div>
                                </div>
                                <div className="summary-item__total--element summary-item__total-element">
                                    <div className="summary-item__total-element--icon">
                                        <svg width="22" height="22" viewBox="0 0 22 22">
                                            <use xlinkHref="#money-2"></use>
                                        </svg>
                                    </div>
                                    <b className="summary-item__total-element--name">
                                        Time spent for projects
                                    </b>
                                    <a href="#" className="summary-item__total-element--link">
                                        Show full data
                                        <svg width="7" height="10" viewBox="0 0 7 10">
                                            <use xlinkHref="#arrow-next"></use>
                                        </svg>
                                    </a>
                                    <div className="summary-item__total-element--value">
                                        210 000 UAH
                                    </div>
                                </div>
                            </div>
                            <div className="summary-item__footer add-cols">
                                <div className="summary-item__footer--col">
                                    <div className="summary-item__message is-waiting">
                                        <svg width="20" height="20" viewBox="0 0 13 13">
                                            <use xlinkHref="#time"></use>
                                        </svg>
                                        <p>You already sent this timesheet for approval. Please, wait for the
                                            answer.</p>
                                    </div>
                                </div>
                                <div className="summary-item__footer--col">
                                    <button className="summary-item__button btn is-grey is-transparent" type="button">
                                        Export monthly summary
                                        <svg width="16" height="17" viewBox="0 0 16 17">
                                            <use xlinkHref="#download"></use>
                                        </svg>
                                    </button>
                                    <a href="#approve-timesheet-popup"
                                       className="summary-item__button btn open-popup is-success is-disabled"
                                       type="button">
                                        Approved
                                        <svg width="16" height="17" viewBox="0 0 20 20">
                                            <use xlinkHref="#round-check"></use>
                                        </svg>
                                    </a>
                                    <a href="#rejected-timesheet-popup"
                                       className="summary-item__button btn is-error open-popup is-disabled"
                                       type="button">
                                        Rejected
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="summary-item">
                    <div className="summary-item__target">
                        <div className="summary-item__target--user summary-item__user">
                            <a href="index.html" className="summary-item__user--avatar">
                                <picture>
                                    <source srcSet="img/profile-avatar.avif" type="image/avif"/>
                                        <source srcSet="img/profile-avatar.webp" type="image/webp"/>
                                            <img src="img/profile-avatar.jpg" alt="" width="60" height="60"
                                                 loading="lazy"/>
                                </picture>
                            </a>
                            <div className="summary-item__user--info">
                                <h2 className="summary-item__user--name">Vitaliy Shapovalenko</h2>
                                <span className="summary-item__user--position">
										Managing director
									</span>
                            </div>
                            <button type="button" className="summary-item__user--favorite">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <use xlinkHref="#star"></use>
                                </svg>
                            </button>
                        </div>
                        <div className="summary-item__target--status is-waiting">
								<span>
									Sent for approval 05 / 08 / 2023
								</span>
                            <svg width="20" height="20" viewBox="0 0 20 20">
                                <use xlinkHref="#time"></use>
                            </svg>
                        </div>
                        <button type="button" className="summary-item__target--toggle">
                            <svg width="10" height="7" viewBox="0 0 10 7" className="summary-item__target--arrow">
                                <use xlinkHref="#drop-down-arrow"></use>
                            </svg>
                        </button>
                    </div>
                    <div className="summary-item__block">
                        <div>
                            <div className="summary-item__elements-list">
                                <div className="summary-item__element">
                                    <h3 className="summary-item__element--name">61xA210739_Kremenchuk Bridge
                                        supervision</h3>
                                    <div className="summary-item__element--progress">
                                        <span>18 h</span>
                                        <span data-value="9%"></span>
                                    </div>
                                    <div className="summary-item__element--progress">
                                        <span>5 000 UAH</span>
                                        <span data-value="2%"></span>
                                    </div>
                                </div>
                                <div className="summary-item__element">
                                    <h3 className="summary-item__element--name">61xA210739_Kremenchuk Bridge
                                        supervision</h3>
                                    <div className="summary-item__element--progress">
                                        <span>8 h</span>
                                        <span data-value="9%"></span>
                                    </div>
                                    <div className="summary-item__element--progress">
                                        <span>522 000 UAH</span>
                                        <span data-value="2%"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="summary-item__total">
                                <b className="summary-item__total--title">
                                    Total
                                </b>
                                <div className="summary-item__total--element summary-item__total-element">
                                    <div className="summary-item__total-element--icon">
                                        <svg width="22" height="22" viewBox="0 0 22 22">
                                            <use xlinkHref="#time-2"></use>
                                        </svg>
                                    </div>
                                    <b className="summary-item__total-element--name">
                                        Time spent for projects
                                    </b>
                                    <a href="#" className="summary-item__total-element--link">
                                        Show full data
                                        <svg width="7" height="10" viewBox="0 0 7 10">
                                            <use xlinkHref="#arrow-next"></use>
                                        </svg>
                                    </a>
                                    <div className="summary-item__total-element--value">
                                        90 hours
                                    </div>
                                </div>
                                <div className="summary-item__total--element summary-item__total-element">
                                    <div className="summary-item__total-element--icon">
                                        <svg width="22" height="22" viewBox="0 0 22 22">
                                            <use xlinkHref="#money-2"></use>
                                        </svg>
                                    </div>
                                    <b className="summary-item__total-element--name">
                                        Time spent for projects
                                    </b>
                                    <a href="#" className="summary-item__total-element--link">
                                        Show full data
                                        <svg width="7" height="10" viewBox="0 0 7 10">
                                            <use xlinkHref="#arrow-next"></use>
                                        </svg>
                                    </a>
                                    <div className="summary-item__total-element--value">
                                        210 000 UAH
                                    </div>
                                </div>
                            </div>
                            <div className="summary-item__footer add-cols">
                                <div className="summary-item__footer--col">

                                </div>
                                <div className="summary-item__footer--col">
                                    <button className="summary-item__button btn is-grey is-transparent" type="button">
                                        Export monthly summary
                                        <svg width="16" height="17" viewBox="0 0 16 17">
                                            <use xlinkHref="#download"></use>
                                        </svg>
                                    </button>
                                    <a href="#approve-timesheet-popup"
                                       className="summary-item__button btn open-popup is-success" type="button">
                                        Approved
                                        <svg width="16" height="17" viewBox="0 0 20 20">
                                            <use xlinkHref="#round-check"></use>
                                        </svg>
                                    </a>
                                    <a href="#rejected-timesheet-popup"
                                       className="summary-item__button btn is-error open-popup" type="button">
                                        Rejected
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="summary-item">
                    <div className="summary-item__target">
                        <div className="summary-item__target--user summary-item__user">
                            <a href="index.html" className="summary-item__user--avatar">
                                <picture>
                                    <source srcSet="img/profile-avatar.avif" type="image/avif"/>
                                        <source srcSet="img/profile-avatar.webp" type="image/webp"/>
                                            <img src="img/profile-avatar.jpg" alt="" width="60" height="60"
                                                 loading="lazy"/>
                                </picture>
                            </a>
                            <div className="summary-item__user--info">
                                <h2 className="summary-item__user--name">Andreas Helbl</h2>
                                <span className="summary-item__user--position">
										Managing director
									</span>
                            </div>
                            <button type="button" className="summary-item__user--favorite">
                                <svg width="20" height="20" viewBox="0 0 20 20">
                                    <use xlinkHref="#star"></use>
                                </svg>
                            </button>
                        </div>
                        <div className="summary-item__target--status is-success">
								<span>
									03 / 06 / 2023
								</span>
                            <svg width="20" height="20" viewBox="0 0 20 20">
                                <use xlinkHref="#round-check"></use>
                            </svg>
                        </div>
                        <button type="button" className="summary-item__target--toggle">
                            <svg width="10" height="7" viewBox="0 0 10 7" className="summary-item__target--arrow">
                                <use xlinkHref="#drop-down-arrow"></use>
                            </svg>
                        </button>
                    </div>
                    <div className="summary-item__block">
                        <div>
                            <div className="summary-item__elements-list">
                                <div className="summary-item__element">
                                    <h3 className="summary-item__element--name">61xA210739_Kremenchuk Bridge
                                        supervision</h3>
                                    <div className="summary-item__element--progress">
                                        <span>18 h</span>
                                        <span data-value="9%"></span>
                                    </div>
                                    <div className="summary-item__element--progress">
                                        <span>5 000 UAH</span>
                                        <span data-value="2%"></span>
                                    </div>
                                </div>
                                <div className="summary-item__element">
                                    <h3 className="summary-item__element--name">61xA210739_Kremenchuk Bridge
                                        supervision</h3>
                                    <div className="summary-item__element--progress">
                                        <span>8 h</span>
                                        <span data-value="9%"></span>
                                    </div>
                                    <div className="summary-item__element--progress">
                                        <span>522 000 UAH</span>
                                        <span data-value="2%"></span>
                                    </div>
                                </div>
                            </div>
                            <div className="summary-item__total">
                                <b className="summary-item__total--title">
                                    Total
                                </b>
                                <div className="summary-item__total--element summary-item__total-element">
                                    <div className="summary-item__total-element--icon">
                                        <svg width="22" height="22" viewBox="0 0 22 22">
                                            <use xlinkHref="#time-2"></use>
                                        </svg>
                                    </div>
                                    <b className="summary-item__total-element--name">
                                        Time spent for projects
                                    </b>
                                    <a href="#" className="summary-item__total-element--link">
                                        Show full data
                                        <svg width="7" height="10" viewBox="0 0 7 10">
                                            <use xlinkHref="#arrow-next"></use>
                                        </svg>
                                    </a>
                                    <div className="summary-item__total-element--value">
                                        90 hours
                                    </div>
                                </div>
                                <div className="summary-item__total--element summary-item__total-element">
                                    <div className="summary-item__total-element--icon">
                                        <svg width="22" height="22" viewBox="0 0 22 22">
                                            <use xlinkHref="#money-2"></use>
                                        </svg>
                                    </div>
                                    <b className="summary-item__total-element--name">
                                        Time spent for projects
                                    </b>
                                    <a href="#" className="summary-item__total-element--link">
                                        Show full data
                                        <svg width="7" height="10" viewBox="0 0 7 10">
                                            <use xlinkHref="#arrow-next"></use>
                                        </svg>
                                    </a>
                                    <div className="summary-item__total-element--value">
                                        210 000 UAH
                                    </div>
                                </div>
                            </div>
                            <div className="summary-item__footer add-cols">
                                <div className="summary-item__footer--col">
                                    <div className="summary-item__message is-success">
                                        <svg width="20" height="20" viewBox="0 0 13 13">
                                            <use xlinkHref="#round-check"></use>
                                        </svg>
                                        <p>Your summary was approved! (by Irina Omelianenko)</p>
                                    </div>
                                </div>
                                <div className="summary-item__footer--col">
                                    <button className="summary-item__button btn is-grey is-transparent" type="button">
                                        Export monthly summary
                                        <svg width="16" height="17" viewBox="0 0 16 17">
                                            <use xlinkHref="#download"></use>
                                        </svg>
                                    </button>
                                    <a href="#approve-timesheet-popup"
                                       className="summary-item__button btn open-popup is-success is-disabled"
                                       type="button">
                                        Approved
                                        <svg width="16" height="17" viewBox="0 0 20 20">
                                            <use xlinkHref="#round-check"></use>
                                        </svg>
                                    </a>
                                    <a href="#rejected-timesheet-popup"
                                       className="summary-item__button btn is-error open-popup is-disabled"
                                       type="button">
                                        Rejected
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="summary__footer page-footer">
                <div className="page-footer__row-per-page visible-on-mob">
                    <span>Rows per page:</span>
                    <select name="row-per-page" className="page-footer__row-per-page--select custom-select">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="40">40</option>
                        <option value="all">All</option>
                    </select>
                </div>
                <button className="page-footer__see-more btn" type="button">
                    Show more
                    <svg width="15" height="15" viewBox="0 0 15 15">
                        <use xlinkHref="#arrow-down"></use>
                    </svg>
                </button>
                <div className="page-footer__row-per-page visible-on-desktop">
                    <span>Rows per page:</span>
                    <select name="row-per-page" className="page-footer__row-per-page--select custom-select">
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
