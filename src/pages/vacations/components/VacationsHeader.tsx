import React, {useEffect, useState} from 'react'

interface IVacationsHeaderProps {
	sortByName: any
	setSortByName: any
}

export const VacationsHeader: React.FC<IVacationsHeaderProps> = ({sortByName, setSortByName}) => {

    const [isOpenSortByName, setIsOpenSortByName] = useState(false)

	const sortByNameList = [
		{
			value: "sortDown",
			label: "A-Z"
		},
		{
			value: "sortUp",
			label: "Z-A"
		}
	]

    return (
        <div className="section-table__head">
            <div className="section-table__head-row">
                <div className="section-table__head-th visible-on-mob">
										<span className="section-table__main--param">
											<span>№</span>
											<span>
												<div className={`section-table__main--sort drop-down-absolute ${isOpenSortByName && "is-active"}`}>
													<button onClick={_ => setIsOpenSortByName(prev => !prev)} className="section-table__main--sort-target drop-down-absolute__target">
														<svg width="13" height="13" viewBox="0 0 13 13">
															<use xlinkHref="#user"></use>
														</svg>
														Name
														<svg width="10" height="15" viewBox="0 0 11 15">
															<use xlinkHref="#sort-up-down"></use>
														</svg>
													</button>
													<div
                                                        className={`section-table__main--sort-block drop-down-absolute__block ${isOpenSortByName && "is-active"}`}
                                                        id="name-sort" style={{minWidth: "150px"}}>
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
                            onClick={_ => setIsOpenSortByName(prev => !prev)}
                            className={`section-table__main--sort-target drop-down-absolute__target ${isOpenSortByName && "is-active"}`}>
                            <svg width="13" height="13" viewBox="0 0 13 13">
                                <use xlinkHref="#user"></use>
                            </svg>
                            Name
                            <svg width="10" height="15" viewBox="0 0 11 15">
                                <use xlinkHref="#sort-up-down"></use>
                            </svg>
                        </button>
                        <div className={`section-table__main--sort-block drop-down-absolute__block ${isOpenSortByName && "is-active"}`}
                             id="name-sort-2" style={{minWidth: "150px"}}>
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
    )
}
