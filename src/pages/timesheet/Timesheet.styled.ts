import styled from "styled-components";

export const TimesheetStyled = styled.section`
  .section-table__row-block:hover {
    .section-table__row-block--span-params {
      .section-table__param {
        background: rgb(235 236 242);
      }
    }
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
      right: 0;
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
  
`