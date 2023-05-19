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
import styles from "./ModalBooking.module.scss";
import {
  addBooking,
  editBooking,
} from "../../../redux/slice/Booking/BookingSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { EditBookingReq } from "../../../redux/types/Booking/booking";
import Loading from "../../../components/Loading/Loading";
import { selectServiceGroupList } from "../../../redux/slice/ServiceGroup/ServiceGroupSlice";
import Dropdown from "../../../components/Dropdown/Dropdown";
const Input = lazy(() => import("../../../components/Input"));
const Button = lazy(() => import("../../../components/Button"));

export default function ModalBooking({ onCloseModal, defaultValue }: any) {
  const dispatch = useAppDispatch();
  const cx = classNames.bind(styles);
  const selectServiceGroups = useAppSelector(selectServiceGroupList);
  const [isUploading, setIsUploading] = useState(false);
  const merchant = JSON.parse(localStorage.getItem("merchant") as any);
  const [form, setForm] = useState({
    merchantId: merchant.id,
    sku: "",
    code: "",
    name: "",
    description: "",
    image: "",
    status: 1,
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
      dispatch(
        editBooking({ ...form, status: isAccept } as unknown as EditBookingReq)
      );
    } else {
      dispatch(addBooking(form));
    }
    onCloseModal();
  };

  const handleUpload = async (event: any) => {
    setIsUploading(true);
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
    setIsUploading(false);
  };
  const [isAccept, setIsAccept] = useState(1);

  const handleOptionSelect = (e: any) => {
    setIsAccept(+e.target.value);
  };

  return (
    <div className={cx("form")}>
      <div className="row">
        <div className="col-sm-12">
          <Dropdown
            options={selectServiceGroups || []}
            label="name"
            value="id"
            valueChosen=""
            setValueChosen={(e) => {
              console.log(e);
            }}
            className={className("form-group", "input-custom")}
            title="Nhóm dịch vụ"
          />
        </div>
        <div className="col-sm-12">
          <Input
            required={true}
            name={"name"}
            label={"Tên booking"}
            value={form.name}
            className={className("form-group", "input-custom")}
            type={"text"}
            onChange={(e) => onChange(e)}
            errorMessage={errorsMessage["name"]}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <Input
            required={true}
            name={"name"}
            label={"Thời gian bắt đầu"}
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
            name={"name"}
            label={"Ngày bắt đầu"}
            value={form.name}
            className={className("form-group", "input-custom")}
            type={"text"}
            onChange={(e) => onChange(e)}
            errorMessage={errorsMessage["name"]}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <Input
            required={true}
            name={"name"}
            label={"Booking bạn muốn thêm"}
            value={form.name}
            className={className("form-group", "input-custom")}
            type={"text"}
            onChange={(e) => onChange(e)}
            errorMessage={errorsMessage["name"]}
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
