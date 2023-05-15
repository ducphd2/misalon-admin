import { Suspense, useEffect, useMemo, useState } from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import StatCard from "../../components/StatCard/StatCard";
import { httpService } from "../../redux/service/httpService";
import "./Dashboard.scss";
import Chart from "./components/ChartYear";
import ChartDate from "./components/ChartDate";

export default function Dashboard() {
  const [statData, setStartData] = useState([]);
  const merchant: any = useMemo(() => {
    const merchantString = localStorage.getItem("merchant");
    if (merchantString) return JSON.parse(merchantString);
    else return null;
  }, []);

  useEffect(() => {
    const getStat = async () => {
      try {
        const res: any = await httpService.GET({
          uri: `statistics/overview?merchantId=${merchant?.id}`,
        });
        const result: any = Object.entries(res.result.statistic).map(
          ([title, value]) => ({ title, value })
        );
        setStartData(result);
      } catch (error) {
        console.log({ error });
      }
    };

    if (!!merchant) {
      getStat();
    }
  }, [merchant]);
  const renderStatCard = () => {
    return statData?.map((i: any) => {
      return <StatCard title={i.title} value={i.value} />;
    });
  };
  // const cx = classNames.bind(styles);

  return (
    <Suspense fallback={<></>}>
      <MainLayout title="Thống kê">
        <div className="dashboard">{renderStatCard()}</div>
        <h3 className="titleChart">Biểu đồ doanh thu</h3>
        <div className="charts">
          <div className="years">
            <Chart />
          </div>
          <div className="years">
            <ChartDate />
          </div>
        </div>
      </MainLayout>
    </Suspense>
  );
}
