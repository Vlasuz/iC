import styled from "styled-components";

export const LoginStyled = styled.form`
  .btn:disabled {
    background: grey;
    border: grey solid 1px;
    cursor: default;
  }
  p.error {
    color: red;
    font-size: 17px;
  }
  
  .login__checkbox {
    margin-top: 5px;
    margin-bottom: 10px;
    
    @media screen and (max-width: 768px) {
      margin-bottom: 5px;
    }
  }
  
  .input_placeholder {
    position: relative;
    display: flex;
    align-items: center;
    input:focus + .placeholder {
      opacity: 0;
    } 
    .placeholder {
      position: absolute;
      left: 20px;
      opacity: .5;
      user-select: none;
      -webkit-transition: all .2s ease;-moz-transition: all .2s ease;-ms-transition: all .2s ease;-o-transition: all .2s ease;transition: all .2s ease;
    }
  }
`
