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
  
`
