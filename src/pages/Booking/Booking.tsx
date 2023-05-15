import classNames from "classnames/bind";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import PageSizeSelector from "../../components/PageSizeSelector";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

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
import { imageUpload } from "../../common/utils";
import Schedule from "../../components/Schedule/Schedule";
import { formatDate } from "@fullcalendar/core";

const MainLayout = lazy(() => import("../../components/MainLayout"));
const Table = lazy(() => import("../../components/Table"));
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
    sortBy: "name",
    sortOrder: "ASC",
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
      dispatch(getBookings(path));
    }

    return () => {
      dispatch(resetStatusDeleteBooking(0));
    };
  }, [path.page, path.limit, path.sortBy, path.sortOrder, statusDelete]);

  console.log({ selectBookings });
  return (
    <Suspense fallback={<></>}>
      <MainLayout
        title="Booking"
        // titleButton="Thêm Cuộc hẹn"
        handleClickAdd={handleAddBooking}
      >
        <div className={cx("skill-page")}>
          <div className={cx("total-page")}>
            <div className="row">
              <PageSizeSelector
                listPageSize={pageSizeList}
                onPageSizeChange={setLimit}
              />
            </div>
          </div>
          {loading ? (
            <Loading height="500px" />
          ) : (
            <>
              <Suspense fallback={<></>}>
                <Table classCustom={cx("custom-table")}>
                  <thead>
                    <tr>
                      {List.map((item, index) => {
                        return <th key={index}>{item.title}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {selectBookings?.map((e: BookingRes, idx: number) => {
                      return (
                        <tr key={e.id}>
                          <td>
                            <p className={cx("table-stt")}>
                              <span>{idx + 1}</span>
                            </p>
                          </td>
                          <td>{e.startTime + "-" + e.endTime}</td>
                          <td>{e.note}</td>
                          <td>{e.bookingDate}</td>
                          <td>{e?.status=='1'? <span style={{color:'green'}}>Đã chấp nhận</span>:"Chưa chấp nhận"}</td>
                          <td className={cx("text-right", "dropdown")}>
                            <Suspense fallback={<></>}>
                              <DropDownEdit
                                deleteCondition={true}
                                customClass={cx("dropdown-skill")}
                                handleEdit={() => handleEditBooking(e)}
                                handleDelete={() => handleDelete(e)}
                              />
                            </Suspense>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Suspense>
            </>
          )}
          <div className={cx("pagination")}>
            <span className={cx("showing")}>
              Showing {page} to {limit > totalBooking ? totalBooking : limit} of{" "}
              {totalBooking} entries
            </span>
            <Suspense>
              <Pagination
                currentPage={page}
                pageSize={limit}
                totalData={totalBooking}
                onChangePage={handleChangePage}
              />
            </Suspense>
          </div>
          <Suspense>
            <Modal
              isModal={show}
              title={
                newBooking.current
                  ? "Thêm cuộc hẹn"
                  : "Cập nhật trạng thái"
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
