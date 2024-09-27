{/* <html>
<head>
<title>Save Button</title>
<link rel="stylesheet" href="saveButton.css">
</head>
<body>
<button>
  <div class="svg-wrapper-1">
    <div class="svg-wrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="30"
        height="30"
        class="icon"
      >
        <path
          d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z"
        ></path>
      </svg>
    </div>
  </div>
  <span>Save</span>
</button>
</body>
</html> */}

import React from 'react';

const SaveButton = () => {
  return (
    <button
      className="font-inherit text-2xl bg-gray-800 text-white fill-gray-400 px-4 py-2 rounded-lg flex items-center cursor-pointer border-none font-black transition-transform duration-300 ease-in-out transform hover:bg-black hover:scale-95 active:scale-95"
    >
      <div className="svg-wrapper-1">
        <div className="svg-wrapper transition-transform duration-300 ease-in-out transform hover:scale-125">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="30"
            height="30"
            className="transition-transform duration-300 ease-in-out transform hover:translate-x-4 hover:scale-110 hover:fill-white"
          >
            <path
              d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z"
            ></path>
          </svg>
        </div>
      </div>
      <span className="ml-1.5 transition-opacity duration-500 ease-in-out hover:opacity-0">Save</span>
    </button>
  );
};

export default SaveButton;
