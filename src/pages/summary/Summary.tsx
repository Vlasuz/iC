import React, {useEffect} from 'react'
import {SummaryStyled} from "./Summary.styled";

interface ISummaryProps {

}

export const Summary: React.FC<ISummaryProps> = () => {

    return (
        <SummaryStyled className="summary">
            <div className="summary__header page-header">
                <div className="page-header__col">
                    <h1 className="page-header__title title">
                        Summary
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
                <div className="page-header__col">
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
                </div>
                <div className="page-header__col">
                    <div className="section-table__export drop-down is-right-default">
                        <button className="section-table__export--target drop-down__target" type="button">
                            Export All
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
            <div className="summary__main">
                <div className="summary-item">
                    <div className="summary-item__target">
                        <h2 className="summary-item__target--name">
                            October
                        </h2>
                        <div className="summary-item__target--status">
								<span>
									In progress
								</span>
                            <svg width="20" height="20" viewBox="0 0 20 20">
                                <use xlinkHref="#attention"></use>
                            </svg>
                        </div>
                        <button className="summary-item__target--toggle" type="button">
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
                                        <span data-value="9%">
                                            <span className="line" style={{width: "9%"}}></span>
                                        </span>
                                    </div>
                                    <div className="summary-item__element--progress">
                                        <span>5 000 UAH</span>
                                        <span data-value="2%">
                                            <span className="line" style={{width: "2%"}}></span>
                                        </span>
                                    </div>
                                </div>
                                <div className="summary-item__element">
                                    <h3 className="summary-item__element--name">61xA210739_Kremenchuk Bridge
                                        supervision</h3>
                                    <div className="summary-item__element--progress">
                                        <span>8 h</span>
                                        <span data-value="9%">
                                            <span className="line" style={{width: "9%"}}></span>
                                        </span>
                                    </div>
                                    <div className="summary-item__element--progress">
                                        <span>522 000 UAH</span>
                                        <span data-value="2%">
                                            <span className="line" style={{width: "2%"}}></span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="summary-item__total">
                                <b className="summary-item__total--title">
                                    Total
                                </b>
                                <div className="summary-item__total--element summary-item__total-element">
                                    <div className="summary-item__total-element--icon">
                                        <svg width="20" height="20" viewBox="0 0 13 13">
                                            <use xlinkHref="#time"></use>
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
                                        <svg width="20" height="20" viewBox="0 0 20 20">
                                            <use xlinkHref="#money"></use>
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

                                </div>
                                <div className="summary-item__footer--col">
                                    <button className="summary-item__button btn is-grey is-transparent" type="button">
                                        Export monthly summary
                                        <svg width="16" height="17" viewBox="0 0 16 17">
                                            <use xlinkHref="#download"></use>
                                        </svg>
                                    </button>
                                    <a href="#approve-timesheet-popup" className="summary-item__button btn open-popup"
                                       type="button">
                                        Send timesheet for approval
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="summary-item">
                    <div className="summary-item__target">
                        <h2 className="summary-item__target--name">
                            September
                        </h2>
                        <div className="summary-item__target--status is-danger">
								<span>
									03 / 09 / 2023
								</span>
                            <svg width="20" height="20" viewBox="0 0 20 20">
                                <use xlinkHref="#round-error"></use>
                            </svg>
                        </div>
                        <button className="summary-item__target--toggle" type="button">
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
                                        <span data-value="9%">
                                            <span className="line" style={{width: "9%"}}></span>
                                        </span>
                                    </div>
                                    <div className="summary-item__element--progress">
                                        <span>5 000 UAH</span>
                                        <span data-value="2%">
                                            <span className="line" style={{width: "2%"}}></span>
                                        </span>
                                    </div>
                                </div>
                                <div className="summary-item__element">
                                    <h3 className="summary-item__element--name">61xA210739_Kremenchuk Bridge
                                        supervision</h3>
                                    <div className="summary-item__element--progress">
                                        <span>8 h</span>
                                        <span data-value="9%">
                                            <span className="line" style={{width: "9%"}}></span>
                                        </span>
                                    </div>
                                    <div className="summary-item__element--progress">
                                        <span>522 000 UAH</span>
                                        <span data-value="2%">
                                            <span className="line" style={{width: "2%"}}></span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="summary-item__total">
                                <b className="summary-item__total--title">
                                    Total
                                </b>
                                <div className="summary-item__total--element summary-item__total-element">
                                    <div className="summary-item__total-element--icon">
                                        <svg width="20" height="20" viewBox="0 0 13 13">
                                            <use xlinkHref="#time"></use>
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
                                        <svg width="20" height="20" viewBox="0 0 20 20">
                                            <use xlinkHref="#money"></use>
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
                                    <div className="summary-item__message is-danger">
                                        <svg width="20" height="20" viewBox="0 0 13 13">
                                            <use xlinkHref="#round-error"></use>
                                        </svg>
                                        <p>Your timesheet was rejected. Please, correct and send for reapproval. (by
                                            Irina Omelianenko)</p>
                                    </div>
                                    <div className="summary-item__message is-waiting">
                                        <svg width="20" height="20" viewBox="0 0 13 13">
                                            <use xlinkHref="#time"></use>
                                        </svg>
                                        <p>You already sent this timesheet for reapproval. Please, wait for the
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
                                    <a href="#approve-timesheet-popup" className="summary-item__button btn open-popup"
                                       type="button">
                                        Send timesheet for approval
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="summary-item">
                    <div className="summary-item__target">
                        <h2 className="summary-item__target--name">
                            August
                        </h2>
                        <div className="summary-item__target--status is-waiting">
								<span>
									Sent for approval 05 / 08 / 2023
								</span>
                            <svg width="20" height="20" viewBox="0 0 20 20">
                                <use xlinkHref="#time"></use>
                            </svg>
                        </div>
                        <button className="summary-item__target--toggle" type="button">
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
                                        <span data-value="9%">
                                            <span className="line" style={{width: "9%"}}></span>
                                        </span>
                                    </div>
                                    <div className="summary-item__element--progress">
                                        <span>5 000 UAH</span>
                                        <span data-value="2%">
                                            <span className="line" style={{width: "2%"}}></span>
                                        </span>
                                    </div>
                                </div>
                                <div className="summary-item__element">
                                    <h3 className="summary-item__element--name">61xA210739_Kremenchuk Bridge
                                        supervision</h3>
                                    <div className="summary-item__element--progress">
                                        <span>8 h</span>
                                        <span data-value="9%">
                                            <span className="line" style={{width: "9%"}}></span>
                                        </span>
                                    </div>
                                    <div className="summary-item__element--progress">
                                        <span>522 000 UAH</span>
                                        <span data-value="2%">
                                            <span className="line" style={{width: "2%"}}></span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="summary-item__total">
                                <b className="summary-item__total--title">
                                    Total
                                </b>
                                <div className="summary-item__total--element summary-item__total-element">
                                    <div className="summary-item__total-element--icon">
                                        <svg width="20" height="20" viewBox="0 0 13 13">
                                            <use xlinkHref="#time"></use>
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
                                        <svg width="20" height="20" viewBox="0 0 20 20">
                                            <use xlinkHref="#money"></use>
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
                                       className="summary-item__button btn open-popup is-disabled" type="button">
                                        Send timesheet for approval
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="summary-item">
                    <div className="summary-item__target">
                        <h2 className="summary-item__target--name">
                            July
                        </h2>
                        <div className="summary-item__target--status is-waiting">
								<span>
									Sent for approval 05 / 08 / 2023
								</span>
                            <svg width="20" height="20" viewBox="0 0 20 20">
                                <use xlinkHref="#time"></use>
                            </svg>
                        </div>
                        <button className="summary-item__target--toggle" type="button">
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
                                        <span data-value="9%">
                                            <span className="line" style={{width: "9%"}}></span>
                                        </span>
                                    </div>
                                    <div className="summary-item__element--progress">
                                        <span>5 000 UAH</span>
                                        <span data-value="2%">
                                            <span className="line" style={{width: "2%"}}></span>
                                        </span>
                                    </div>
                                </div>
                                <div className="summary-item__element">
                                    <h3 className="summary-item__element--name">61xA210739_Kremenchuk Bridge
                                        supervision</h3>
                                    <div className="summary-item__element--progress">
                                        <span>8 h</span>
                                        <span data-value="9%">
                                            <span className="line" style={{width: "9%"}}></span>
                                        </span>
                                    </div>
                                    <div className="summary-item__element--progress">
                                        <span>522 000 UAH</span>
                                        <span data-value="2%">
                                            <span className="line" style={{width: "2%"}}></span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="summary-item__total">
                                <b className="summary-item__total--title">
                                    Total
                                </b>
                                <div className="summary-item__total--element summary-item__total-element">
                                    <div className="summary-item__total-element--icon">
                                        <svg width="20" height="20" viewBox="0 0 13 13">
                                            <use xlinkHref="#time"></use>
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
                                        <svg width="20" height="20" viewBox="0 0 20 20">
                                            <use xlinkHref="#money"></use>
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

                                </div>
                                <div className="summary-item__footer--col">
                                    <button className="summary-item__button btn is-grey is-transparent" type="button">
                                        Export monthly summary
                                        <svg width="16" height="17" viewBox="0 0 16 17">
                                            <use xlinkHref="#download"></use>
                                        </svg>
                                    </button>
                                    <a href="#approve-timesheet-popup" className="summary-item__button btn open-popup"
                                       type="button">
                                        Send timesheet for approval
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="summary-item">
                    <div className="summary-item__target">
                        <h2 className="summary-item__target--name">
                            June
                        </h2>
                        <div className="summary-item__target--status is-success">
								<span>
									03 / 06 / 2023
								</span>
                            <svg width="20" height="20" viewBox="0 0 20 20">
                                <use xlinkHref="#round-check"></use>
                            </svg>
                        </div>
                        <button className="summary-item__target--toggle" type="button">
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
                                        <span data-value="9%">
                                            <span className="line" style={{width: "9%"}}></span>
                                        </span>
                                    </div>
                                    <div className="summary-item__element--progress">
                                        <span>5 000 UAH</span>
                                        <span data-value="2%">
                                            <span className="line" style={{width: "2%"}}></span>
                                        </span>
                                    </div>
                                </div>
                                <div className="summary-item__element">
                                    <h3 className="summary-item__element--name">61xA210739_Kremenchuk Bridge
                                        supervision</h3>
                                    <div className="summary-item__element--progress">
                                        <span>8 h</span>
                                        <span data-value="9%">
                                            <span className="line" style={{width: "9%"}}></span>
                                        </span>
                                    </div>
                                    <div className="summary-item__element--progress">
                                        <span>522 000 UAH</span>
                                        <span data-value="2%">
                                            <span className="line" style={{width: "2%"}}></span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="summary-item__total">
                                <b className="summary-item__total--title">
                                    Total
                                </b>
                                <div className="summary-item__total--element summary-item__total-element">
                                    <div className="summary-item__total-element--icon">
                                        <svg width="20" height="20" viewBox="0 0 13 13">
                                            <use xlinkHref="#time"></use>
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
                                        <svg width="20" height="20" viewBox="0 0 20 20">
                                            <use xlinkHref="#money"></use>
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
                                       className="summary-item__button btn open-popup is-disabled" type="button">
                                        Send timesheet for approval
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SummaryStyled>
    )
}
