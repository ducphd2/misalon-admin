import { Table } from "antd";
import classNames from "classnames/bind";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import Button from "../../components/Button/Button";
import { httpService } from "../../redux/service/httpService";
import {
  deleteBooking,
  selectLoadingBooking
} from "../../redux/slice/Booking/BookingSlice";
import { GetBookingReq } from "../../redux/types/Booking/booking";
import { ModalUser } from "./ModalUser";
import styles from "./UserManagement.module.scss";
import { SelectStyle } from "./styles";

const MainLayout = lazy(() => import("../../components/MainLayout"));
const DropDownEdit = lazy(() => import("../../components/DropDownEdit/index"));
const Modal = lazy(() => import("../../components/Modal"));
const Loading = lazy(() => import("../../components/Loading"));
const ModalConfirm = lazy(() => import("../../components/ModalConfirm"));
const Pagination = lazy(() => import("../../components/Pagination"));

interface SortType {
  sortBy: string;
  type: string;
}
type TUser = {
  id: string | number;
  username: string;
  email: string;
  status: string;
  role: string | number;
  phone: string | number;
};

export default function UserManagement() {
  const cx = classNames.bind(styles);
  const dispatch = useAppDispatch();
  const merchant = JSON.parse(localStorage.getItem("merchant") as any);
  const initial = {
    page: 1,
    limit: 10,
  } as GetBookingReq;

  const newBooking = useRef(false);
  const [show, setShow] = useState(false);
  const [modelConfirm, setShowModelConfirm] = useState(false);
  // const [newBooking, setNewBooking] = useState(false);
  const pageSizeList = [10, 25, 50, 100];
  const [limit, setLimit] = useState(pageSizeList[0]);
  const [employees, SetEmployees] = useState([]);
  const [selected, setSelected] = useState<any>({
    id: "",
  });
  const [page, setPage] = useState<number>(1);

  // const selectUsers = useAppSelector(selectUserList);
  const loading = useAppSelector(selectLoadingBooking);
  const handleEditEmp = (e: TUser) => {
    setShow(true);
    newBooking.current = false;
    setSelected(e);
  };

  const handleAddBooking = () => {
    setShow(true);
    newBooking.current = true;
  };

  const confirmDelete = () => {
    const req = {
      id: selected.id,
    };
    dispatch(deleteBooking(req));
    setShowModelConfirm(false);
  };

  const handleChangePage = (e: number) => {
    setPage(e);
  };

  useEffect(() => {
    setLimit(limit);
  }, [limit]);

  const getEmployee = async () => {
    const res:any = await httpService.GET({
      uri: `merchants/${merchant.id}/users`,
      params: {},
    });
    if(res)
    SetEmployees(res.result.items);
  };
  useEffect(() => {
    getEmployee();
  }, []);

  useEffect(() => {
    const setTimeOut= setTimeout(()=>{
      getEmployee();
    },500)
    return ()=>{
      clearTimeout(setTimeOut)
    }
  }, [show]);

  const columns: any = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Created At",
      key: "createdAt",
      dataIndex: "createdAt",
    },
    {
      title: "Updated At",
      key: "updatedAt",
      dataIndex: "updatedAt",
    },
    {
      title: "Action",
      key: "updatedAt",
      render: (text: string, record: any, index: number) => (
        <div>
          <FiEdit size={26} style={{cursor:"pointer"}} color="#01C5FB"  onClick={() => handleEditEmp(record)} />{" "}
          <AiOutlineDelete style={{cursor:"pointer"}} size={26} color="#e91e63" />
        </div>
      ),
    },
  ];
  return (
    <Suspense fallback={<></>}>
      <MainLayout
        title="User management"
        // titleButton="Thêm Cuộc hẹn"
        handleClickAdd={handleAddBooking}
      >
        <div className={cx("skill-page")}>
          <div className={cx("total-page")}>
            <div className="d-flex justify-content-between">
              <SelectStyle
                allowClear
                style={{
                  width: 200,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                }}
                placeholder="Search to status"
                optionLabelProp="label"
                className={"options-select-status"}
                options={[
                  {
                    value: "1",
                    label: "Active",
                  },
                  {
                    value: "2",
                    label: "Inactive",
                  },
                ]}
              />
              <div className={cx("add-user-management")}>
                <Button label="Add new user" onClick={handleAddBooking} />
              </div>
            </div>
          </div>
          {loading ? (
            <Loading height="500px" />
          ) : (
            <>
              <Suspense fallback={<></>}>
                {" "}
                <Table dataSource={employees} rowKey="id" columns={columns} />
              </Suspense>
            </>
          )}
          <div className={cx("pagination")}>
            {/* <span className={cx("showing")}>
              Showing {page} to {limit > totalBooking ? totalBooking : limit} of{" "}
              {totalBooking} entries
            </span> */}
            {/* <Suspense>
              <Pagination
                currentPage={page}
                pageSize={limit}
                totalData={totalBooking}
                onChangePage={handleChangePage}
              />
            </Suspense> */}
          </div>
          <Suspense>
            <Modal
              isModal={show}
              title={
                newBooking.current
                  ? "Tạo mới nhân viên"
                  : "Cập nhật thông tin nhân viên"
              }
              setOpenModals={setShow}
            >
              {newBooking.current ? (
                <ModalUser onCloseModal={() => setShow(false)} />
              ) : (
                <ModalUser
                  onCloseModal={() => setShow(false)}
                  defaultValue={selected}
                />
              )}
            </Modal>
          </Suspense>
          <Suspense>
            <ModalConfirm
              title="Xóa chi cuộc hẹn"
              subTitle={`Bạn chắc chắn muốn xóa cuộc hẹn ? `}
              isModal={modelConfirm}
              confirmText="Delete"
              cancelText="Cancel"
              onClick={confirmDelete}
              setOpenModals={setShowModelConfirm}
            />
          </Suspense>
        </div>
      </MainLayout>
    </Suspense>
  );
}
