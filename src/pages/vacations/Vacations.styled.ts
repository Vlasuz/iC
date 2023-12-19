import styled from "styled-components";

export const VacationsStyled = styled.section`
  min-height: calc(95vh - 4px);
  
  .section-table__param:nth-child(20),
  .section-table__param:nth-child(7) {
      background: var(--col-accent);
  }
  
  .section-table__param {
    white-space: nowrap;
    form {
      width: calc(100% + 70px);
      height: 50px;
      margin: -30px 0;
      display: block;
      position: relative;
      z-index: 2;
      input {
        width: calc(100% + 30px);
        height: 50px;
        margin: 0 -15px;
        text-align: center;
        display: block;
        background: transparent;
        border: none;
      }
    }
  }
`
