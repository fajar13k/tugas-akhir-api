import { set } from "js-cookie";
import { useEffect, useState } from "react";
import CardDashboard from "../components/card/CardDashboard";
import DashboardChart from "../components/chart/DashboardChart";
import TableDashboard from "../components/table/TableDashboard";
import { useAuth } from "../context/auth";
import { api, authenticateAPI } from "../utils/API";

const Dashboard = () => {
  const { authenticate, token } = useAuth();

  const [meta, setMeta] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const getAllClasification = async () => {
    setLoading(true);

    const fetch = await api.get(`masker?limit=${limit}&page=${page}`);

    if (fetch) {
      setLoading(false);
      setData(fetch.data.data);
      setMeta({
        page: fetch.data.page,
        pages: fetch.data.pages,
        count: fetch.data.count,
      });
    }
  };

  const handleClickPagination = (button, number) => {
    if (button === "prev") {
      if (page !== 1) {
        setPage(page - 1);
      }
    }

    if (button === "next") {
      if (page !== meta?.pages) {
        setPage(page + 1);
      }
    }

    if (button === "number") {
      setPage(number);
    }
  };

  const tableColumn = ["Klasifikasi", "Akurasi", "Tanggal"];
  const dataChart = {
    labels: ["Bermasker", "Tidak Bermasker"],
    datasets: [
      {
        label: "Graphics",
        data: [data?.masked, data?.unmasked],
        backgroundColor: ["rgba(25, 135, 84, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(25, 135, 84, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    authenticateAPI(token);
    authenticate();
  }, []);

  useEffect(() => {
    getAllClasification();
  }, [page, limit]);

  return (
    <div className="container">
      <div className="d-flex w-100">
        <CardDashboard
          title="Bermasker"
          titleClassName="text-success"
          count={data?.masked}
        />
        <CardDashboard
          title="Tidak Bermasker"
          titleClassName="text-danger"
          count={data?.unmasked}
        />
      </div>

      <div>
        <TableDashboard
          title="Klarifikasi Terbaru"
          column={tableColumn}
          data={data?.result}
          meta={meta}
          loading={isLoading}
          onChangePagination={handleClickPagination}
          onChangeLimit={(limit) => {
            setLimit(limit);
            setPage(1);
          }}
          limit={limit}
        />
      </div>

      <div>
        <DashboardChart data={dataChart} loading={isLoading} />
      </div>
    </div>
  );
};

export default Dashboard;