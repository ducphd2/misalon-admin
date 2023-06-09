import { Table } from 'antd';
import classNames from 'classnames/bind';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { ColumnsType } from 'antd/lib/table';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import {
  deleteBranch,
  getBranchs,
  resetStatusDeleteBranch,
  selectBranchList,
  selectLoadingBranch,
  selectStatusDeleteBranch,
  selectTotalBranch,
} from '../../redux/slice/Branch/BranchSlice';
import { BranchRes, GetBranchReq } from '../../redux/types/Branch/branch';
import ModalBranch from './ModalBranch/ModalBranch';
import styles from './branch.module.scss';
import moment from 'moment';

const MainLayout = lazy(() => import('../../components/MainLayout'));
const Modal = lazy(() => import('../../components/Modal'));
const Loading = lazy(() => import('../../components/Loading'));
const ModalConfirm = lazy(() => import('../../components/ModalConfirm'));
const Pagination = lazy(() => import('../../components/Pagination'));

interface SortType {
  sortBy: string;
  type: string;
}

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export default function Branch() {
  const cx = classNames.bind(styles);

  const dispatch = useAppDispatch();

  const initial = {
    page: 1,
    limit: 10,
  } as GetBranchReq;

  const newBranch = useRef(false);
  const [show, setShow] = useState(false);
  const [modelConfirm, setShowModelConfirm] = useState(false);
  // const [newBranch, setNewBranch] = useState(false);
  const pageSizeList = [10, 25, 50, 100];
  const [limit, setLimit] = useState(pageSizeList[0]);
  const [selected, setSelected] = useState<BranchRes>({
    id: '',
    name: '',
    address: '',
  });
  const [sort, setSort] = useState<SortType>({ sortBy: '', type: '' });
  const [path, setPath] = useState<GetBranchReq>(initial);
  const [page, setPage] = useState<number>(1);

  const selectBranchs = useAppSelector(selectBranchList);
  const loading = useAppSelector(selectLoadingBranch);
  const statusDelete = useAppSelector(selectStatusDeleteBranch);
  const totalBranch = useAppSelector(selectTotalBranch);
  const handleEditBranch = (e: BranchRes) => {
    setShow(true);
    newBranch.current = false;
    setSelected(e);
  };

  const handleAddBranch = () => {
    setShow(true);
    newBranch.current = true;
  };

  const handleDelete = (e: BranchRes) => {
    setShowModelConfirm(true);
    setSelected(e);
  };

  const confirmDelete = () => {
    const req = {
      id: selected.id,
    };
    dispatch(deleteBranch(req));
    setShowModelConfirm(false);
  };

  const handleChangePage = (e: number) => {
    setPage(e);
  };
  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any, index: number) => <>{index + 1}</>,
    },
    {
      title: 'Tên chi nhánh',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text: string, record: any, index: number) => (
        <>
          {record.image && (
            <img
              src={record.image}
              alt=""
              style={{ height: '50px', width: '80px' }}
            />
          )}
        </>
      ),
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Ngày tạo',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (text: string) =>
        moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Ngày cập nhật',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      render: (text: string) =>
        moment(new Date(text)).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (text: string, record: any, index: number) => (
        <div>
          <FiEdit
            size={26}
            style={{ cursor: 'pointer' }}
            color="#01C5FB"
            onClick={() => handleEditBranch(record)}
          />{' '}
          <AiOutlineDelete
            size={26}
            style={{ cursor: 'pointer' }}
            onClick={() => handleDelete(record)}
            color="#e91e63"
          />
        </div>
      ),
    },
  ];

  const handleSort = (item: any) => {
    if (sort.sortBy === item.sortBy) {
      if (sort.type === 'ASC') {
        setSort({ sortBy: item.sortBy, type: 'DESC' });
      } else {
        setSort({ sortBy: item.sortBy, type: 'ASC' });
      }
    } else {
      setSort({ sortBy: item.sortBy, type: 'DESC' });
      setPath({ ...path, sortOrder: 'DESC' });
    }
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
      dispatch(getBranchs(path));
    }

    return () => {
      dispatch(resetStatusDeleteBranch(0));
    };
  }, [path.page, path.limit, path.sortBy, path.sortOrder, statusDelete]);

  return (
    <Suspense fallback={<></>}>
      <MainLayout
        title="Branch"
        titleButton="Thêm chi nhánh"
        handleClickAdd={handleAddBranch}
      >
        <div className={cx('skill-page')}>
          {loading ? (
            <Loading height="500px" />
          ) : (
            <>
              <Suspense fallback={<></>}>
                <Table
                  dataSource={selectBranchs}
                  rowKey="id"
                  columns={columns}
                />
              </Suspense>
            </>
          )}
          <div className={cx('pagination')}>
            <span className={cx('showing')}>
              Showing {page} to {limit > totalBranch ? totalBranch : limit} of{' '}
              {totalBranch} entries
            </span>
            <Suspense>
              <Pagination
                currentPage={page}
                pageSize={limit}
                totalData={totalBranch}
                onChangePage={handleChangePage}
              />
            </Suspense>
          </div>
          <Suspense>
            <Modal
              customClass={cx('branchModalCustom')}
              isModal={show}
              title={
                newBranch.current ? 'Thêm chi nhánh' : 'Chỉnh sửa chi nhánh'
              }
              setOpenModals={setShow}
            >
              <ModalBranch
                onCloseModal={() => setShow(false)}
                defaultValue={newBranch.current ? null : selected}
              />
            </Modal>
          </Suspense>
          <Suspense>
            <ModalConfirm
              title="Xóa chi nhánh"
              subTitle={`Bạn chắc chắn muốn xóa chi nhánh:  ${selected.name} ? `}
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
