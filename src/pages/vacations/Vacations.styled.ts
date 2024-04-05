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

  .section-table__row {
    border-bottom: 1px solid rgba(95, 100, 114, 0.1);
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


  .section-table__param {
    .rectangle {
      position: absolute;
      bottom: -6px;
      right: -6px;
      display: block;
      border: 6px solid transparent;
      border-top: 6px solid var(--accent);
      z-index: 1;
      transform: rotate(-45deg);
    }
  }

  .section-table__comment {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    transition: all .3s ease;
    left: 44px;
    top: 80%;
    z-index: 2;
    border: 1px solid var(--accent);
    resize: none;
    padding: 15px 25px;
    font-size: 14px;
    line-height: 19.6px;
    box-shadow: 0px 0px 30px 0px rgba(65, 79, 124, 0.08), 0px 4px 5px 0px rgba(65, 79, 124, 0.1);
    background: #fff;

    &:hover {
      opacity: 1 !important;
      visibility: visible !important;
    }
  }
  textarea {
    height: 100%;
  }

  .section-table__param_extra:hover .section-table__comment {
    opacity: 1 !important;
    visibility: visible !important;
  }
`
