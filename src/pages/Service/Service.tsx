import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import classNames from 'classnames/bind';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import PageSizeSelector from '../../components/PageSizeSelector';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import moment from 'moment';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import {
  deleteService,
  getServices,
  resetStatusDeleteService,
  selectLoadingService,
  selectServiceList,
  selectStatusDeleteService,
  selectTotalService,
} from '../../redux/slice/Service/ServiceSlice';
import { GetServiceReq, ServiceRes } from '../../redux/types/Service/service';
import ModalService from './ModalService/ModalService';
import styles from './Service.module.scss';

const MainLayout = lazy(() => import('../../components/MainLayout'));
const DropDownEdit = lazy(() => import('../../components/DropDownEdit/index'));
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

export default function Service() {
  const cx = classNames.bind(styles);
  const List = [
    { title: '#', sortBy: '' },
    { title: 'Tên dịch vụ' },
    { title: 'Ảnh dịch vụ' },
    { title: 'Mã dịch vụ' },
    { title: 'SKU' },
    { title: 'Giá' },
    { title: 'Mô tả' },
    { title: 'Action' },
  ];
  const dispatch = useAppDispatch();

  const initial = {
    page: 1,
    limit: 10,
  } as GetServiceReq;

  const newService = useRef(false);
  const [show, setShow] = useState(false);
  const [modelConfirm, setShowModelConfirm] = useState(false);
  // const [newService, setNewService] = useState(false);
  const pageSizeList = [10, 25, 50, 100];
  const [limit, setLimit] = useState(pageSizeList[0]);
  const [selected, setSelected] = useState<ServiceRes>({
    id: '',
    name: '',
    code: '',
    sku: '',
    image: '',
    description: '',
  });
  const [sort, setSort] = useState<SortType>({ sortBy: '', type: '' });
  const [path, setPath] = useState<GetServiceReq>(initial);
  const [page, setPage] = useState<number>(1);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const selectServices = useAppSelector(selectServiceList);
  const loading = useAppSelector(selectLoadingService);
  const statusDelete = useAppSelector(selectStatusDeleteService);
  const totalService = useAppSelector(selectTotalService);
  const handleEditService = (e: ServiceRes) => {
    setShow(true);
    newService.current = false;
    setSelected(e);
  };

  const toggleDescription = (key: string) => {
    if (expandedRows.includes(key)) {
      setExpandedRows(expandedRows.filter((rowKey) => rowKey !== key));
    } else {
      setExpandedRows([...expandedRows, key]);
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any, index: number) => <>{index + 1}</>,
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text: string, record: any, index: number) => (
        <>
          <img
            src={record.image}
            alt=""
            style={{ height: '50px', width: '80px' }}
          />
        </>
      ),
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      render: (text: string, record: any, index: number) => (
        <div
          className={cx('description-content', 'line-clamp', {
            expanded: expandedRows.includes(record.key),
          })}
          onClick={() => toggleDescription(record.key)}
        >
          {record.description}
        </div>
      ),
      className: cx('description-column'),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày tạo',
      key: 'createdAt',
      dataIndex: 'createdAt',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Ngày cập nhật',
      key: 'updatedAt',
      dataIndex: 'updatedAt',
      render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Hành động',
      key: 'updatedAt',
      render: (text: string, record: any, index: number) => (
        <div>
          <FiEdit size={26} color="#01C5FB"  onClick={() => handleEditService(record)} />{' '}
          <AiOutlineDelete size={26} color="#e91e63"  onClick={() => handleDelete(record)} />
        </div>
      ),
    },
  ];
  const handleAddService = () => {
    setShow(true);
    newService.current = true;
  };

  const handleDelete = (e: ServiceRes) => {
    setShowModelConfirm(true);
    setSelected(e);
  };

  const confirmDelete = () => {
    const req = {
      id: selected.id,
    };
    dispatch(deleteService(req));
    setShowModelConfirm(false);
  };

  const handleChangePage = (e: number) => {
    setPage(e);
  };

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
      dispatch(getServices(path));
    }

    return () => {
      dispatch(resetStatusDeleteService(0));
    };
  }, [path.page, path.limit, path.sortBy, path.sortOrder, statusDelete]);
  return (
    <Suspense fallback={<></>}>
      <MainLayout
        title="Service"
        titleButton="Thêm dịch vụ"
        handleClickAdd={handleAddService}
      >
        <div className={cx('skill-page')}>
          <div className={cx('total-page')}>
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
                <Table
                  columns={columns}
                  dataSource={selectServices}
                  rowKey="id"
                />
              </Suspense>
            </>
          )}
          <Suspense>
            <Modal
              isModal={show}
              title={newService.current ? 'Thêm dịch vụ' : 'Chỉnh sửa dịch vụ'}
              setOpenModals={setShow}
            >
              <ModalService
                onCloseModal={() => setShow(false)}
                defaultValue={newService.current ? null : selected}
              />
            </Modal>
          </Suspense>
          <Suspense>
            <ModalConfirm
              title="Xóa dịch vụ"
              subTitle={`Bạn chắc chắn muốn xóa dịch vụ:  ${selected.name} ? `}
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
