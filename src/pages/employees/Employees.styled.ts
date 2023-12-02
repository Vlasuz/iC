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
`
