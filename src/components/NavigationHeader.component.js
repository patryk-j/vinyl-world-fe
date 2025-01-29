import { Layout, Menu, Button } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { TbVinyl } from "react-icons/tb";
import { BsVinyl } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import isAuthenticated from "auth/auth";
import isAdmin from "auth/adminAuth";
import { testId } from "../tests/test-id";
const { Header } = Layout;

const NavigationHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const renderAuthButton = () => {
    if (isAuthenticated()) {
      return (
        <Button
          className="text-white text-lg flex items-center"
          onClick={handleLogout}
        >
          Log out
        </Button>
      );
    } else {
      return (
        <Button className="text-white text-lg flex items-center">
          <Link to="/login">Log in</Link>
        </Button>
      );
    }
  };

  const items = [
    {
      key: "home",
      label: (
        <Menu.Item icon={<HomeOutlined />} key="home">
          <Link to="/home">Home</Link>
        </Menu.Item>
      ),
    },
    {
      key: "rent",
      label: (
        <Menu.Item icon={<BsVinyl />} key="rental">
          <Link to="/rental">{!isAuthenticated() ? "Rental" : "Rent"}</Link>
        </Menu.Item>
      ),
    },
    isAuthenticated()
      ? {
          key: "profile",
          label: (
            <Menu.Item icon={<UserOutlined />} key="profile">
              <Link to="/profile">Profile</Link>
            </Menu.Item>
          ),
        }
      : null,
    isAuthenticated() && isAdmin()
      ? {
          key: "adminpanel",
          label: (
            <Menu.Item icon={<UserOutlined />} key="adminpanel">
              <Link to="/adminpanel">Admin Panel</Link>
            </Menu.Item>
          ),
        }
      : null,
  ];

  return (
    <Header
      className="flex items-center h-[8vh]"
      {...testId("navigation-header")}
    >
      <div className="flex flex-row items-center w-1/3">
        <div className="cursor-pointer flex flex-row items-center">
          <Link to="/home">
            <TbVinyl className="text-white h-10 w-10 -ml-6 mr-4 " />
          </Link>
          <Link to="/home" className="text-white text-3xl font-extralight">
            Vinyl World
          </Link>
        </div>
      </div>
      <div className="w-1/3 flex justify-center">
        <Menu
          theme="dark"
          mode="horizontal"
          className="text-lg"
          items={items.filter((item) => item !== null)}
        />
      </div>
      <div className="w-1/3 flex justify-end">{renderAuthButton()}</div>
    </Header>
  );
};

export default NavigationHeader;
