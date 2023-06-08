import classNames from "classnames/bind";
import { Suspense, lazy, useEffect, useState } from "react";
import Dropdown from "../../../components/Dropdown/Dropdown";
import { useAppDispatch } from "../../../redux/hooks";
import {
  addService,
  editService,
} from "../../../redux/slice/Service/ServiceSlice";
import {
  AddServiceReq,
  EditServiceReq,
} from "../../../redux/types/Service/service";
import styles from "./ModalUser.module.scss";
import { AddUserReq } from "../../../redux/types/Employee/user";
import { httpService } from "../../../redux/service/httpService";
import { toast } from "react-toastify";
const Input = lazy(() => import("../../../components/Input"));
const Button = lazy(() => import("../../../components/Button"));

function ModalUser({ onCloseModal, defaultValue }: any) {
  const dispatch = useAppDispatch();
  const cx = classNames.bind(styles);
  const [isUploading, setIsUploading] = useState(false);
  const merchant = JSON.parse(localStorage.getItem("merchant") as any);
  const className = classNames.bind(styles);
  const [form, setForm] = useState<AddUserReq>({
    email: "",
    password: "",
    fullName: "",
    role: 2,
    branchId: "",
    phoneNumber: "",
    address: "",
    gender: 0,
    status: 1,
  });

  useEffect(() => {
    if (defaultValue) {
      setForm(defaultValue);
    }
  }, [defaultValue]);
  const onChange = (e: any) => {
    if (e.target.name == "price") {
      setForm({ ...form, [e.target.name]: +e.target.value });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = async () => {
    const { password, ...data } = form;
    let updateData: any = data;
    if (!!defaultValue) {
      const id: any = updateData.id;
      const res: any = httpService.PATCH({
        uri: `users/update-customer/${id}`,
        request: data,
      });
      if (res) {
        toast.success("Cập nhật thành công !", {
          position: "top-right",
        });
      }
    } else {
      try {
        const res: any = httpService.POST({
          uri: `merchants/${merchant.id}/users`,
          request: form,
        });
        if (res) {
          toast.success("Thêm user thành công !", {
            position: "top-right",
          });
        }
      } catch (error) {
        toast.error("Thông tin không hợp lệ", {
          position: "top-right",
        });
      }
    }
    onCloseModal();
  };

  return (
    <div className={cx("form")}>
      <div className="row">
        <div className="col-sm-12">
          <Input
            required={true}
            name={"fullName"}
            label={"Tên người dùng"}
            value={form.fullName}
            className={className("form-group", "input-custom")}
            type={"text"}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="col-sm-12">
          <Input
            required={true}
            name={"email"}
            label={"Email người dùng"}
            value={form.email}
            className={className("form-group", "input-custom")}
            type={"text"}
            onChange={(e) => onChange(e)}
          />
        </div>

        {!defaultValue && (
          <div className="col-sm-12">
            <Input
              required={true}
              name={"password"}
              label={"Mật khẩu"}
              value={form.password}
              className={className("form-group", "input-custom")}
              type={"text"}
              onChange={(e) => onChange(e)}
            />
          </div>
        )}

        <div className="col-sm-12">
          <Input
            required={true}
            name={"phoneNumber"}
            label={"Số điện thoại"}
            value={form.phoneNumber}
            className={className("form-group", "input-custom")}
            type={"text"}
            onChange={(e) => onChange(e)}
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
          />
        </div>
        <div className="col-sm-12">
          <Dropdown
            options={[
              { name: "Nam", value: 0 },
              { name: "Nữ", value: 1 },
              { name: "Khác", value: 2 },
            ]}
            label="name"
            value="value"
            valueChosen=""
            setValueChosen={(e) => setForm({ ...form, gender: e })}
            className={className("form-group", "input-custom")}
            title="Giới tính"
          />
        </div>
        <div className="col-sm-12">
          <Dropdown
            options={merchant.branches}
            label="name"
            value="id"
            valueChosen=""
            setValueChosen={(e) => setForm({ ...form, branchId: e })}
            className={className("form-group", "input-custom")}
            title="Chi nhánh"
          />
        </div>
      </div>

      <div className={cx("submit-section")}>
        <Suspense>
          <Button
            label="Submit"
            disabled={isUploading}
            type="submit"
            onClick={handleSubmit}
            classType={cx("btn-submit")}
          />
        </Suspense>
      </div>
    </div>
  );
}

export default ModalUser;
