import React from "react"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
        font-display: fallback;
    }
    *::-webkit-scrollbar-track{
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	    border-radius: 10px;
	    background-color: #F5F5F5;
    }
    *::-webkit-scrollbar {
        width: 12px;
	    background-color: #F5F5F5;
    }
    *::-webkit-scrollbar-thumb{
        border-radius: 10px;
	    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	    background-color: #000;
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
