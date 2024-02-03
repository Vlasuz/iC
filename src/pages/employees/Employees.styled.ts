import styled from "styled-components";

export const EmployeesStyled = styled.section`
  min-height: calc(95vh - 4px);

  @media screen and (max-width: 992px) {
    min-height: calc(100vh - 115px);
  };

  @media screen and (max-width: 992px) {
    min-height: calc(100vh - 115px);
  };

  .section-table__row {
    border-bottom: 1px solid rgba(95, 100, 114, 0.1);
  }
  
  .section-table {
    padding-bottom: 0;
  }
  .section-table__footer {
    //margin-top: auto;
    margin-top: 20px;
  }

  .table-employees {
    z-index: 1;
  }
  
  .drop-down-absolute__block {
    z-index: 1;
  }
  
  .drop-down__list li.is-active {
    background: rgba(150, 159, 187, 0.102);
    a {
      color: var(--accent);
    }
  }
  
  .drop-down__list li a {
    justify-content: flex-start;
  }

  .simplebar-content-wrapper {
    //height: 100% !important;
  }
  .section-table__main--container {
    overflow: visible;
  }

  @media screen and (max-width: 992px) {
    .section-table__search--label {
      position: absolute !important;
    }
  }
`
