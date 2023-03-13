import React, { useState } from 'react';
import './Sidebar.css';

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showUsers, setShowUsers] = useState(false);
  const users = ['Alice', 'Bob', 'Charlie', 'David'];

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    setShowUsers(false);
  }

  const toggleUsers = () => {
    setShowUsers(!showUsers);
  }

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'minimized'}`}>
      {isExpanded && (
        <>
          <button className="expand-button" onClick={toggleExpand}>
            -
          </button>
          <button className="user-button" onClick={toggleUsers}>
            {showUsers ? 'Hide Users' : 'Show Users'}
          </button>
          {showUsers && (
            <div className="user-list">
              {users.map(user => (
                <div key={user} className="user-card">
                  {user}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {!isExpanded && (
        <button className="expand-button" onClick={toggleExpand}>
          +
        </button>
      )}
      <div className="map-container">
        {/* insert your map component here */}
        {/* e.g. <MyMapComponent /> */}
      </div>
    </div>
  );
}

export default Sidebar;
