// import React, { useState } from 'react';

// function DropdownMenu() {


//     function DropdownItem(props) {
//       return (
//         <a href="#" className="menu-item">
//           <span className="icon-button">{props.leftIcon}</span>
//           {props.children}
//           <span className="icon-right">{props.rightIcon}</span>
//         </a>
//       );
//     }
  
//     return (
//       <div className="dropdown">
//           <DropdownItem>Foo</DropdownItem>
//           <DropdownItem leftIcon={<BoltIcon />}>Bar</DropdownItem>
//       </div>
//     )
//   }
// export default DropdownMenu;
import MenuItems from "./MenuItems";
const Dropdown = ({ submenus, dropdown, depthLevel }) => {
  depthLevel = depthLevel + 1;
  const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";
  return (
    <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
      {submenus.map((submenu, index) => (
        <MenuItems items={submenu} key={index} depthLevel={depthLevel} />
      ))}
    </ul>
  );
};

export default Dropdown;
