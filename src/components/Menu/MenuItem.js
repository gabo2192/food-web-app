import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import Box from "../UI/box"

const MenuText = styled.div`
  position: absolute;
  width: 100%;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  & > h3 {
    margin: 0;
  }
`
const StyledMenu = styled(Link)`
    transition: .5s;
    &:hover {
        & > .category_hover {
            height: 100%;
            & > h3 {
                transform: scale(1.2)
            }
        }
    }
`

const MenuItem = props => {
  const menu = props.menu
  return (
    <Box>
      <StyledMenu to={menu.slug}> 
        <Img fluid={menu.categoryImage.fluid} />
        <MenuText className="category_hover">
          <h3>{menu.title}</h3>
        </MenuText>
      </StyledMenu>
    </Box>
  )
}

export default MenuItem
