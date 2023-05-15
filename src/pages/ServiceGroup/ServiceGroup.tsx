import classNames from "classnames/bind";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import PageSizeSelector from "../../components/PageSizeSelector";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import {
  addServiceGroup,
  deleteServiceGroup,
  editServiceGroup,
  getServiceGroups,
  resetStatusDeleteServiceGroup,
  selectLoadingServiceGroup,
  selectServiceGroupList,
  selectStatusDeleteServiceGroup,
  selectTotalServiceGroup,
} from "../../redux/slice/ServiceGroup/ServiceGroupSlice";
import {
  EditServiceGroupReq,
  GetServiceGroupReq,
  ServiceGroupRes,
} from "../../redux/types/ServiceGroup/serviceGroup";
import ModalServiceGroup from "./ModalServiceGroup/ModalServiceGroup";
import styles from "./ServiceGroup.module.scss";
import { imageUpload } from "../../common/utils";

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

export default function ServiceGroup() {
  const cx = classNames.bind(styles);
  const List = [
    { title: "#", sortBy: "" },
    { title: "Tên nhóm dịch vụ" },
    { title: "Ảnh dịch vụ" },
    { title: "Mã dịch vụ" },
    { title: "SKU" },
    { title: "Mô tả" },
    { title: "Action" },
  ];
  const dispatch = useAppDispatch();

  const initial = {
    page: 1,
    limit: 10,
    sortBy: "name",
    sortOrder: "ASC",
  } as GetServiceGroupReq;

  const newServiceGroup = useRef(false);
  const [show, setShow] = useState(false);
  const [modelConfirm, setShowModelConfirm] = useState(false);
  // const [newServiceGroup, setNewServiceGroup] = useState(false);
  const pageSizeList = [10, 25, 50, 100];
  const [limit, setLimit] = useState(pageSizeList[0]);
  const [selected, setSelected] = useState<ServiceGroupRes>({
    id: "",
    name: "",
    code: "",
    sku: "",
    image: "",
    description: "",
  });
  const [sort, setSort] = useState<SortType>({ sortBy: "", type: "" });
  const [path, setPath] = useState<GetServiceGroupReq>(initial);
  const [page, setPage] = useState<number>(1);

  const selectServiceGroups = useAppSelector(selectServiceGroupList);
  const loading = useAppSelector(selectLoadingServiceGroup);
  const statusDelete = useAppSelector(selectStatusDeleteServiceGroup);
  const totalServiceGroup = useAppSelector(selectTotalServiceGroup);
  const handleEditServiceGroup = (e: ServiceGroupRes) => {
    setShow(true);
    newServiceGroup.current = false;
    setSelected(e);
  };

  const handleAddServiceGroup = () => {
    setShow(true);
    newServiceGroup.current = true;
  };

  const handleDelete = (e: ServiceGroupRes) => {
    setShowModelConfirm(true);
    setSelected(e);
  };

  const confirmDelete = () => {
    const req = {
      id: selected.id,
    };
    dispatch(deleteServiceGroup(req));
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
      dispatch(getServiceGroups(path));
    }

    return () => {
      dispatch(resetStatusDeleteServiceGroup(0));
    };
  }, [path.page, path.limit, path.sortBy, path.sortOrder, statusDelete]);

  return (
    <Suspense fallback={<></>}>
      <MainLayout
        title="ServiceGroup"
        titleButton="Thêm Nhóm Dịch Vụ"
        handleClickAdd={handleAddServiceGroup}
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
                    {selectServiceGroups?.map(
                      (e: ServiceGroupRes, idx: number) => {
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
                            <td>{e.description}</td>
                            <td className={cx("text-right", "dropdown")}>
                              <Suspense fallback={<></>}>
                                <DropDownEdit
                                  deleteCondition={true}
                                  customClass={cx("dropdown-skill")}
                                  handleEdit={() => handleEditServiceGroup(e)}
                                  handleDelete={() => handleDelete(e)}
                                />
                              </Suspense>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </Table>
              </Suspense>
            </>
          )}
          <div className={cx("pagination")}>
            <span className={cx("showing")}>
              Showing {page} to{" "}
              {limit > totalServiceGroup ? totalServiceGroup : limit} of{" "}
              {totalServiceGroup} entries
            </span>
            <Suspense>
              <Pagination
                currentPage={page}
                pageSize={limit}
                totalData={totalServiceGroup}
                onChangePage={handleChangePage}
              />
            </Suspense>
          </div>
          <Suspense>
            <Modal
              isModal={show}
              title={
                newServiceGroup.current
                  ? "Thêm nhóm dịch vụ"
                  : "Chỉnh sửa nhóm dịch vụ"
              }
              setOpenModals={setShow}
            >
              <ModalServiceGroup
                onCloseModal={() => setShow(false)}
                defaultValue={newServiceGroup.current ? null : selected}
              />
            </Modal>
          </Suspense>
          <Suspense>
            <ModalConfirm
              title="Xóa chi nhóm dịch vụ"
              subTitle={`Bạn chắc chắn muốn xóa nhóm dịch vụ:  ${selected.name} ? `}
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
