import styled from "styled-components";

export const ProjectStyled = styled.section`
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
  }
`