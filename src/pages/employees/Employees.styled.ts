import styled from "styled-components";

export const EmployeesStyled = styled.section`

  .section-table {
    padding-bottom: 0;
    //height: 100%;
    //display: flex;
    //flex-direction: column;
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
`