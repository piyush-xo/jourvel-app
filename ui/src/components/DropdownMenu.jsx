import React from "react";
import "./DropdownMenu.css";
import { useNavigate } from "react-router-dom";

function DropdownMenu(props) {
  const navigate = useNavigate();
  return (
    <>
      <label class="popup">
        <input type="checkbox" />
        <div class="burger" tabindex="0">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav class="popup-window">
          <ul>
            <li>
              <button onClick={() => navigate("/profile")}>
                <svg
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="14"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle r="4" cy="7" cx="9"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>Your Profile</span>
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/feed")}>
                <svg
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="14"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                <span>Your Trips</span>
              </button>
            </li>
            <hr />
            <li>
              <button>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12H20M12 4V20"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Add a Trip</span>
              </button>
            </li>
            <li>
              <button>
                <svg
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  height="14"
                  width="14"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
                </svg>
                <span>Edit Trips</span>
              </button>
            </li>
            <hr />
            <li>
              <button onClick={() => props.logoutHandler()}>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 21 21"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    fill="none"
                    fill-rule="evenodd"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    transform="translate(2 2)"
                  >
                    <circle cx="8.5" cy="8.5" r="8" />

                    <g transform="matrix(0 1 -1 0 17 0)">
                      <path d="m5.5 11.5 6-6" />

                      <path d="m5.5 5.5 6 6" />
                    </g>
                  </g>
                </svg>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </label>
    </>
  );
}

export default DropdownMenu;
