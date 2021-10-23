import React from 'react'
import { Link } from 'react-router-dom';

export const SideNav = ({ icon, link }) => {

  const iconColor = '#fff'
  const iconSize = '4rem'

  const renderIcon = () => {
    if (typeof icon === 'string') {
      return <i className="material-icons sidenav-icon">{icon}</i>
    }
    const DataToolIcon = icon
    return <DataToolIcon color={iconColor} width={iconSize}/>
  }

  return (
    <div className="sidenav">
      <Link to="/">
        <h3 className="sidenav-title">Volvo</h3>
      </Link>
      <h4 className="sidenav-sub-title">( workbench )</h4>
      <div className="sidenav-icon">
        <Link to={link}>
          { renderIcon() }
        </Link>
      </div>
    </div>
  )
}
