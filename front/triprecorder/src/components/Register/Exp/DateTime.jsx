import { DatePicker, Form } from "antd";
import dayjs from "dayjs";
import React from "react";

const DateTime = () => {
  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  const disabledDateTime = () => ({
    disabledHours: () => range(0, 24).splice(), //splice(4, 20) : 4~비활성화
    disabledMinutes: () => range(), //range(30, 60) : 30~비활성화
  });
  return (
    <div>
      <Form.Item
        label="날짜+시간"
        name="dateTime"
        rules={[
          {
            required: true,
            message: "결제 날짜/시간을 설정해주세요!",
          },
        ]}
      >
        <DatePicker
          format="YYYY-MM-DD HH:mm"
          disabledTime={disabledDateTime}
          showTime={{
            defaultValue: dayjs("00:00", "HH:mm"),
          }}
        />
      </Form.Item>
    </div>
  );
};

export default DateTime;
