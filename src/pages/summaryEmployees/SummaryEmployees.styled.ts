import styled from "styled-components";

export const SummaryEmployeesStyled = styled.section`
  min-height: calc(95vh - 4px);
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  padding-bottom: 0;

  @media screen and (max-width: 992px) {
    min-height: calc(100vh - 115px);
  }
  
  .section-table__export .drop-down__block {
    width: max-content;
  }
  
  .page-header__select.employees-row__sort .select{
    width: 100%;
    max-width: 100%;
    height: 45px;
    
    .custom-select__body {
      li {
        text-align: center;
      }
    }
    .custom-select__head {
      height: 100%;
      
      span {
        margin: 0 auto;
      }
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

  .employees-row .select .custom-select__head {
    justify-content: space-between;
  }
  .employees-row .select li {
    text-align: left;
  }
  
  .aside__user--avatar {
    width: 100%;
    height: 100%;
    font-size: 20px;
  }

  @media screen and (max-width: 1200px) {
    .section-table__add-task--project.drop-down .drop-down__block {
      right: 0;
      left: auto;
    }
  }

  @media screen and (max-width: 1440px) {
    .drop-down__target {
      width: 100%;
    }

    .section-table__export {
      max-width: 100%;
    }
  }
  
  .page-footer {
    padding-top: 11px;
  }
  
`
