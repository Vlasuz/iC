import styled from "styled-components";

export const VacationsStyled = styled.section`
  min-height: calc(95vh - 4px);

  @media screen and (max-width: 992px) {
    min-height: calc(100vh - 115px);
  };
  
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
  
  .section-table__param:hover {
    &:before {
      content: "";
      position: absolute;
      left: -1px;
      top: -10000px;
      width: calc(100% + 1px);
      height: 20000px;
      background: #97A0BB;
      opacity: 0.2;
      pointer-events: none;
    }
  }
  .section-table__param.is-none-vertical-hover:hover {
    &:before {
      display: none;
    }
  }
`
