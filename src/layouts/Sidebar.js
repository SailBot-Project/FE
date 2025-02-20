import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import user1 from "../assets/images/users/user4.jpg";

const navigation = [
  {
    title: "대쉬보드",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "등록",
    href: "/register",
  },
  {
    title: "피드백 분류",
    href: "/feedback",
  },
  {
    title: "개선사항",
  },
  
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div>
      <div className="profilebg" style={{ background: "#41c9e2" }}>
        <div className="p-3 d-flex">
          <img src={user1} alt="user" width="50" className="rounded-circle" />
        </div>
        <div className=" text-white p-2">Steave Rojer</div>
        <div className=" text-white p-2">(주)병점</div>
      </div>
      <div
        className="vh-100"
        style={{
          background: "#F7EEDD",
        }}
      >
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
