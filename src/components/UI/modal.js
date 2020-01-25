import React, { Component } from 'react'
import styled from 'styled-components'

import Backdrop from './backdrop'


const StyledBoxModal = styled.div`
    position: fixed;
    left: 10%;
    top: 15%;
    height: 80%;
    width: 80%;
    z-index: 100;
    background-color: #eee;
    border-radius: 3px;
    box-shadow: 0 2px 3px rgba(10,10,10,0.1), 0 0 0 1px rgba(10,10,10,0.1);
    display: flex;
    padding: 1.25rem;
    flex-direction: column;
    transition: all 0.3s ease-out;
    transform: ${props=> props.show ? 'scale(1)' : 'scale(0)'};
    opacity: ${props => props.show ? '1': '0'};
    overflow: scroll;
    div{
        margin-bottom: 1rem;
    }
    @media (min-width: 768px){
        max-width: 500px;
        left: 50%;
        margin-left: -250px;
        height: 80%;
    }
    @media (min-width: 1024px){
        max-width: 500px;
        left: 50%;
        margin-left: -250px;
        height: 80%;
    }
`

class Modal extends Component{
    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    render () {
        return (
            <>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <StyledBoxModal show={this.props.show}>
                    {this.props.children}
                </StyledBoxModal>
            </> 
        )
    }
}

export default Modal;