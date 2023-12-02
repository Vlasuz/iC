import React, {useEffect, useState} from 'react'

interface IPopupEditProjectProps {

}

export const PopupEditProject: React.FC<IPopupEditProjectProps> = () => {

    const [nameValue, setNameValue] = useState<string>('')
    const [descriptionValue, setDescriptionValue] = useState<string>('')

    return (
        <div className="add-project popup" id="edit-project-popup" style={{display: "none"}}>
            <div className="add-project__wrapper popup-wrapper">
                <div className="add-project__bg popup-bg popup-close"></div>
                <div className="add-project__body popup-body">
                    <h2 className="add-project__title popup-title title">
                        Edit project
                    </h2>
                    <button type="button" className="add-project__close-btn popup-close-btn popup-close"
                            title="Close">
                        <svg width="15" height="15" viewBox="0 0 15 15">
                            <use xlinkHref="#close"></use>
                        </svg>
                    </button>
                    <div className="add-project__container popup-container" data-simplebar
                         data-simplebar-auto-hide="false">
                        <form className="add-project__form popup-form">
                            <div className="popup-form__row">
                                <label className="popup-form__label is-full">
                                    <span>Project name</span>
                                    <input type="text" name="project-name" required placeholder="Project name"
                                           className="input" value={nameValue} onChange={e => setNameValue(e.target.value)}/>
                                </label>
                            </div>
                            <div className="popup-form__row">
                                <label className="popup-form__label is-full">
                                    <span>Project description</span>
                                    <input type="text" name="project-description" required
                                           placeholder="Project description" className="input" onChange={e => setDescriptionValue(e.target.value)} value={descriptionValue}/>
                                </label>
                            </div>
                            <div className="popup-form__row is-min-gap">
                                <button className="popup-form__cancel btn is-transparent popup-close" type="button">
                                    Cancel
                                </button>
                                <button className="popup-form__submit btn" type="submit">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
