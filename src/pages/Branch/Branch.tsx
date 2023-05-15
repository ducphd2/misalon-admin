import classNames from "classnames/bind";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import PageSizeSelector from "../../components/PageSizeSelector";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import {
  addBranch,
  deleteBranch,
  editBranch,
  getBranchs,
  resetStatusDeleteBranch,
  selectLoadingBranch,
  selectBranchList,
  selectStatusDeleteBranch,
  selectTotalBranch,
} from "../../redux/slice/Branch/BranchSlice";
import {
  EditBranchReq,
  GetBranchReq,
  BranchRes,
} from "../../redux/types/Branch/branch";
import ModalBranch from "./ModalBranch/ModalBranch";
import styles from "./branch.module.scss";

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

export default function Branch() {
  const cx = classNames.bind(styles);
  const List = [
    { title: "#", sortBy: "" },
    { title: "Tên chi nhánh", sortBy: "name" },
    { title: "Địa chỉ", sortBy: "address" },
    { title: "Số điện thoại", sortBy: "phone" },
    { title: "Action", sortBy: "" },
  ];
  const dispatch = useAppDispatch();

  const initial = {
    page: 1,
    limit: 10,
    sortBy: "name",
    sortOrder: "ASC",
  } as GetBranchReq;

  const newBranch = useRef(false);
  const [show, setShow] = useState(false);
  const [modelConfirm, setShowModelConfirm] = useState(false);
  // const [newBranch, setNewBranch] = useState(false);
  const pageSizeList = [10, 25, 50, 100];
  const [limit, setLimit] = useState(pageSizeList[0]);
  const [selected, setSelected] = useState<BranchRes>({
    id: "",
    name: "",
    address: "",
  });
  const [sort, setSort] = useState<SortType>({ sortBy: "", type: "" });
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
        titleButton="Thêm Chi Nhánh"
        handleClickAdd={handleAddBranch}
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
                        return (
                          <th
                            key={index}
                           
                            onClick={() => handleSort(item)}
                          >
                            {item.title}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {selectBranchs?.map((e: BranchRes, idx: number) => {
                      return (
                        <tr key={e.id}>
                          <td>
                            <p className={cx("table-stt")}>
                              <span>{idx + 1}</span>
                            </p>
                          </td>
                          <td>{e.name}</td>
                          <td>{e.address}</td>
                          <td>{e.phone}</td>
                          <td className={cx("text-right", "dropdown")}>
                            <Suspense fallback={<></>}>
                              <DropDownEdit
                                deleteCondition={true}
                                customClass={cx("dropdown-skill")}
                                handleEdit={() => handleEditBranch(e)}
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
              Showing {page} to {limit > totalBranch ? totalBranch : limit} of{" "}
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
              isModal={show}
              title={
                newBranch.current ? "Thêm chi nhánh" : "Chỉnh sửa chi nhánh"
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
