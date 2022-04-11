import { settingsIcon } from "../assets";

export const Header = ({ handleSetting }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary d-flex justify-content-between">
      <a className="navbar-brand" href="#">
        K-Enterprises
      </a>
      <span className="nav-link" onClick={handleSetting}>
        <img src={settingsIcon} height="20px" />
      </span>
    </nav>
  );
};
