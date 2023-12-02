import styled from "styled-components";

export const AppStyled = styled.div`
  .css-1u9des2-indicatorSeparator {
    display: none;
  }

  .css-t3ipsp-control:hover,
  .css-t3ipsp-control {
    border-color: rgba(174, 182, 206, 0.3);
    box-shadow: none;
  }

  .css-15lsz6c-indicatorContainer,
  .css-1xc3v61-indicatorContainer {
    padding: 0;
    padding-right: 10px;
  }

  .css-1fdsijx-ValueContainer {
    padding-right: 0;
  }

  .main {
    animation: none;
    opacity: 1;
  }

  .fade-exit-active {
    opacity: 0;
    transition: all .3s ease;
  }
  .fade-enter-done {
    transition: all .3s ease;
    opacity: 1;
  }
  .fade-enter-active {
    position: absolute;
    opacity: 0;
  }
`
