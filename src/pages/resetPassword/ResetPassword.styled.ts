import styled from "styled-components";

export const ResetPasswordStyled = styled.section`
  .login__submit {
    margin-top: 10px;
  }

  p.error {
    color: red;
    font-size: 17px;
  }
  
  .reset-password__thanks {
    text-align: center;
    h1 {
      margin-bottom: 0;
    }
    p {
      margin-top: 20px;
      margin-bottom: 30px;
      color: var(--5-f-6472, #5F6472);
      text-align: center;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 140%;
    }
    .login__submit {
      width: 100%;
      max-width: 300px;
      margin: 0;
    }
  }
`
