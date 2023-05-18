import classNames from "classnames/bind";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import PageSizeSelector from "../../components/PageSizeSelector";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Table } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";

import {
  addBooking,
  deleteBooking,
  editBooking,
  getBookings,
  resetStatusDeleteBooking,
  selectLoadingBooking,
  selectBookingList,
  selectStatusDeleteBooking,
  selectTotalBooking,
} from "../../redux/slice/Booking/BookingSlice";
import {
  EditBookingReq,
  GetBookingReq,
  BookingRes,
} from "../../redux/types/Booking/booking";
import ModalBooking from "./ModalBooking/ModalBooking";
import styles from "./Booking.module.scss";

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

export default function Booking() {
  const cx = classNames.bind(styles);
  const List = [
    { title: "#" },
    { title: "Thời gian" },
    { title: "Note" },
    { title: "Ngày hẹn" },
    { title: "Trạng thái" },
    { title: "Action" },
  ];
  const dispatch = useAppDispatch();

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
  const [selected, setSelected] = useState<BookingRes>({
    id: "",
  });
  const [sort, setSort] = useState<SortType>({ sortBy: "", type: "" });
  const [path, setPath] = useState<GetBookingReq>(initial);
  const [page, setPage] = useState<number>(1);

  const selectBookings = useAppSelector(selectBookingList);
  console.log(selectBookings);
  const loading = useAppSelector(selectLoadingBooking);
  const statusDelete = useAppSelector(selectStatusDeleteBooking);
  const totalBooking = useAppSelector(selectTotalBooking);
  const handleEditBooking = (e: BookingRes) => {
    setShow(true);
    newBooking.current = false;
    setSelected(e);
  };

  const handleAddBooking = () => {
    setShow(true);
    newBooking.current = true;
  };

  const handleDelete = (e: BookingRes) => {
    setShowModelConfirm(true);
    setSelected(e);
  };

  const confirmDelete = () => {
    const req = {
      id: selected.id,
    };
    dispatch(deleteBooking(req));
    setShowModelConfirm(false);
  };
  const columns: any = [
    {
      title: "STT",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any, index: number) => <>{index + 1}</>,
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
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
          <FiEdit size={26} color="#01C5FB" />{" "}
          <AiOutlineDelete size={26} color="#e91e63" />
        </div>
      ),
    },
  ];
  const handleChangePage = (e: number) => {
    setPage(e);
  };

  useEffect(() => {
    setLimit(limit);
    setPath({ ...path, limit: limit });
  }, [limit]);

  useEffect(() => {
    setPath({ ...path, page: page });
  }, [page]);

  useEffect(() => {
    if (sort.type !== "") {
      setPath({ ...path, sortOrder: sort.type });
    }
  }, [sort.type]);

  useEffect(() => {
    if (sort.sortBy !== "") {
      setPath({ ...path, sortBy: sort.sortBy });
    }
  }, [sort.sortBy]);

  useEffect(() => {
    if (path || statusDelete === true) {
      console.log({ path });
      dispatch(getBookings(path));
    }

    return () => {
      dispatch(resetStatusDeleteBooking(0));
    };
  }, [path.page, path.limit, path.sortBy, path.sortOrder, statusDelete]);

  return (
    <Suspense fallback={<></>}>
      <MainLayout
        title="Booking"
        // titleButton="Thêm Cuộc hẹn"
        handleClickAdd={handleAddBooking}
      >
        <div className={cx("skill-page")}>
          {loading ? (
            <Loading height="500px" />
          ) : (
            <>
              <Suspense fallback={<></>}>
                <Table
                  columns={columns}
                  dataSource={selectBookings}
                  rowKey="id"
                />
              </Suspense>
            </>
          )}
          <Suspense>
            <Modal
              isModal={show}
              title={
                newBooking.current ? "Thêm cuộc hẹn" : "Cập nhật trạng thái"
              }
              setOpenModals={setShow}
            >
              <ModalBooking
                onCloseModal={() => setShow(false)}
                defaultValue={newBooking.current ? null : selected}
              />
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
