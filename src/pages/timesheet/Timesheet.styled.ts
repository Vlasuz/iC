import styled from "styled-components";

export const TimesheetStyled = styled.section`
  min-height: calc(95vh - 4px);

  @media screen and (max-width: 992px) {
    min-height: calc(100vh - 115px);
  }
  
  .section-table__row-block:hover {
    .section-table__row-block--span-params {
      .section-table__param {
        background: rgb(235 236 242);
      }
    }
  }

  .section-table__add-task--hours .input {
    text-align: center;
  }

  .section-table__main.table-timesheet .section-table__row-block--list .section-table__row.drop-down-2:hover .section-table__param {
    background: rgb(235 236 242);
  }
  
  .section-table__row.drop-down-2.odd {
    background: #f8f8fa;
    .section-table__param.is-center {
      background: #f8f8fa;
    }
  }

  .drop-down__block {
    overflow: visible;
  }
  
  .section-table__head-th:last-child {
    .drop-down-absolute__block.is-right-default {
      right: 51px;
      
      @media screen and (max-width: 1440px) {
        right: 16px;
      }
    }
  }
  
  .project-popup__item {
    cursor: pointer;
    &:before {
      -webkit-transition: all .3s ease;-moz-transition: all .3s ease;-ms-transition: all .3s ease;-o-transition: all .3s ease;transition: all .3s ease;
    }
  }
  .section-table__head-th .project-popup__item.is-active a {
    color: #EF3129;
    &:before {
      background: rgba(151, 160, 187, 0.15);
      opacity: 1;
    }
  }

  .section-table__row:nth-child(even) .section-table__param:first-child::before {
    background: transparent;
  }

  .section-table__main--container::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background: transparent;
  }
  .section-table__main--container::-webkit-scrollbar-thumb {
    background: rgba(169, 169, 172, .5);
  }


  .section-table__main.table-timesheet .section-table__row-block:hover .section-table__param:nth-child(1) {
    border-right: 1px solid rgba(0, 0, 0, 0);
  }

  @media screen and (max-width: 992px) {
    .section-table__search--label {
      position: absolute !important;
    }
  }
  
  .section-table__footer {
    //padding-bottom: 23px !important;
  }

  .section-table__main.table-timesheet .section-table__row-block:not(:last-child) .section-table__row-block--list .section-table__row:last-child {
    //border: none;
  }

  @keyframes scrollToShow {
    from {
      top: -150px
    }
    to {
      top: 0px
    }
  }
  @keyframes scrollToHide {
    from {
      top: 0px
    }
    to {
      top: -150px
    }
  }

  @media screen and (max-width: 992px) {
    @keyframes scrollToShow {
      from {
        top: -220px
      }
      to {
        top: 65px
      }
    }
    @keyframes scrollToHide {
      from {
        top: 65px
      }
      to {
        top: -220px
      }
    }
  }

  .section-table__header.animate-to-show {
    transition: var(--transition-width, none);
    animation: scrollToShow .4s ease forwards;
    position: fixed;
    left: var(--aside-width, 230px);
    width: calc(100% - var(--aside-width, 230px));
    margin-bottom: -15px;
    background: #f2f3f7;
    box-shadow: 0 0 10px #ccc;

    padding: 25px 50px 20px 50px;

    @media screen and (max-width: 1440px) {
      padding: 20px;
      padding-left: 40px;
    }
    @media screen and (max-width: 992px) {
      padding: 20px;
    }

    @media screen and (max-width: 1440px) {
      left: var(--aside-width, 330px);
      width: calc(100% - var(--aside-width, 330px));
    }
    @media screen and (max-width: 1200px) {
      left: var(--aside-width, 230px);
      width: calc(100% - var(--aside-width, 230px));
    }
    @media screen and (max-width: 992px) {
      left: 0;
      width: 100%;
    }

  }
  .section-table__header.animate-to-show.animate-to-hide {
    animation: scrollToHide .4s ease forwards;
  }

  &.fixed-edit-block {
    padding-top: 96px;
    transition: all .3s ease;

    @media screen and (max-width: 992px) {
      padding-top: 150px;
    }
  }
`
