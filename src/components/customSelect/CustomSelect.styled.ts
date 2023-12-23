import styled from "styled-components";

export const CustomSelectStyled = styled.div`
  height: 45px;
  position: relative;
  width: 100%;
  max-width: 88px;
  
  .custom-select__head {
    background: #fff;
    color: #5f6472;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 1px solid rgba(174,182,206,.3);
    width: 100%;
    position: relative;
    span {
      margin-right: 3px;
    }

    input {
      background: transparent;
      //color: transparent;
      border: none;
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 0%;
      max-width: 100%;
    }
  }
  
  svg {
    width: 12px;
    height: 12px;
    margin: 5px;
    -webkit-transition: all .3s ease;-moz-transition: all .3s ease;-ms-transition: all .3s ease;-o-transition: all .3s ease;transition: all .3s ease;
    path {
      stroke: #AEB6CE;
      stroke-width: 18;
      -webkit-transition: all .3s ease;-moz-transition: all .3s ease;-ms-transition: all .3s ease;-o-transition: all .3s ease;transition: all .3s ease;
    }
  }
  
  .custom-select__body {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: calc(100%);
    width: 100%;
    background: #fff;
    box-shadow: 0 0 30px 0 rgba(65,79,124,.08), 0 4px 5px 0 rgba(65,79,124,.1);
    -webkit-transition: all .3s ease;-moz-transition: all .3s ease;-ms-transition: all .3s ease;-o-transition: all .3s ease;transition: all .3s ease;
    max-height: 300px;
    overflow: auto;
    z-index: 2;
    
    &_top {
      top: auto;
      bottom: 100%;
    }
    
    li {
      font-size: 14px;
      color: #4d4d4d;
      text-align: center;
      padding: 15px;
      cursor: pointer;
      -webkit-transition: all .3s ease;-moz-transition: all .3s ease;-ms-transition: all .3s ease;-o-transition: all .3s ease;transition: all .3s ease;
      &.li-active,
      &:hover {
        background: rgba(150, 159, 187, 0.102);
        color: #EF3129;
      }
    }
  }
  
  &.is-active {
    z-index: 2;
    .custom-select__head {
      svg {
        -webkit-transform: scaleY(-1);-moz-transform: scaleY(-1);-ms-transform: scaleY(-1);-o-transform: scaleY(-1);transform: scaleY(-1);
        path {
          stroke: #EF3129;
        }
      }
    }
    .custom-select__body {
      top: calc(100% + 10px);
      opacity: 1;
      visibility: visible;
      
      &_top {
        top: auto;
        bottom: calc(100% + 10px);
      }
    }
  }
`
