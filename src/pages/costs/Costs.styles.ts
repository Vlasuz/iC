import styled from "styled-components";

export const CostsStyles = styled.section`
  .project-popup__item.is-active a {
    color: #EF3129;
  }
  .project-popup__item.is-active a:before {
    opacity: 1;
    background: rgba(151, 160, 187, 0.15);
  }


  .drop-down__list-date li.is-active a {
    background: rgba(151, 160, 187, 0.15);
    color: #EF3129;
  }
  .section-table__head-th .project-popup__item.is-active a {
    color: #EF3129;
    &:before {
      background: rgba(151, 160, 187, 0.15);
      opacity: 1;
    }
  }
`