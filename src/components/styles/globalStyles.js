import React from "react"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        font-display: fallback;
    }
    @media (min-width: 480px) {
        html {
        font-size: 112.5%; /* --> 18px base size */
        }
    }
    @media (min-width: 600px) {
        html {
        font-size: 125%; /* --> 20px base size */
        }
    }
    body{
        overflow-x: hidden;
        height: ${props => props.open && "100vh"};
        background: rgb(238, 238, 238); 
    }
`

const Global = props => (
  <>
    <GlobalStyle open={props.open} />
  </>
)
export default Global
