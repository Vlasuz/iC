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
  
  
  .summary-item__element--name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  @media screen and (max-width: 768px) {
    .summary-item__target--toggle {
      margin-top: -25px;
    }
  }
`
