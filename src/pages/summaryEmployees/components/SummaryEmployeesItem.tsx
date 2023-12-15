import React, {useEffect, useState} from 'react'

import userPhoto from "./../../../assets/html/img/profile-avatar.jpg"

interface ISummaryEmployeesItemProps {

}

export const SummaryEmployeesItem: React.FC<ISummaryEmployeesItemProps> = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)

    const handleFavorite = () => {
        setIsOpen(prev => !prev)
        setIsFavorite(prev => !prev)
    }

    const handleOpenItem = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <div className={`summary-item ${isOpen && "is-active"}`}>
            <div onClick={handleOpenItem} className="summary-item__target">
                <div className="summary-item__target--user summary-item__user">
                    <a href="index.html" className="summary-item__user--avatar">
                        <picture>
                            <img src={userPhoto} alt="" width="60" height="60" loading="lazy"/>
                        </picture>
                    </a>
                    <div className="summary-item__user--info">
                        <h2 className="summary-item__user--name">Olena Rybak</h2>
                        <span className="summary-item__user--position">
                            Managing director
                        </span>
                    </div>
                    <button onClick={handleFavorite} type="button" className={`summary-item__user--favorite ${isFavorite && "is-active"}`}>
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
    )
}
