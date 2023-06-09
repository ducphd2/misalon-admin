import { Suspense, useEffect, useMemo, useState } from 'react';
import MainLayout from '../../components/MainLayout/MainLayout';
import StatCard from '../../components/StatCard/StatCard';
import { httpService } from '../../redux/service/httpService';
import './Dashboard.scss';
import ChartDate from './components/ChartDate';
import Chart from './components/ChartYear';

interface ResData {
  title: string;
  value: any;
}

export default function Dashboard() {
  const [statData, setStartData] = useState([]);
  const merchant: any = useMemo(() => {
    const merchantString = localStorage.getItem('merchant');
    if (merchantString) return JSON.parse(merchantString);
    else return null;
  }, []);

  useEffect(() => {
    const getStat = async () => {
      try {
        const res: any = await httpService.GET({
          uri: `statistics/overview?merchantId=${merchant?.id}`,
        });
        const result: ResData[] = [];
        Object.entries(res.result.statistic).forEach(([title, value]) => {
          if (title === 'branch') {
            result.push({ title: 'Chi nhánh', value });
          } else if (title === 'service') {
            result.push({ title: 'Dịch vụ', value });
          } else if (title === 'customer') {
            result.push({ title: 'Khách hàng', value });
          } else if (title === 'booking') {
            result.push({ title: 'Lịch hẹn', value });
          }
        });

        setStartData(result as never[]);
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
      return <StatCard key={i.value} title={i.title} value={i.value} />;
    });
  };
  // const cx = classNames.bind(styles);

  return (
    <Suspense fallback={<></>}>
      <MainLayout title="Thống kê">
        <div className="dashboard">{renderStatCard()}</div>
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
