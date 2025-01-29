import React, { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Card,
  Table,
  Button as ButtonAnt,
  message,
} from "antd";
import jwtDecode from "jwt-decode";
import axios from "../utils/axiosInterceptor.js";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [decodedState, setDecodedState] = useState();
  const [userData, setUserData] = useState();
  const [currentUserReservations, setCurrentUserReservations] = useState();

  const token = localStorage.getItem("token");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const getReservations = () => {
    axios
      .get("/profile/getUserReservations")
      .then((response) => {
        const reservations = response.data;
        setCurrentUserReservations(reservations);
      })
      .catch((error) => {
        message.error(error.response.data.message);
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    getReservations();
  }, []);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setDecodedState(decodedToken);
    }
  }, [token]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    const email = userData.email;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailPattern.test(email);

    if (isValidEmail) {
      axios
        .put("profile/updateEmail", { newEmail: email })
        .then((response) => {
          console.log(response.data.message);
          setDecodedState((prevState) => ({
            ...prevState,
            email: email,
          }));
          message.success(
            "E-mail address has been successfully updated. Log in with new email."
          );
          handleLogout();
        })
        .catch((error) => {
          message.error(error.response.data.message);
        });
      setEditing(false);
    } else {
      message.error(
        "Invalid email format. Enter a valid e-mail like example@example.com"
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  const handleDelete = (record) => {
    axios
      .delete("/profile/deleteReservationForUser", {
        data: { _id: record._id },
      })
      .then(() => {
        getReservations();
        message.success("The reservation has been successfully deleted.");
      })
      .catch((error) => {
        message.error(error.response.data.message);
      });
  };

  const vinylCount = currentUserReservations?.length;

  const defaultColumns = [
    {
      title: "Reservation ID",
      dataIndex: "_id",
      render: (_, record) => (
        <div>{record._id.slice(-6).padStart(record._id.length, "*")}</div>
      ),
    },
    {
      title: "Artist",
      dataIndex: "artist",
      render: (_, record) => <div>{record.artist}</div>,
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (_, record) => <div>{record.title}</div>,
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record, index) => (
        <ButtonAnt
          className="flex justify-center items-center"
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record)}
        >
          Delete reservation
        </ButtonAnt>
      ),
    },
  ];

  const columns = defaultColumns.map((col) => {
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
    };
  });

  return (
    <div className="pb-20">
      <h1 className="header-page-text flex justify-center pt-10 pb-10">
        User Profile
      </h1>
      <div className="flex flex-row items-center justify-center min-h-[80vh]">
        <Card className="w-fit mr-10">
          <Form>
            <h1 className="text-2xl font-extralight flex justify-center pb-4">
              Current rentals
            </h1>
            <Table
              scroll={{ x: 725 }}
              className="w-full"
              pagination={false}
              bordered
              dataSource={currentUserReservations}
              columns={columns}
              rowKey={(record) => record.id}
            />
          </Form>
        </Card>
        <div className="flex flex-col">
          <Card className="mb-10">
            <div className="w-full mb-10">
              <h1 className="text-2xl font-extralight flex justify-center pb-4">
                Profile details
              </h1>
              <Form form={form}>
                <div className="flex justify-center items-center flex-col">
                  <Form.Item label="Name">
                    <span>{decodedState?.name}</span>
                  </Form.Item>
                  <Form.Item label="Email">
                    {editing ? (
                      <Input
                        onChange={(e) =>
                          setUserData({ ...userData, email: e.target.value })
                        }
                      />
                    ) : (
                      <span>{decodedState?.email}</span>
                    )}
                  </Form.Item>

                  {editing ? (
                    <Button onClick={handleSave}>Save</Button>
                  ) : (
                    <Button onClick={handleEdit}>Edit</Button>
                  )}
                </div>
              </Form>
            </div>
          </Card>
          <Card>
            <div className="w-full flex flex-col justify-center items-center">
              <h1 className="text-2xl font-extralight">
                Number of vinyl records rented
              </h1>
              <span className="text-7xl font-extralight">{vinylCount}</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
