import React, {useEffect} from 'react'

interface IDownSidebarProps {

}

export const DownSidebar: React.FC<IDownSidebarProps> = () => {

    return (
        <div className="down-sidebar">
            <button className="down-sidebar__arrow-target" type="button">
                <svg width="10" height="7" viewBox="0 0 10 7">
                    <use xlinkHref="#drop-down-arrow"></use>
                </svg>
            </button>
            <div className="down-sidebar__wrapper">
                <div className="down-sidebar__target-place">
                    <div className="down-sidebar__target-place--row">
                        <button className="down-sidebar__comments-target btn is-grey"
                                type="button">
                            <svg width="13" height="13" viewBox="0 0 13 13">
                                <use xlinkHref="#comments"></use>
                            </svg>
                            Comments (3)
                        </button>
                        <div className="down-sidebar__total-target">
                            <span>Total for month:</span>
                            <div className="down-sidebar__total-target--value">
                                45 hours
                            </div>
                        </div>
                    </div>
                </div>
                <div className="down-sidebar__row">
                    <div>
                        <div className="down-sidebar__col">
                            <div className="down-sidebar__chat">
                                <div
                                    className="down-sidebar__chat-block simplebar-scrollable-y"
                                    data-simplebar="init"
                                    data-simplebar-auto-hide="false">
                                    <div className="simplebar-wrapper"
                                         style={{margin: "-10px -15px"}}>
                                        <div
                                            className="simplebar-height-auto-observer-wrapper">
                                            <div
                                                className="simplebar-height-auto-observer"></div>
                                        </div>
                                        <div className="simplebar-mask">
                                            <div className="simplebar-offset"
                                                 style={{right: "0px", bottom: "0px"}}>
                                                <div
                                                    className="simplebar-content-wrapper"
                                                    tabIndex={0} role="region"
                                                    aria-label="scrollable content"
                                                    style={{height: "100%", overflow: "hidden scroll"}}>
                                                    <div className="simplebar-content"
                                                         style={{padding: "10px 15px"}}>
                                                        <div
                                                            className="down-sidebar__chat-item"
                                                            data-author="Olena Rybak">
                                                            <div
                                                                className="down-sidebar__chat-item--text">
                                                                <p>
                                                                    <b>Olena
                                                                        Rybak:</b> Still
                                                                    not finished, sorry,
                                                                    please not approve
                                                                    till Wednesday
                                                                </p>
                                                            </div>
                                                            <button type="button"
                                                                    className="down-sidebar__chat-item--answer"
                                                                    title="Answer">
                                                                <svg width="20"
                                                                     height="20"
                                                                     viewBox="0 0 20 20">
                                                                    <use
                                                                        xlinkHref="#answer"></use>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="down-sidebar__chat-item"
                                                            data-author="Irina Omelianenko">
                                                            <div
                                                                className="down-sidebar__chat-item--text">
                                                                <p>
                                                                    <span>@Olena Rybak.</span>
                                                                    <b>Irina
                                                                        Omelianenko:</b> No
                                                                    problems, take your
                                                                    time. Don’t forget
                                                                    please about the
                                                                    fact that 19th was
                                                                    weekend
                                                                </p>
                                                            </div>
                                                            <button type="button"
                                                                    className="down-sidebar__chat-item--answer"
                                                                    title="Answer">
                                                                <svg width="20"
                                                                     height="20"
                                                                     viewBox="0 0 20 20">
                                                                    <use
                                                                        xlinkHref="#answer"></use>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="down-sidebar__chat-item"
                                                            data-author="Olena Rybak">
                                                            <div
                                                                className="down-sidebar__chat-item--text">
                                                                <p>
                                                                    <b>Olena
                                                                        Rybak:</b> Still
                                                                    not finished, sorry,
                                                                    please not approve
                                                                    till Wednesday
                                                                </p>
                                                            </div>
                                                            <button type="button"
                                                                    className="down-sidebar__chat-item--answer"
                                                                    title="Answer">
                                                                <svg width="20"
                                                                     height="20"
                                                                     viewBox="0 0 20 20">
                                                                    <use
                                                                        xlinkHref="#answer"></use>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="down-sidebar__chat-item"
                                                            data-author="Irina Omelianenko">
                                                            <div
                                                                className="down-sidebar__chat-item--text">
                                                                <p>
                                                                    <span>@Olena Rybak.</span>
                                                                    <b>Irina
                                                                        Omelianenko:</b> No
                                                                    problems, take your
                                                                    time. Don’t forget
                                                                    please about the
                                                                    fact that 19th was
                                                                    weekend
                                                                </p>
                                                            </div>
                                                            <button type="button"
                                                                    className="down-sidebar__chat-item--answer"
                                                                    title="Answer">
                                                                <svg width="20"
                                                                     height="20"
                                                                     viewBox="0 0 20 20">
                                                                    <use
                                                                        xlinkHref="#answer"></use>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="down-sidebar__chat-item"
                                                            data-author="Olena Rybak">
                                                            <div
                                                                className="down-sidebar__chat-item--text">
                                                                <p>
                                                                    <b>Olena
                                                                        Rybak:</b> Still
                                                                    not finished, sorry,
                                                                    please not approve
                                                                    till Wednesday
                                                                </p>
                                                            </div>
                                                            <button type="button"
                                                                    className="down-sidebar__chat-item--answer"
                                                                    title="Answer">
                                                                <svg width="20"
                                                                     height="20"
                                                                     viewBox="0 0 20 20">
                                                                    <use
                                                                        xlinkHref="#answer"></use>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="down-sidebar__chat-item"
                                                            data-author="Irina Omelianenko">
                                                            <div
                                                                className="down-sidebar__chat-item--text">
                                                                <p>
                                                                    <span>@Olena Rybak.</span>
                                                                    <b>Irina
                                                                        Omelianenko:</b> No
                                                                    problems, take your
                                                                    time. Don’t forget
                                                                    please about the
                                                                    fact that 19th was
                                                                    weekend
                                                                </p>
                                                            </div>
                                                            <button type="button"
                                                                    className="down-sidebar__chat-item--answer"
                                                                    title="Answer">
                                                                <svg width="20"
                                                                     height="20"
                                                                     viewBox="0 0 20 20">
                                                                    <use
                                                                        xlinkHref="#answer"></use>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="down-sidebar__chat-item"
                                                            data-author="Olena Rybak">
                                                            <div
                                                                className="down-sidebar__chat-item--text">
                                                                <p>
                                                                    <b>Olena
                                                                        Rybak:</b> Still
                                                                    not finished, sorry,
                                                                    please not approve
                                                                    till Wednesday
                                                                </p>
                                                            </div>
                                                            <button type="button"
                                                                    className="down-sidebar__chat-item--answer"
                                                                    title="Answer">
                                                                <svg width="20"
                                                                     height="20"
                                                                     viewBox="0 0 20 20">
                                                                    <use
                                                                        xlinkHref="#answer"></use>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="down-sidebar__chat-item"
                                                            data-author="Irina Omelianenko">
                                                            <div
                                                                className="down-sidebar__chat-item--text">
                                                                <p>
                                                                    <span>@Olena Rybak.</span>
                                                                    <b>Irina
                                                                        Omelianenko:</b> No
                                                                    problems, take your
                                                                    time. Don’t forget
                                                                    please about the
                                                                    fact that 19th was
                                                                    weekend
                                                                </p>
                                                            </div>
                                                            <button type="button"
                                                                    className="down-sidebar__chat-item--answer"
                                                                    title="Answer">
                                                                <svg width="20"
                                                                     height="20"
                                                                     viewBox="0 0 20 20">
                                                                    <use
                                                                        xlinkHref="#answer"></use>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="down-sidebar__chat-item"
                                                            data-author="Olena Rybak">
                                                            <div
                                                                className="down-sidebar__chat-item--text">
                                                                <p>
                                                                    <b>Olena
                                                                        Rybak:</b> Still
                                                                    not finished, sorry,
                                                                    please not approve
                                                                    till Wednesday
                                                                </p>
                                                            </div>
                                                            <button type="button"
                                                                    className="down-sidebar__chat-item--answer"
                                                                    title="Answer">
                                                                <svg width="20"
                                                                     height="20"
                                                                     viewBox="0 0 20 20">
                                                                    <use
                                                                        xlinkHref="#answer"></use>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div
                                                            className="down-sidebar__chat-item"
                                                            data-author="Irina Omelianenko">
                                                            <div
                                                                className="down-sidebar__chat-item--text">
                                                                <p>
                                                                    <span>@Olena Rybak.</span>
                                                                    <b>Irina
                                                                        Omelianenko:</b> No
                                                                    problems, take your
                                                                    time. Don’t forget
                                                                    please about the
                                                                    fact that 19th was
                                                                    weekend
                                                                </p>
                                                            </div>
                                                            <button type="button"
                                                                    className="down-sidebar__chat-item--answer"
                                                                    title="Answer">
                                                                <svg width="20"
                                                                     height="20"
                                                                     viewBox="0 0 20 20">
                                                                    <use
                                                                        xlinkHref="#answer"></use>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="simplebar-placeholder"
                                             style={{width: "723px", height: "661px"}}></div>
                                    </div>
                                    <div
                                        className="simplebar-track simplebar-horizontal"
                                        style={{visibility: "hidden"}}>
                                        <div
                                            className="simplebar-scrollbar simplebar-visible"
                                            style={{width: "0px", display: "none"}}></div>
                                    </div>
                                    <div className="simplebar-track simplebar-vertical"
                                         style={{visibility: "visible"}}>
                                        <div
                                            className="simplebar-scrollbar simplebar-visible"
                                            style={{
                                                height: "30px",
                                                transform: "translate3d(0px, 111px, 0px)",
                                                display: "block"
                                            }}></div>
                                    </div>
                                </div>
                                <form className="down-sidebar__chat-user-panel">
                                    <label>
                                        <input type="text" name="comment" placeholder="Add new comment" required
                                               className="input"/>
                                    </label>
                                    <button type="submit" title="Send">
                                        <svg width="17" height="17" viewBox="0 0 17 17">
                                            <use
                                                xlinkHref="#send"></use>
                                        </svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="down-sidebar__col">
                            <div className="down-sidebar__total">
                                <div
                                    className="down-sidebar__total-block simplebar-scrollable-y"
                                    data-simplebar="init"
                                    data-simplebar-auto-hide="false">
                                    <div className="simplebar-wrapper"
                                         style={{margin: "-10px -15px"}}>
                                        <div
                                            className="simplebar-height-auto-observer-wrapper">
                                            <div
                                                className="simplebar-height-auto-observer"></div>
                                        </div>
                                        <div className="simplebar-mask">
                                            <div className="simplebar-offset"
                                                 style={{right: "0px", bottom: "0px"}}>
                                                <div
                                                    className="simplebar-content-wrapper"
                                                    tabIndex={0} role="region"
                                                    aria-label="scrollable content"
                                                    style={{height: "100%", overflow: "hidden scroll"}}>
                                                    <div className="simplebar-content"
                                                         style={{padding: "10px 15px"}}>
                                                        <div
                                                            className="down-sidebar__total-item">
                                                            <b className="down-sidebar__total-item--name">61xA210739_Kremenchuk
                                                                Bridge supervision</b>
                                                            <div
                                                                className="down-sidebar__total-item--value">
                                                                <b>10h</b>
                                                                <div
                                                                    className="down-sidebar__total-item--progress-bar"
                                                                    data-value="11%"></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="down-sidebar__total-item">
                                                            <b className="down-sidebar__total-item--name">61xA210739_Kremenchuk
                                                                Bridge supervision</b>
                                                            <div
                                                                className="down-sidebar__total-item--value">
                                                                <b>10h</b>
                                                                <div
                                                                    className="down-sidebar__total-item--progress-bar"
                                                                    data-value="11%"></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="down-sidebar__total-item">
                                                            <b className="down-sidebar__total-item--name">61xA210739_Kremenchuk
                                                                Bridge supervision</b>
                                                            <div
                                                                className="down-sidebar__total-item--value">
                                                                <b>10h</b>
                                                                <div
                                                                    className="down-sidebar__total-item--progress-bar"
                                                                    data-value="11%"></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="down-sidebar__total-item">
                                                            <b className="down-sidebar__total-item--name">61xA210739_Kremenchuk
                                                                Bridge supervision</b>
                                                            <div
                                                                className="down-sidebar__total-item--value">
                                                                <b>10h</b>
                                                                <div
                                                                    className="down-sidebar__total-item--progress-bar"
                                                                    data-value="11%"></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="down-sidebar__total-item">
                                                            <b className="down-sidebar__total-item--name">61xA210739_Kremenchuk
                                                                Bridge supervision</b>
                                                            <div
                                                                className="down-sidebar__total-item--value">
                                                                <b>10h</b>
                                                                <div
                                                                    className="down-sidebar__total-item--progress-bar"
                                                                    data-value="11%"></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="down-sidebar__total-item">
                                                            <b className="down-sidebar__total-item--name">61xA210739_Kremenchuk
                                                                Bridge supervision</b>
                                                            <div
                                                                className="down-sidebar__total-item--value">
                                                                <b>10h</b>
                                                                <div
                                                                    className="down-sidebar__total-item--progress-bar"
                                                                    data-value="11%"></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="down-sidebar__total-item">
                                                            <b className="down-sidebar__total-item--name">61xA210739_Kremenchuk
                                                                Bridge supervision</b>
                                                            <div
                                                                className="down-sidebar__total-item--value">
                                                                <b>10h</b>
                                                                <div
                                                                    className="down-sidebar__total-item--progress-bar"
                                                                    data-value="11%"></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="down-sidebar__total-item">
                                                            <b className="down-sidebar__total-item--name">61xA210739_Kremenchuk
                                                                Bridge supervision</b>
                                                            <div
                                                                className="down-sidebar__total-item--value">
                                                                <b>10h</b>
                                                                <div
                                                                    className="down-sidebar__total-item--progress-bar"
                                                                    data-value="11%"></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="down-sidebar__total-item">
                                                            <b className="down-sidebar__total-item--name">61xA210739_Kremenchuk
                                                                Bridge supervision</b>
                                                            <div
                                                                className="down-sidebar__total-item--value">
                                                                <b>10h</b>
                                                                <div
                                                                    className="down-sidebar__total-item--progress-bar"
                                                                    data-value="11%"></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="down-sidebar__total-item">
                                                            <b className="down-sidebar__total-item--name">61xA210739_Kremenchuk
                                                                Bridge supervision</b>
                                                            <div
                                                                className="down-sidebar__total-item--value">
                                                                <b>10h</b>
                                                                <div
                                                                    className="down-sidebar__total-item--progress-bar"
                                                                    data-value="11%"></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="down-sidebar__total-item">
                                                            <b className="down-sidebar__total-item--name">61xA210739_Kremenchuk
                                                                Bridge supervision</b>
                                                            <div
                                                                className="down-sidebar__total-item--value">
                                                                <b>10h</b>
                                                                <div
                                                                    className="down-sidebar__total-item--progress-bar"
                                                                    data-value="11%"></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="down-sidebar__total-item">
                                                            <b className="down-sidebar__total-item--name">61xA210739_Kremenchuk
                                                                Bridge supervision</b>
                                                            <div
                                                                className="down-sidebar__total-item--value">
                                                                <b>10h</b>
                                                                <div
                                                                    className="down-sidebar__total-item--progress-bar"
                                                                    data-value="11%"></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="down-sidebar__total-item">
                                                            <b className="down-sidebar__total-item--name">61xA210739_Kremenchuk
                                                                Bridge supervision</b>
                                                            <div
                                                                className="down-sidebar__total-item--value">
                                                                <b>10h</b>
                                                                <div
                                                                    className="down-sidebar__total-item--progress-bar"
                                                                    data-value="11%"></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="down-sidebar__total-item">
                                                            <b className="down-sidebar__total-item--name">61xA210739_Kremenchuk
                                                                Bridge supervision</b>
                                                            <div
                                                                className="down-sidebar__total-item--value">
                                                                <b>10h</b>
                                                                <div
                                                                    className="down-sidebar__total-item--progress-bar"
                                                                    data-value="11%"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="simplebar-placeholder"
                                             style={{width: "723px", height: "456px"}}></div>
                                    </div>
                                    <div
                                        className="simplebar-track simplebar-horizontal"
                                        style={{visibility: "hidden"}}>
                                        <div
                                            className="simplebar-scrollbar simplebar-visible"
                                            style={{width: "0px", display: "none"}}></div>
                                    </div>
                                    <div className="simplebar-track simplebar-vertical"
                                         style={{visibility: "visible"}}>
                                        <div
                                            className="simplebar-scrollbar simplebar-visible"
                                            style={{height: "43px", transform: "translate3d(0px, 0px, 0px)", display: "block"}}></div>
                                    </div>
                                </div>
                                <div className="down-sidebar__total-footer">
                                    <div className="down-sidebar__total-value">
                                        <span>Total for month:</span>
                                        <b>45 hours</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
