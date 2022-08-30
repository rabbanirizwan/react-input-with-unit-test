import React, { useEffect } from 'react'

function Container(props) {
  useEffect(() => {
    document.title = `${props.title} | Freeboh`
    window.scrollTo(0, 0)
  }, [props.title])
  return (
    <div className={`app-container ${props.className}`}>
      {props.children}
    </div>
  )
}

export default Container