import classNames from "classnames/bind";
import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import LocationSelector from "../../../components/AddressSelect";
import styles from "./ModalServiceGroup.module.scss";
import {
  addServiceGroup,
  editServiceGroup,
} from "../../../redux/slice/ServiceGroup/ServiceGroupSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { EditServiceGroupReq } from "../../../redux/types/ServiceGroup/serviceGroup";
import Loading from "../../../components/Loading/Loading";
const Input = lazy(() => import("../../../components/Input"));
const Button = lazy(() => import("../../../components/Button"));

export default function ModalServiceGroup({ onCloseModal, defaultValue }: any) {
  const dispatch = useAppDispatch();
  const cx = classNames.bind(styles);
  const [isUploading, setIsUploading] = useState(false)
  const merchant = JSON.parse(localStorage.getItem("merchant") as any);
  const [form, setForm] = useState({
    merchantId: merchant.id,
    sku: "",
    code: "",
    name: "",
    description: "",
    image: "",
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
      dispatch(editServiceGroup(form as EditServiceGroupReq));
    } else {
      dispatch(addServiceGroup(form));
    }
    onCloseModal();
  };

  const handleUpload = async (event: any) => {
    setIsUploading(true)
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pcfn6h3b");
    formData.append("cloud_name", "dueyjeqd5");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dueyjeqd5/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    setForm({ ...form, image: data.secure_url });
    setIsUploading(false)
  };

  return (
    <div className={cx("form")}>
      <div className="row">
        <div className="col-sm-12">
          <Input
            required={true}
            name={"name"}
            label={"Tên nhóm dịch vụ"}
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
            name={"code"}
            label={"Mã dịch vụ"}
            value={form.code}
            className={className("form-group", "input-custom")}
            type={"text"}
            onChange={(e) => onChange(e)}
            errorMessage={errorsMessage["code"]}
          />
        </div>
        <div className="col-sm-12">
          <Input
            required={true}
            name={"sku"}
            label={"SKU"}
            value={form.sku}
            className={className("form-group", "input-custom")}
            type={"text"}
            onChange={(e) => onChange(e)}
            errorMessage={errorsMessage["sku"]}
          />
        </div>
        <div className="col-sm-12">
          <Input
            required={true}
            name={"description"}
            label={"Mô tả"}
            value={form.description}
            className={className("form-group", "input-custom")}
            type={"text"}
            onChange={(e) => onChange(e)}
            errorMessage={errorsMessage["description"]}
          />
        </div>
        <div className="col-sm-12">
          <div className={cx("input-label")}>Ảnh nhóm dịch vụ</div>
          <input type="file" onChange={handleUpload} />
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
