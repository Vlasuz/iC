import styled from "styled-components";

export const CostsStyles = styled.section`
  min-height: calc(95vh - 4px);

  @media screen and (max-width: 992px) {
    min-height: calc(100vh - 115px);
  };

  @media screen and (max-width: 992px) {
    min-height: calc(100vh - 115px);
  };
  
  .project-popup__item.is-active a {
    color: #EF3129;
  }
  .project-popup__item.is-active a:before {
    opacity: 1;
    background: rgba(151, 160, 187, 0.15);
  }

  .section-table__main--wrapper {
    min-width: 1105px;
  }

  .section-table__main.add-border .section-table__param {
    word-break: normal;
  }

  .drop-down__list-date li.is-active a {
    background: rgba(151, 160, 187, 0.15);
    color: #EF3129;
  }
  .section-table__head-th .project-popup__item.is-active a {
    color: #EF3129;
    &:before {
      background: rgba(151, 160, 187, 0.15);
      opacity: 1;
    }
  }

  .section-table__row:nth-child(even) .section-table__param:first-child::after {
    background: rgba(150,159,186,.07);
  }
  
  .section-table__head-th {
    justify-content: center;
    
  }
  

  @media screen and (min-width: 992px) {
    .section-table__search {
      width: 100%;
    }
  }
  @media screen and (min-width: 1100px) {
    .section-table__header--col {
      flex-wrap: nowrap;
    }
  }
  @media screen and (max-width: 992px) {
    .section-table__search--label {
      position: absolute !important;
    }
  }

  .section-table__head-th:last-child {
    .drop-down-absolute__block.is-right-default {
      right: 51px !important;

      @media screen and (max-width: 1440px) {
        right: 16px !important;
      }
    }
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
    padding-top: 100px;
    transition: all .3s ease;

    @media screen and (max-width: 992px) {
      padding-top: 150px;
    }
  }
`
