import React from 'react'

const EffectMessage = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="effect">
        {message}
      </div>
    )
  }

export default EffectMessage