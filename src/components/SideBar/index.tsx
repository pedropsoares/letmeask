import { UserType } from "../../types/user.type";
import { auth } from "../../service/firebase";

import logoImg from "../../assets/images/logo.svg";

import "./styles.scss";

export function SideBar({ id, name, avatar }: UserType) {
  const handleSideBar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar?.classList.toggle("active");
  };

  const logout = () => {
    auth.signOut().then(() => {});
    document.location.reload(true);
  };

  return (
    <div className="sidebar">
      <div className="logo_content">
        <div className="logo">
          <img src={logoImg} alt="" />
        </div>
        <i
          onClick={() => {
            handleSideBar();
          }}
          className="bx bx-menu"
          id="btn"
        />
      </div>
      <ul className="nav_list">
        <li>
          <i
            onClick={() => {
              handleSideBar();
            }}
            className="bx bx-search"
          ></i>
          <input type="text" placeholder="Search" />
          <span className="tooltip">Search</span>
        </li>
        <li>
          <a href="./">
            <i className="bx bx-grid-alt"></i>
            <span className="links_name">Dashboard</span>
          </a>
          <span className="tooltip">Dashboard</span>
        </li>
        <li>
          <a href="./">
            <i className="bx bx-user"></i>
            <span className="links_name">User</span>
          </a>
          <span className="tooltip">User</span>
        </li>
        <li>
          <a href="./">
            <i className="bx bx-chat"></i>
            <span className="links_name">Messages</span>
          </a>
          <span className="tooltip">Messages</span>
        </li>
        <li>
          <a href="./">
            <i className="bx bx-pie-chart-alt-2"></i>
            <span className="links_name">Analytics</span>
          </a>
          <span className="tooltip">Analytics</span>
        </li>
        <li>
          <a href="./">
            <i className="bx bx-folder"></i>
            <span className="links_name">File Manager</span>
          </a>
          <span className="tooltip">File Manager</span>
        </li>
        <li>
          <a href="./">
            <i className="bx bx-cart"></i>
            <span className="links_name">Order</span>
          </a>
          <span className="tooltip">Order</span>
        </li>
        <li>
          <a href="./">
            <i className="bx bx-heart"></i>
            <span className="links_name">Saved</span>
          </a>
          <span className="tooltip">Saved</span>
        </li>
        <li>
          <a href="./">
            <i className="bx bx-cog"></i>
            <span className="links_name">Setting</span>
          </a>
          <span className="tooltip">Setting</span>
        </li>
      </ul>
      <div className="profile_content">
        <div className="profile">
          <div className="profile_details">
            <img src={avatar} alt="" />
            <div className="name_job">
              <div className="name">{name}</div>
              <div className="job">Engineer FrontEnd</div>
            </div>
          </div>
          <i
            onClick={() => {
              logout();
            }}
            className="bx bx-log-out"
            id="log-out"
          ></i>
        </div>
      </div>
    </div>
  );
}
