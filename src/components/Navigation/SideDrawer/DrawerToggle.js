import React from "react"
import styled from "styled-components"

const DrawerStyled = styled.div`
  width: 24px;
  height: 3px;
  position: relative;
  z-index: 1000;
  margin: 1rem 1rem;
  background: ${props =>
    props.active ? "rgba(255,255,255,0)" : "rgba(255,255,255,1)"};
  border-radius: 2px;
  transition: all 250ms cubic-bezier(0.68, -0.55, 0.265, 1.55) 0s;

  &::before {
    content: " ";
    top: ${props => (props.active ? "0px" : "-7px")};
    width: ${props => (props.active ? "24px" : "20px")};
    right: 0px;
    height: 3px;
    position: absolute;
    border-radius: 2px;
    background: rgba(255,255,255,1);
    transition: all 250ms cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
    transform: ${props => (props.active ? "rotate(225deg)" : "rotate(0)")};
  }
  &::after {
    content: " ";
    top: ${props => (props.active ? "0px" : "7px")};
    width: ${props => (props.active ? "24px" : "16px")};
    right: 0px;
    height: 3px;
    position: absolute;
    border-radius: 2px;
    background: rgba(255,255,255,1);
    transition: all 250ms cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
    transform: ${props => (props.active ? "rotate(-225deg)" : "rotate(0)")};
  }
  @media (min-width: 1200px) {
    width: 36px;
    height: 5px;
    border-radius: 2px;
    &::before {
      content: " ";
      top: ${props => (props.active ? "0px" : "-13px")};
      width: ${props => (props.active ? "36px" : "29px")};
      right: 0px;
      height: 5px;
      border-radius: 2px;
    }
    &::after {
      content: " ";
      top: ${props => (props.active ? "0px" : "13px")};
      width: ${props => (props.active ? "36px" : "22px")};
      right: 0px;
      height: 5px;
      border-radius: 2px;
    }
  }
`
const drawerToggle = props => (
  <div role="navigation" onKeyDown={props.clicked} onClick={props.clicked} style={{ cursor: "pointer" }}>
    <DrawerStyled active={props.active} />
  </div>
)

export default drawerToggle
