import styled from "styled-components";

export const EmployeesStyled = styled.div`
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

  .simplebar-content-wrapper {
    height: 100% !important;
  }
  .section-table__main--container {
    overflow: visible;
  }
`
