import styled from "styled-components";

export const SummaryStyled = styled.section`
  .summary-item__element--progress {
    .line {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background: #97a0bb;
      opacity: .5;
    }
  }
  
  .summary-item__total-element--link {
    background: transparent;
    text-align: left;
  }
`