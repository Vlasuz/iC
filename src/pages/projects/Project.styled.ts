import styled from "styled-components";

export const ProjectStyled = styled.section`
  min-height: calc(95vh - 4px);

  @media screen and (max-width: 992px) {
    min-height: calc(100vh - 115px);
  };
  
  .section-table__main--container {
    display: flex;
    max-width: 100%;
    flex-direction: row;
    flex-wrap: nowrap;
    gap: 32px;
    align-items: flex-start;
  }
  .section-table__main--wrapper {
    width: 100%;
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

  .section-table__main.is-row-mode {
    z-index: 2;
    margin-bottom: 20px;
  }

  .section-table__footer {
    padding-top: 0 !important; 
  }

  @media screen and (max-width: 992px) {
    .section-table__search--label {
      position: absolute !important;
    }

    .table-projects {
      margin-bottom: 10px;
    }
  }
`
