import styled from "styled-components";

export const SummaryEmployeesStyled = styled.section`
  min-height: calc(95vh - 4px);
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
  
  .page-header__select.employees-row__sort .select{
    width: 100%;
    max-width: 100%;
    height: 45px;
    
    .custom-select__head {
      height: 100%;
    }
  }

  .page-footer__row-per-page {
    white-space: nowrap;
    justify-content: flex-end;
    width: 300px;
    margin-left: auto;
  }

  .page-footer {
    margin-top: auto;
    padding-top: 20px;
    width: 100%;
  }
  
  .summary-item__user--avatar img {
    -webkit-border-radius: 50%;-moz-border-radius: 50%;border-radius: 50%;
  }

  .summary-item__element--name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
