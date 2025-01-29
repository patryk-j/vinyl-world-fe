import React, { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Form, Input, Card, Table, Button as ButtonAnt, message } from "antd";

import axios from "../utils/axiosInterceptor.js";
import moment from "moment";

const AdminPanel = () => {
  const [data, setData] = useState();
  const [reservationsData, setReservationsData] = useState();

  const [form] = Form.useForm();
  const fetchData = () => {
    axios
      .get("/adminpanel/getVinyls")
      .then((response) => {
        const vinyls = response.data;
        setData(vinyls);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getReservations = () => {
    axios
      .get("/profile/getReservations")
      .then((response) => {
        const reservations = response.data;
        setReservationsData(reservations);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //GET VINYLS
  useEffect(() => {
    fetchData();
    getReservations();
  }, []);

  // DELETE VINYL
  const handleDelete = (record) => {
    axios
      .delete("/adminpanel/deleteVinyl", { data: { _id: record._id } })
      .then((response) => {
        fetchData();
        getReservations();
        message.success("The vinyl has been successfully deleted.");
      })
      .catch((error) => {
        console.error("Error:", error);
        message.error(error.response.data.message);
      });
  };

  //DELETE RESERVATION
  const handleDeleteUser = (record) => {
    axios
      .delete("/adminpanel/deleteReservation", { data: { _id: record._id } })
      .then(() => {
        getReservations();
        message.success("The reservation has been successfully deleted.");
      })
      .catch((error) => {
        console.error("Error:", error);
        message.error(error.response.data.message);
      });
  };

  // ADD VINYL
  const onFinish = async (values) => {
    try {
      await axios.post("/adminpanel/add", values);
      fetchData();
      message.success("The new disc has been successfully added");
    } catch (error) {
      message.error(error.response.data.message);
    } finally {
      form.resetFields();
    }
  };

  const defaultColumns = [
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
          Delete vinyl
        </ButtonAnt>
      ),
    },
  ];

  const defaultColumnsForUser = [
    {
      title: "User / Reservation ID",
      dataIndex: "userId",
      render: (_, record) => (
        <div className="flex flex-col">
          <span>{record.email}</span>
          <span>{record._id}</span>
        </div>
      ),
    },
    {
      title: "Vinyl",
      dataIndex: "vinylId",
      render: (_, record) => (
        <div>
          {record.artist} - {record.title}
        </div>
      ),
    },
    {
      title: "Date from",
      dataIndex: "dateFrom",
      render: (_, record) => (
        <div>{moment(record.rentalDate[0]).format("YYYY-MM-DD")}</div>
      ),
    },
    {
      title: "Date to",
      dataIndex: "dateTo",
      render: (_, record) => (
        <div>{moment(record.rentalDate[1]).format("YYYY-MM-DD")}</div>
      ),
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record, index) => (
        <ButtonAnt
          className="flex justify-center items-center"
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteUser(record)}
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

  const columnsForUsers = defaultColumnsForUser.map((col) => {
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
        Admin Panel
      </h1>
      <div className="flex flex-row items-center justify-center min-h-[70vh]">
        <Card className="w-1/2 mr-10">
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              label="Add a new disc
"
            >
              <Form.Item
                name="artist"
                rules={[
                  {
                    required: true,
                    message: "Required field!",
                    validateTrigger: "onSubmit",
                  },
                  {
                    max: 30,
                    message: "Maximum number of characters: 30",
                    validateTrigger: "onSubmit",
                  },
                ]}
              >
                <Input placeholder="Enter artist name" />
              </Form.Item>
              <Form.Item
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Required field!",
                    validateTrigger: "onSubmit",
                  },
                  {
                    max: 50,
                    message: "Maximum number of characters: 30",
                    validateTrigger: "onSubmit",
                  },
                ]}
              >
                <Input placeholder="Enter board name" />
              </Form.Item>
              <ButtonAnt
                type="primary"
                className="bg-white text-black border-gray-200"
                htmlType="submit"
              >
                Add
              </ButtonAnt>
            </Form.Item>
            <h1 className="text-2xl font-extralight flex justify-center pb-4">
              All vinyl records
            </h1>
            <Table
              scroll={{ x: 725 }}
              pagination={false}
              bordered
              dataSource={data}
              columns={columns}
              rowKey={(record) => record.id}
            />
            <Card>
              <h1 className="text-2xl font-extralight flex justify-center pb-4">
                List of current bookings
              </h1>
              <Table
                scroll={{ x: 725 }}
                pagination={false}
                bordered
                dataSource={reservationsData}
                columns={columnsForUsers}
                rowKey={(record) => record.id}
              />
            </Card>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
