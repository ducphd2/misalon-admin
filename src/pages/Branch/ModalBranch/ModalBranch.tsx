import classNames from "classnames/bind";
import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import LocationSelector from "./../../../components/AddressSelect";
import styles from "./ModalBranch.module.scss";
import { addBranch, editBranch } from "../../../redux/slice/Branch/BranchSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { EditBranchReq } from "../../../redux/types/Branch/branch";
const Input = lazy(() => import("../../../components/Input"));
const Button = lazy(() => import("../../../components/Button"));

export default function ModalBranch({ onCloseModal, defaultValue }: any) {
  const dispatch = useAppDispatch();
  const cx = classNames.bind(styles);
  const merchant = JSON.parse(localStorage.getItem("merchant") as any);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    merchantId: merchant.id,
    cityCode: undefined,
    districtCode: undefined,
    wardCode: undefined,
    city: "",
    district: "",
    ward: "",
  });
  useEffect(() => {
    if (!!defaultValue) {
      setForm(defaultValue);
    }
  }, [defaultValue]);
  const [errorsMessage, setErrorsMessage] = useState({} as any);
  const className = classNames.bind(styles);
  const onChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!!defaultValue) {
      dispatch(editBranch(form as EditBranchReq));
    } else {
      dispatch(addBranch(form));
    }
    onCloseModal();
  };

  const handleChangeAddress = useCallback(
    (e: any) => {
      setForm({
        ...form,
        ...e,
      });
    },
    [form]
  );

  return (
    <div className={cx("form")}>
      <div className="row">
        <div className="col-sm-12">
          <Input
            required={true}
            name={"name"}
            label={"Tên chi nhánh"}
            value={form.name}
            className={className("form-group", "input-custom")}
            type={"text"}
            onChange={(e) => onChange(e)}
            errorMessage={errorsMessage["name"]}
          />
        </div>
        <div className="col-sm-12">
          <Input
            required={true}
            name={"phone"}
            label={"Số điện thoại"}
            value={form.phone}
            className={className("form-group", "input-custom")}
            type={"text"}
            onChange={(e) => onChange(e)}
            errorMessage={errorsMessage["name"]}
          />
        </div>
        <div className="col-sm-12">
          <Input
            required={true}
            name={"address"}
            label={"Địa chỉ"}
            value={form.address}
            className={className("form-group", "input-custom")}
            type={"text"}
            onChange={(e) => onChange(e)}
            errorMessage={errorsMessage["name"]}
          />
        </div>

        <div className="col-sm-12">
          <LocationSelector onChangAddress={handleChangeAddress} />
        </div>
      </div>

      <div className={cx("submit-section")}>
        <Suspense>
          <Button
            label="Submit"
            type="submit"
            onClick={handleSubmit}
            classType={cx("btn-submit")}
          />
        </Suspense>
      </div>
    </div>
  );
}
