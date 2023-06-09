import React from 'react';
import { Table } from 'antd';
import classNames from 'classnames/bind';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { AiOutlineCreditCard, AiOutlineDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import moment from 'moment';

import { Link } from 'react-router-dom';
import {
  deleteBooking,
  editBooking,
  getBookings,
  resetStatusDeleteBooking,
  selectBookingList,
  selectLoadingBooking,
  selectStatusDeleteBooking,
  selectTotalBooking,
} from '../../redux/slice/Booking/BookingSlice';
import { BookingRes, GetBookingReq } from '../../redux/types/Booking/booking';
import styles from './Booking.module.scss';
import ModalBooking from './ModalBooking/ModalBooking';
import { formatPriceVietnam } from '../../common/helper';
import Dropdown from '../../components/Dropdown/Dropdown';

const MainLayout = lazy(() => import('../../components/MainLayout'));
const Modal = lazy(() => import('../../components/Modal'));
const Loading = lazy(() => import('../../components/Loading'));
const ModalConfirm = lazy(() => import('../../components/ModalConfirm'));

enum EBookingStatus {
  PENDING = 0 as any,
  APPROVE = 1 as any,
  CANCELLED = 2 as any,
  REJECT = 3 as any,
  FINISHED = 4 as any,
  PAYMENT_PENDING = 5 as any,
  PAYMENT_FINISHED = 6 as any,
  PAYMENT_FAILED = 7 as any,
}

const statusData = [
  {
    name: 'PENDING',
    value: 0,
  },
  {
    name: 'APPROVE',
    value: 1,
  },
  {
    name: 'REJECT',
    value: 3,
  },
];
interface SortType {
  sortBy: string;
  type: string;
}

export default function Booking() {
  const cx = classNames.bind(styles);
  const dispatch = useAppDispatch();

  const initial = {
    page: 1,
    limit: 10,
  } as GetBookingReq;

  const newBooking = useRef(false);
  const [show, setShow] = useState(false);
  const [modelConfirm, setShowModelConfirm] = useState(false);
  const [isShowConfirmStatus, setIsShowConfirmStatus] = useState<any>();
  const pageSizeList = [10, 25, 50, 100];
  const [limit, setLimit] = useState(pageSizeList[0]);

  const [selected, setSelected] = useState<BookingRes>({
    id: '',
    startTime: '',
    bookingDate: '',
    status: '',
  });

  const [sort, setSort] = useState<SortType>({ sortBy: '', type: '' });
  const [path, setPath] = useState<GetBookingReq>(initial);
  const [page, setPage] = useState<number>(1);

  const selectBookings = useAppSelector(selectBookingList);
  const loading = useAppSelector(selectLoadingBooking);
  const statusDelete = useAppSelector(selectStatusDeleteBooking);
  const totalBooking = useAppSelector(selectTotalBooking);

  const handleEditBooking = (e: BookingRes) => {
    setShow(true);
    newBooking.current = false;
    setSelected({
      ...e,
      startTime: moment(e.startTime) as unknown as any,
      bookingDate: moment(e.bookingDate) as unknown as any,
    });
  };

  const handleAddBooking = () => {
    setShow(true);
    newBooking.current = true;
  };

  const handleDelete = (e: BookingRes) => {
    setShowModelConfirm(true);
    setSelected(e);
  };

  const handleChangeStatus = (record: any, e: number) => {
    setIsShowConfirmStatus({
      record: record,
      statusValue: e,
    });
  };

  const handleUpdateStatus = () => {
    if (isShowConfirmStatus)
      dispatch(
        editBooking({
          id: isShowConfirmStatus.record.id,
          status: isShowConfirmStatus.statusValue,
        })
      );
    setIsShowConfirmStatus(undefined);
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
      title: 'STT',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any, index: number) => <>{index + 1}</>,
    },
    {
      title: 'Các dịch vụ sử dụng',
      dataIndex: 'bookingServices',
      key: 'bookingServices',
      render: (text: string, record: any) => {
        const services =
          record.services &&
          record.services?.length &&
          record.services?.map((service: any) => (
            <div key={service?.id}>{service?.name}</div>
          ));
        return <div>{services}</div>;
      },
    },
    {
      title: 'Thời gian đặt lịch',
      dataIndex: 'startTime',
      key: 'startTime',
    },
    {
      title: 'Ngày đặt lịch',
      dataIndex: 'bookingDate',
      key: 'bookingDate',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text: string, record: any) => {
        const status = EBookingStatus[record.status];
        return (
          <div className={cx('statusBooking')}>
            <Dropdown
              options={statusData || []}
              label="name"
              value="value"
              valueChosen=""
              setValueChosen={(e) => handleChangeStatus(record, e)}
              title={status}
            />
          </div>
        );
      },
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'bookingTotalPrice',
      key: 'bookingTotalPrice',
      render: (text: string, record: any) => {
        const totalPrice = record.services.reduce((acc: any, curr: any) => {
          return acc + curr.price;
        }, 0);
        return <div>{formatPriceVietnam(totalPrice)}</div>;
      },
    },
    {
      title: 'Ngày tạo',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (text: string) =>
        moment(new Date(text)).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Ngày cập nhật',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      render: (text: string) =>
        moment(new Date(text)).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Action',
      key: 'actions',
      render: (text: string, record: any, index: number) => (
        <div>
          <FiEdit
            size={26}
            color="#01C5FB"
            onClick={() => handleEditBooking(record)}
          />{' '}
          <Link to={'/booking-payment/' + record.id}>
            <AiOutlineCreditCard
              size={26}
              color="green"
              style={{ cursor: 'pointer' }}
            />
          </Link>
          <AiOutlineDelete
            size={26}
            color="#e91e63"
            onClick={() => handleDelete(record)}
          />
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
    if (sort.type !== '') {
      setPath({ ...path, sortOrder: sort.type });
    }
  }, [sort.type]);

  useEffect(() => {
    if (sort.sortBy !== '') {
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

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (!isShowConfirmStatus) {
        dispatch(getBookings(path));
      }
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [isShowConfirmStatus]);

  return (
    <Suspense fallback={<></>}>
      <MainLayout
        title="Booking"
        titleButton="Create Booking"
        handleClickAdd={handleAddBooking}
      >
        <div className={cx('skill-page')}>
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
          <Modal
            customClass={cx('bookingModalCustom')}
            isModal={show}
            title={newBooking.current ? 'Thêm cuộc hẹn' : 'Cập nhật trạng thái'}
            setOpenModals={setShow}
          >
            <ModalBooking
              onCloseModal={() => setShow(false)}
              defaultValue={newBooking.current ? null : selected}
            />
          </Modal>
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
        {isShowConfirmStatus && (
          <ModalConfirm
            cancelText="Hủy"
            confirmText="Xác nhận"
            isModal={!!isShowConfirmStatus}
            title="Xác nhận thay đổi trạng thái"
            subTitle={
              'Bạn muốn chuyển trạng thái của cuộc hẹn thành: ' +
              [EBookingStatus[isShowConfirmStatus.statusValue]]
            }
            onClick={handleUpdateStatus}
            setOpenModals={setIsShowConfirmStatus}
          />
        )}
      </MainLayout>
    </Suspense>
  );
}
