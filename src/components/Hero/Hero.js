import React from "react"

import HeroSingle from './HeroSingle'

const Hero = props => {
  return (
    <>
      {props.featured.map(product=><HeroSingle key={product.id} product={product}/>)}
    </>
  )
}

export default Hero
