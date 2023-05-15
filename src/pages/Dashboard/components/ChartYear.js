import React, { useEffect, useMemo, useState } from "react";
import { CChart } from "@coreui/react-chartjs";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { httpService } from "../../../redux/service/httpService";
import YearDropdown from "./YearDropdown";

function getLast20Years() {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 21 }, (_, index) => currentYear - 20 + index);
}

export default function Chart() {
  const [data, setData] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

  const merchant = useMemo(() => {
    const merchantString = localStorage.getItem("merchant");
    if (merchantString) return JSON.parse(merchantString);
    else return null;
  }, []);
  useEffect(() => {
    const getYearData = async () => {
      const res = await httpService.GET({
        uri: `statistics/revenue-year?year=${year}&merchantId=${merchant.id}`,
      });
      const data = res.result.statistic.map((i) => {
        return i.total;
      });
      setData(data);
    };

    getYearData();
  }, [year]);

  const handleChangeYear = (e) => {
    setYear(e);
    console.log({ e });
  };
  return (
    <>
      <YearDropdown onSelect={handleChangeYear} />
      <CChart
        type="bar"
        data={{
          labels: [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
          ],
          datasets: [
            {
              label: "Doanh thu tháng theo năm",
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
