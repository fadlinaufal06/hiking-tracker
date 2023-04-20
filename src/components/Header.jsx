import React from 'react'
import PortalExample from './PortalExample';
import './modal.css'

function Header() {
  return (
    <>
    <div className='p-6 flex justify-between'>
      {/* Logo */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 622 406"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M524 150C524 232.843 456.843 300 374 300C291.157 300 224 232.843 224 150C224 67.1573 291.157 0 374 0C456.843 0 524 67.1573 524 150Z"
          fill="#F6AD3D"
        />
        <path
          d="M484 160C484 231.797 425.797 290 354 290C282.203 290 224 231.797 224 160C224 88.203 282.203 30 354 30C425.797 30 484 88.203 484 160Z"
          fill="#FFD258"
        />
        <path
          d="M484 160C484 231.797 425.797 290 354 290C282.203 290 224 231.797 224 160C224 88.203 282.203 30 354 30C425.797 30 484 88.203 484 160Z"
          stroke="black"
        />
        <path
          d="M20.3804 404.75H596.486C607.031 404.75 612.838 392.497 606.161 384.335L486.465 238.017C481.469 231.91 472.135 231.902 467.129 238L382.131 341.528C376.978 347.805 367.118 346.907 363.183 339.803L210.233 63.693C205.476 55.1056 193.131 55.1016 188.368 63.686L9.44991 386.186C4.8277 394.517 10.8526 404.75 20.3804 404.75Z"
          fill="#40C88D"
          stroke="black"
        />
      </svg>
      {/* Add User button */}
      <div className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
        <PortalExample/>
      </div>
      
    </div>
    </>
  );
}

export default Header;