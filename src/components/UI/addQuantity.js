import React from "react"
import styled from "styled-components"

import Button from "./button"

const AQButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 90%;
  align-self: center;
  & > span {
    text-align: center;
    width: 40%;
    margin-bottom: 0;
    align-self: center;
  }
  & > button {
    margin-top: 0;
    width: 30%;
  }
`

const addQuantity = props => (
  <AQButton>
    <Button nomargin clicked={props.reduceUnits} disabled={props.disabled} borderRadius>
      -
    </Button>
    <span onChange={props.changed} type="quantity">
      {props.quantity}
    </span>
    <Button nomargin clicked={props.addUnits} borderRadius>
      +
    </Button>
  </AQButton>
)

export default addQuantity
