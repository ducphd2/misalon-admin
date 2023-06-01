import classNames from "classnames/bind";
import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { addBranch, editBranch } from "../../../redux/slice/Branch/BranchSlice";
import { EditBranchReq } from "../../../redux/types/Branch/branch";
import styles from "./ModalBranch.module.scss";
import { MarkerPosition } from "../../../components/Map/Map";
const Input = lazy(() => import("../../../components/Input"));
const Button = lazy(() => import("../../../components/Button"));
const Map = lazy(() => import("../../../components/Map"));

export default function ModalBranch({ onCloseModal, defaultValue }: any) {
  const dispatch = useAppDispatch();
  const cx = classNames.bind(styles);
  const merchant = JSON.parse(localStorage.getItem("merchant") as any);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    merchantId: merchant.id,
    latitude: 20.9809307166735,
    longitude: 105.7961750470138,
  });
  const AnyReactComponent = ({ text }: any) => <div>{text}</div>;
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
  const defaultProps = {
    center: {
      lat: 20.9809307166735,
      lng: 105.7961750470138,
    },
    zoom: 11,
  };

  const handleSelected=(position:MarkerPosition)=>{
    setForm({...form, latitude:position.lat, longitude:position.lng})
  }

  return (
    <div className={cx("form")}>
      <div className="row">
        <div className="col-md-5">
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
        </div>

        {/* <div className="col-sm-12">
          <LocationSelector onChangAddress={handleChangeAddress} />
        </div> */}
        {/* <div className="col-sm-12">
          <div style={{ height: '400px', width: '100%' }}>
            <label style={{ fontSize: '16px' }}>Vui lòng chọn vị trí</label>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: GOOGLE_MAP_KEY,
              }}
              onClick={(e) => {
                setForm({ ...form, latitude: e.lat, longitude: e.lng });
              }}
              yesIWantToUseGoogleMapApiInternals
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            >
              <AnyReactComponent
                lat={20.9809307166735}
                lng={105.7961750470138}
                text="My Marker"
              />
            </GoogleMapReact>
          </div>
        </div> */}
        <div className="col-sm-7">
          <div style={{ height: "400px", width: "100%" }}>
            <label style={{ fontSize: "16px" }}>Vui lòng chọn vị trí</label>
            <Map
              defaultValue={{ lat: form.latitude, lng: form.longitude }}
              onCloseModal={onCloseModal}
              onSelected={handleSelected}
            />
          </div>
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
