import { useState } from "react";
import moment from "moment";
import { Button, DatePicker, Form, Card, message } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "../utils/axiosInterceptor.js";

const { RangePicker } = DatePicker;

const Vinyl = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const { _id } = useParams();
  const [form] = Form.useForm();
  const location = useLocation();
  const artist = new URLSearchParams(location.search).get("artist");
  const title = new URLSearchParams(location.search).get("title");

  const disabledDate = (current) => {
    const today = moment().startOf("day");
    const maxSelectableDate = moment().add(10, "day").startOf("day");
    return current && (current < today || current > maxSelectableDate);
  };

  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onFinish = async (values) => {
    try {
      await axios.post("/profile/addReservation", {
        rentalDate: values.rentalDate,
        vinylId: _id,
        artist: artist,
        title: title,
      });
      message.success("The vinyl record has been reserved.");
    } catch (error) {
      message.error(error.response.data.message);
    } finally {
      form.resetFields();
      navigate("/profile");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className=" min-h-[100vh]">
        <h1 className="header-page-text pt-10">Book your own vinyl</h1>
        <h1 className="mb-4 font-extralight text-white text-3xl pt-20">
          {artist} - {title}
        </h1>
        <Card className="w-full">
          <h1 className="text-2xl font-extralight pb-4 flex justify-center">
            Choose the dates you are interested in
          </h1>
          <Form form={form} onFinish={onFinish}>
            <Form.Item name="rentalDate">
              <RangePicker
                className="w-full"
                disabledDate={disabledDate}
                inputReadOnly
                onChange={handleDateChange}
              />
            </Form.Item>
            <Button
              type="primary"
              className="rental-button"
              disabled={!selectedDate}
              htmlType="submit"
            >
              Submit Rental Date
            </Button>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Vinyl;
