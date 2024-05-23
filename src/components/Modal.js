import React from 'react';

function Modal() {
  return (
    <div id="actionModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <span className="close">&times;</span>
        <h2>What do you want to do with this player?</h2>
        <button className="bg-red-500 text-white px-4 py-2 rounded mt-4">Delete Account</button>
      </div>
    </div>
  );
}

export default Modal;
