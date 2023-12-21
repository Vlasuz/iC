import styled from "styled-components";

export const AsideStyled = styled.aside`
  z-index: 3;
  
  .aside__body--wrapper {
    width: 100%;
  }
  
  .aside__user--avatar img {
    -webkit-border-radius: 50%;-moz-border-radius: 50%;border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .aside__log-out {
    cursor: pointer;
  }
`
