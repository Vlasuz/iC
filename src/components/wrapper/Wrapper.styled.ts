import styled from "styled-components";

export const WrapperStyled = styled.div`
  width: 100%;
  //height: 100%;
  .simplebar-content {
    padding: 30px 50px;
    //height: 100%;
    
    @media screen and (max-width: 992px) {
      padding: 15px 15px 30px;
    }
  }

  .main__inner section {
    transition: padding-bottom .4s ease;
    width: 100%;
  }
`
