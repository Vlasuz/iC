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


  
  .section-table__row-per-page .css-b62m3t-container {
    width: 100%;
    max-width: 88px;
  }
  .section-table__row-per-page {
    width: 220px;
    justify-content: flex-end;
    margin-left: auto;
  }
  
  .section-table {
    display: flex;
    flex-direction: column;
    padding-bottom: 0;
  }
  .section-table__footer {
    margin-top: auto;
    padding-top: 20px;
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
    -webkit-box-shadow: 0 0 30px 0 rgba(65,79,124,.08), 0 4px 5px 0 rgba(65,79,124,.1);
    padding: 20px 25px;
  }
  .react-datepicker__header {
    background: #fff;
    border: none;
    padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 1px solid rgba(95,100,114,.1);
  }

  .react-datepicker__day:hover, .react-datepicker__month-text:hover, .react-datepicker__quarter-text:hover, .react-datepicker__year-text:hover {
    background: rgba(239, 49, 41, .1);
    color: var(--accent);
    -webkit-border-radius: 0;-moz-border-radius: 0;border-radius: 0;
  }

  .react-datepicker__day--today, .react-datepicker__month-text--today, .react-datepicker__quarter-text--today, .react-datepicker__year-text--today,
  .react-datepicker__day--selected, .react-datepicker__day--in-selecting-range, .react-datepicker__day--in-range, .react-datepicker__month-text--selected, .react-datepicker__month-text--in-selecting-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--selected, .react-datepicker__quarter-text--in-selecting-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--selected, .react-datepicker__year-text--in-selecting-range, .react-datepicker__year-text--in-range,
  .react-datepicker__day--keyboard-selected, .react-datepicker__month-text--keyboard-selected, .react-datepicker__quarter-text--keyboard-selected, .react-datepicker__year-text--keyboard-selected {
    -webkit-border-radius: 0;-moz-border-radius: 0;border-radius: 0;
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
    -webkit-transition: all .3s ease;-moz-transition: all .3s ease;-ms-transition: all .3s ease;-o-transition: all .3s ease;transition: all .3s ease;
    font-weight: 400;
    
    &:hover {
      background: var(--accent);
      color: var(--white);
    }
  }
`
