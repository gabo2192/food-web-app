import React from 'react'
import styled from 'styled-components'
import NavItems from '../NavItems/NavItems'


const SideDraw = styled.div`
    position: fixed;
    height: calc(100vh - 56px);
    top: 56px;
    left: 0;
    width: 100%;
    background-color: black;
    z-index: 200;
    padding: 1rem;
    box-sizing: border-box;
    transition: transform 0.3s ease-out;
    transform: ${props => props.open ? "translateY(0)" : "translateY(-200%)"};
`

const SideDrawer = (props) =>{
    return(
        <SideDraw open={props.open}>
            <NavItems 
                clicked={props.drawerToggleClicked}
            />
        </SideDraw>
    )
}

export default SideDrawer