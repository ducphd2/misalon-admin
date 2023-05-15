import classNames from "classnames/bind";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import PageSizeSelector from "../../components/PageSizeSelector";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import {
  deleteService,
  getServices,
  resetStatusDeleteService,
  selectLoadingService,
  selectServiceList,
  selectStatusDeleteService,
  selectTotalService,
} from "../../redux/slice/Service/ServiceSlice";
import { GetServiceReq, ServiceRes } from "../../redux/types/Service/service";
import ModalService from "./ModalService/ModalService";
import styles from "./Service.module.scss";

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

export default function Service() {
  const cx = classNames.bind(styles);
  const List = [
    { title: "#", sortBy: "" },
    { title: "Tên dịch vụ" },
    { title: "Ảnh dịch vụ" },
    { title: "Mã dịch vụ" },
    { title: "SKU" },
    { title: "Giá" },
    { title: "Mô tả" },
    { title: "Action" },
  ];
  const dispatch = useAppDispatch();

  const initial = {
    page: 1,
    limit: 10,
    sortBy: "name",
    sortOrder: "ASC",
  } as GetServiceReq;

  const newService = useRef(false);
  const [show, setShow] = useState(false);
  const [modelConfirm, setShowModelConfirm] = useState(false);
  // const [newService, setNewService] = useState(false);
  const pageSizeList = [10, 25, 50, 100];
  const [limit, setLimit] = useState(pageSizeList[0]);
  const [selected, setSelected] = useState<ServiceRes>({
    id: "",
    name: "",
    code: "",
    sku: "",
    image: "",
    description: "",
  });
  const [sort, setSort] = useState<SortType>({ sortBy: "", type: "" });
  const [path, setPath] = useState<GetServiceReq>(initial);
  const [page, setPage] = useState<number>(1);

  const selectServices = useAppSelector(selectServiceList);
  const loading = useAppSelector(selectLoadingService);
  const statusDelete = useAppSelector(selectStatusDeleteService);
  const totalService = useAppSelector(selectTotalService);
  const handleEditService = (e: ServiceRes) => {
    setShow(true);
    newService.current = false;
    setSelected(e);
  };

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
      if (sort.type === "ASC") {
        setSort({ sortBy: item.sortBy, type: "DESC" });
      } else {
        setSort({ sortBy: item.sortBy, type: "ASC" });
      }
    } else {
      setSort({ sortBy: item.sortBy, type: "DESC" });
      setPath({ ...path, sortOrder: "DESC" });
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
        titleButton="Thêm Dịch Vụ"
        handleClickAdd={handleAddService}
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
                    {selectServices?.map((e: ServiceRes, idx: number) => {
                      return (
                        <tr key={e.id}>
                          <td>
                            <p className={cx("table-stt")}>
                              <span>{idx + 1}</span>
                            </p>
                          </td>
                          <td>{e.name}</td>
                          <td>
                            <img
                              src={e.image}
                              alt="react logo"
                              className={cx("service-image")}
                            />
                          </td>
                          <td>{e.code}</td>
                          <td>{e.sku}</td>
                          <td>{e.price}</td>
                          <td>{e.description}</td>
                          <td className={cx("text-right", "dropdown")}>
                            <Suspense fallback={<></>}>
                              <DropDownEdit
                                deleteCondition={true}
                                customClass={cx("dropdown-skill")}
                                handleEdit={() => handleEditService(e)}
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
              Showing {page} to {limit > totalService ? totalService : limit} of{" "}
              {totalService} entries
            </span>
            <Suspense>
              <Pagination
                currentPage={page}
                pageSize={limit}
                totalData={totalService}
                onChangePage={handleChangePage}
              />
            </Suspense>
          </div>
          <Suspense>
            <Modal
              isModal={show}
              title={
                newService.current ? "Thêm dịch vụ" : "Chỉnh sửa dịch vụ"
              }
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
