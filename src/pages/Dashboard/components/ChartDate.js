import React, { useEffect, useMemo, useState } from "react";
import { CChart } from "@coreui/react-chartjs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { httpService } from "../../../redux/service/httpService";

export default function Chart() {
  const [data, setData] = useState([]);
  const [dateSelected, setDateSelected] = useState(new Date());
  const merchant = useMemo(() => {
    const merchantString = localStorage.getItem("merchant");
    if (merchantString) return JSON.parse(merchantString);
    else return null;
  }, []);
  useEffect(() => {
    const getDateData = async () => {
      const res = await httpService.GET({
        uri: `statistics/revenue-date?date=${dateSelected}&merchantId=${merchant.id}`,
      });
      console.log(res.result.statistic);
      const data = res && res.result.statistic.map((i) => {
        return i.total;
      });
      setData(data);
    };

    getDateData();
  }, [dateSelected]);

  return (
    <>
      <div>
        Chọn ngày
        <DatePicker
          selected={dateSelected}
          onChange={(date) => setDateSelected(date)}
        />
      </div>
      <CChart
        type="bar"
        data={{
          labels: ["Tiền mặt", "Chuyển khoản"],
          datasets: [
            {
              label: "Doanh thu theo ngày theo phương thức thanh toán",
              backgroundColor: "#68A3F5",
              data: data,
            },
          ],
        }}
        labels="months"
      />
    </>
  );
}
