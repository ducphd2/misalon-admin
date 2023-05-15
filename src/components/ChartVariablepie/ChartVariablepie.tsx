import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import variablePie from "highcharts/modules/variable-pie.js";

variablePie(Highcharts);

const fakeData = [
  {
    name: "Spain",
    y: 50,
    score: 5,
  },
  {
    name: "France",
    y: 25,
    score: 5,
  },
  {
    name: "Poland",
    y: 25,
    score: 5,
  },
];

type TChartVariablepie = {
  data?: any;
};

function ChartVariablepie({ data = fakeData }: TChartVariablepie) {
  const options = {
    chart: {
      type: "variablepie",
      renderTo: "container",
      backgroundColor: null,
    },
    title: {
      text: "",
      // align: 'left'
    },
    tooltip: {
      headerFormat: "",
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
        "Score (max 10): <b>{point.score}/10</b><br/>",
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        minPointSize: 60,
        innerSize: "20%",
        zMin: 0,
        name: "countries",
        data: data,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default ChartVariablepie;
