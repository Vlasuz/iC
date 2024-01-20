import styled from "styled-components";

export const AppStyled = styled.div`
  .css-1u9des2-indicatorSeparator {
    display: none;
  }

  .css-t3ipsp-control:hover,
  .css-t3ipsp-control {
    border-color: rgba(174, 182, 206, 0.3);
    box-shadow: none;
  }

  .css-15lsz6c-indicatorContainer,
  .css-1xc3v61-indicatorContainer {
    padding: 0;
    padding-right: 10px;
  }

  .css-1fdsijx-ValueContainer {
    padding-right: 0;
  }

  .main {
    animation: none;
    opacity: 1;
  }

  .fade-exit-active {
    opacity: 0;
    transition: all .3s ease;
  }

  .fade-enter-done {
    transition: all .3s ease;
    opacity: 1;
  }

  .fade-enter-active {
    position: absolute;
    opacity: 0;
  }


  .section-table__head-th:last-child .drop-down-absolute__block.is-right-default {
    left: auto;
    width: fit-content;
  }

  section .notification__block.drop-down-absolute__block.is-right-default {
    position: absolute;
  }

  .css-15lsz6c-indicatorContainer svg {
    color: #EF3129;
    transform: scaleY(-1);
    transition: all .3s ease;
  }

  .css-1xc3v61-indicatorContainer svg {
    transition: all .3s ease;
  }

  .react-datepicker-wrapper,
  .input-date {
    width: 100%;
  }


  .section-table__row-per-page .css-b62m3t-container {
    width: 100%;
    max-width: 88px;
  }

  @media screen and (max-width: 768px) {
    .section-table__see-more {
      height: 44px;
    }
  }
  .section-table__row-per-page {
    width: 230px;
    justify-content: flex-end;
    margin-left: auto;

    @media screen and (max-width: 768px) {
      margin-left: 0;
      width: 225px;
    }
  }

  .section-table {
    display: flex;
    flex-direction: column;
    padding-bottom: 0;
  }

  .section-table__footer {
    margin-top: auto;
    padding-top: 10px;
    padding-bottom: 7px;
  }

  .css-b62m3t-container *[aria-disabled='true'] {
    opacity: 0.5; /* Пример изменения прозрачности */
    cursor: not-allowed;
  }


  .aside__user {
    background: transparent;
    border: none;
  }


  .table-to-download-excel {
    display: none;
  }


  .drop-down-2__block {
    position: fixed;
    display: block;

    opacity: 0;
    visibility: hidden;
    transition: all .3s ease;

    &.active {
      opacity: 1;
      visibility: visible;
    }
  }


  .section-table__param {
    word-break: break-all;
  }

  .input.date-input {
    width: 100%;
  }

  .table-timesheet {
    z-index: 2;
  }

  .section-table__main--sort-block {
    z-index: 2;
  }


  .section-table__change-full-date--months li:nth-child(1) {
    order: 1;
  }

  .section-table__change-full-date--months li:nth-child(2) {
    order: 3;
  }

  .section-table__change-full-date--months li:nth-child(3) {
    order: 5;
  }

  .section-table__change-full-date--months li:nth-child(4) {
    order: 7;
  }

  .section-table__change-full-date--months li:nth-child(5) {
    order: 9;
  }

  .section-table__change-full-date--months li:nth-child(6) {
    order: 11;
  }

  .section-table__change-full-date--months li:nth-child(7) {
    order: 2;
  }

  .section-table__change-full-date--months li:nth-child(8) {
    order: 4;
  }

  .section-table__change-full-date--months li:nth-child(9) {
    order: 6;
  }

  .section-table__change-full-date--months li:nth-child(10) {
    order: 8;
  }

  .section-table__change-full-date--months li:nth-child(11) {
    order: 10;
  }

  .section-table__change-full-date--months li:nth-child(12) {
    order: 12;
  }


  .drop-down-absolute__block {
    position: fixed;
  }


  .profile__user--avatar {
    cursor: pointer;
  }

  .profile__user--avatar input {
    display: none;
  }

  .popup-form__label {
    position: relative;

    .select {
      width: 100%;
      max-width: 100%;
    }

    .custom-select__body li {
      text-align: left;
    }

    .custom-select__head {
      width: 100%;
      justify-content: space-between;
    }
  }

  .popup-form__label .input-title {
    position: absolute;
    bottom: 12px;
    left: 34px;
    color: #5F6472;
    pointer-events: none;
  }

  .simplebar-mask {
    z-index: 2;
  }

  .popup-title + * + .popup-container {
    overflow: visible;
  }

  .drop-down__list-date li.is-active a {
    background: rgba(151, 160, 187, 0.15);
    color: #EF3129;
  }

  .drop-down__list-date li a {
    text-align: left;
    justify-content: flex-start;
  }


  .date-input {
    position: relative;

    .cover {
      content: '';
      background: #000;
      opacity: .5;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      z-index: 2;
    }
  }

  .section-table__add-task--set-date.is-active svg {
    transform: scaleY(-1);
    color: var(--accent);
  }


  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker {
    border: none;
    background: #fff;
    -webkit-box-shadow: 0 0 30px 0 rgba(65, 79, 124, .08), 0 4px 5px 0 rgba(65, 79, 124, .1);
    padding: 20px 25px;
  }

  .react-datepicker__header {
    background: #fff;
    border: none;
    padding-bottom: 5px;
    margin-bottom: -5px;
  }

  .react-datepicker__day-names {
    border-top: 1px solid rgba(95, 100, 114, .1);
    margin-top: 10px;
    padding-top: 6px;
  }

  .react-datepicker__day:hover, .react-datepicker__month-text:hover, .react-datepicker__quarter-text:hover, .react-datepicker__year-text:hover {
    background: rgba(239, 49, 41, .1);
    color: var(--accent);
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
  }

  .react-datepicker__day--today, .react-datepicker__month-text--today, .react-datepicker__quarter-text--today, .react-datepicker__year-text--today,
  .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--selected, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--selected, .react-datepicker__year-text--in-selecting-range, .react-datepicker__year-text--in-range,
  .react-datepicker__day--keyboard-selected, .react-datepicker__month-text--keyboard-selected, .react-datepicker__quarter-text--keyboard-selected, .react-datepicker__year-text--keyboard-selected {
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    color: var(--accent);
    font-weight: 600;
  }

  .react-datepicker__day--keyboard-selected, .react-datepicker__month-text--keyboard-selected, .react-datepicker__quarter-text--keyboard-selected, .react-datepicker__year-text--keyboard-selected {
    background: transparent;
  }

  .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--selected, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--selected, .react-datepicker__year-text--in-selecting-range, .react-datepicker__year-text--in-range {
    background: var(--accent);
    color: #fff;
  }

  .react-datepicker__day, .react-datepicker__month-text, .react-datepicker__quarter-text, .react-datepicker__year-text {
    width: 37px;
    height: 37px;
    margin: 0;
    font-size: 14px;
    padding: 5px;
  }

  .react-datepicker__navigation--previous {
    left: 22px;
    top: 23px;
  }

  .react-datepicker__navigation--next {
    right: 22px;
    top: 23px;
  }

  .react-datepicker__navigation-icon {
    border-width: 2px 2px 0 0;
  }

  .react-datepicker__day-names .react-datepicker__day-name {
    width: 37px;
    height: 37px;
    margin: 0;
    font-size: 14px;
    padding: 5px;
    color: #aeb6ce;
  }

  .react-datepicker__today-button {
    background: #fff;
    color: var(--accent);
    border: 1px solid var(--accent);
    margin: 10px 0 0;
    font-size: .875rem;
    line-height: 100%;
    color: var(--accent);
    padding: 14px;
    height: auto;
    border-color: var(--accent);
    -webkit-transition: all .3s ease;
    -moz-transition: all .3s ease;
    -ms-transition: all .3s ease;
    -o-transition: all .3s ease;
    transition: all .3s ease;
    font-weight: 400;

    &:hover {
      background: var(--accent);
      color: var(--white);
    }
  }


  .profile__container.popup-container {
    display: block;
  }

  .simplebar-content {
    padding-bottom: 25px !important;
  }

  .aside__body .simplebar-content,
  .select .simplebar-content,
  .section-table__main .simplebar-content {
    padding-bottom: 0px !important;
  }


  .section-table__main--container::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background: transparent;
  }

  .section-table__main--container::-webkit-scrollbar-thumb {
    background: rgba(169, 169, 172, .5);
  }

  .aside__change-on-min > *:nth-child(2) {
    display: block !important;

    @media screen and (max-width: 992px) {
      display: none !important;
    }
  }

  .down-sidebar__total-item {
    gap: 10px;
  }

  .summary-item__element--progress .line_done,
  .down-sidebar__total-item--progress-bar .line_done {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: var(--value, 0%);
    height: 100%;
    background: rgba(151, 160, 187, .5);
    max-width: 100%;
  }

  .down-sidebar__total-item--progress-bar {
    width: 100%;
    max-width: 300px;
    margin-left: auto;
  }

  .down-sidebar__total-item--name {
    width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .down-sidebar__total-item--value {
    b {
      display: block;
      width: 100%;
      max-width: 80px;
      white-space: nowrap;
    }
  }


  .react-datepicker__day--keyboard-selected {
    color: #000;
    font-weight: 400;
  }

  .react-datepicker__day--outside-month {
    opacity: 0;
    pointer-events: none;
  }


  .project-popup__item.is-active {
    a {
      color: var(--accent);
      &:before {
        opacity: 1;
      }
    }
  }

  .project-popup__item_all a {
    font-weight: 600;
  }
  
  .popup-form__label .delete {
    display: none;
  }

  .section-table__search--label,
  .down-sidebar__chat-user-panel label,
  .project-popup__search label,
  .input_placeholder,
  .section-table__search--label {
    position: relative;
    display: flex !important;
    align-items: center;

    input:focus + .placeholder {
      opacity: 0;
    }

    .placeholder {
      position: absolute;
      left: 20px;
      user-select: none;
      pointer-events: none;
      opacity: .5;
      -webkit-transition: all .2s ease;
      -moz-transition: all .2s ease;
      -ms-transition: all .2s ease;
      -o-transition: all .2s ease;
      transition: all .2s ease;
    }
  }

  .section-table__main--param {
    justify-content: center;
  }

  .sub-popup-employee__container {
    margin-top: 20px;
  }

  .section-table__change-full-date--months .is-disabled {
    opacity: .5;
    pointer-events: none;
  }

  .react-datepicker__navigation {
    opacity: 0;
    pointer-events: none;
  }

  .section-table__add:disabled {
    opacity: .5;
    background: #EF3129;
    cursor: default;
  }

  .section-table__row-per-page .custom-select__body {
    top: auto;
    bottom: calc(100% + 10px);
  }

  .section-table__add-costs--text input,
  .section-table__add-task--text input {
    height: 100%;
  }

  .input.date-input,
  .section-table__add-costs--cost input,
  .section-table__add-task--hours input,
  .drop-down__target {
    height: 45px;
  }

  .section-table__export {
    width: fit-content;
  }

  @media screen and (max-width: 992px) {
    .section-table__export,
    .drop-down__target {
      width: 100%;
    }

    .section-table__export {
      max-width: 100%;
    }
  }


  .section-table__row.is-archive {
    opacity: .5;

    &:hover {
      background: transparent;
    }
  }

  .delete_photo {
    position: absolute;
    top: 0px;
    right: -7px;
    color: #FF0A00;
    z-index: 2;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    border: 2px solid #FF0A00;
    background: #fff;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 100%;
      height: 100%;
      display: block;
      margin-left: 1.5px;
      margin-top: 1.5px;
    }
  }

  .login-wrapper {
    .simplebar-content {
      padding-bottom: 0!important;
    }
  }


`
