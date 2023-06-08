import classNames from "classnames/bind";
import { Suspense, lazy, useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import {
  addBooking,
  editBooking,
} from "../../../redux/slice/Booking/BookingSlice";
import { EditBookingReq } from "../../../redux/types/Booking/booking";
import styles from "./ModalBooking.module.scss";



import { default as ReactSelect } from "react-select";
import Option from "../../../components/OptionSelect";
import { httpService } from "../../../redux/service/httpService";

const Input = lazy(() => import("../../../components/Input"));
const Button = lazy(() => import("../../../components/Button"));

export default function ModalBooking({ onCloseModal, defaultValue }: any) {
  const dispatch = useAppDispatch();
  const cx = classNames.bind(styles);
  const [isUploading, setIsUploading] = useState(false);
  const [listsearchCustomer, setListSearchCustomer] = useState<any>([]);
  const [listBranches, setListBranches] = useState<any>([]);
  const [selectedOptionService, setSelectedOptionService] = useState([]);
  const [serviceSelected, setServiceSelected] = useState([]);

  const merchant = JSON.parse(localStorage.getItem("merchant") as any);
  console.log('serviceSelected',serviceSelected)
  const [form, setForm] = useState({
    merchantId: merchant.id,
    sku: "",
    code: "",
    address: "",
    fullName: "",
    branchId: '',
    number: "",
    name: "",
    description: "",
    status: 1,
    startTime: null,
  });
  useEffect(() => {
    if (!!defaultValue) {
      setForm(defaultValue);
    }
  }, [defaultValue]);

  const handleGetListCustomer = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (!e.target?.value) {
      setListSearchCustomer([]);
      return;
    }
    const getList = async () => {
      try {
        const res: any = await httpService.GET({
          uri: `/merchants/${merchant?.id}/customers?q=${e.target.value}`,
        });
        setListSearchCustomer(res.result.items);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  };

  const handleGetService = () => {
    const getList = async () => {
      try {
        const res: any = await httpService.GET({
          uri: `/merchants/${merchant?.id}/services`,
        });
        const listService = res.result.items;
        const listConvert =
          listService &&
          listService.length > 0 &&
          listService.map((service: any) => {
            return {
              label: service?.name,
              value: service?.id,
            };
          });
        setSelectedOptionService(listConvert);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  };

  const handleGetBranches = () => {
    const getList = async () => {
      try {
        const res: any = await httpService.GET({
          uri: `/merchants/${merchant?.id}/branches`,
        });
        setListBranches(res.result.items);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  };

  useEffect(() => {
    handleGetService();
    handleGetBranches();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [errorsMessage, setErrorsMessage] = useState({} as any);
  const className = classNames.bind(styles);
  const onChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const today = new Date();
  console.log('today.getDate() ',today )
  const handleSubmit = () => {
    const listIdService = serviceSelected && serviceSelected.length > 0 && serviceSelected.map((service:any)=>{
      return service.value
    })
    const {address,fullName,number,branchId} = form;
    const bookingDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`
    const startTime = `${today.getHours()}:${today.getMinutes()}`
    const dataPassApi = {
      serviceIds: listIdService,
      fullName,
      address,
      branchId:Number(branchId),
      phoneNumber : number,
      startTime,
      bookingDate,
    }
    if (!!defaultValue) {
      dispatch(
        editBooking({ ...dataPassApi, status: isAccept } as unknown as EditBookingReq)
      );
    } else {
      dispatch(addBooking(dataPassApi));
    }
    onCloseModal();
  };

  const [isAccept, setIsAccept] = useState(1);


  const handleSetData = (data: any) => {
    setListSearchCustomer([]);

    setForm({
      ...form,
      name: data?.fullName,
      fullName: data?.fullName,
      address: data?.address,
      number: data?.phone,
    });
  };



  return (
    <div className={cx("form")}>
      <div className="row">
        <div className="col-sm-12">
          <div className="row my-3">
            <div
              className="col-sm-12"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <label htmlFor="name">Tên khách hàng</label>
              <div
                className="col-sm-10 pl-3 pr-0"
                style={{ position: "relative" }}
              >
                <Input
                  required={true}
                  name={"name"}
                  value={form.name}
                  className={className("form-group", "input-custom")}
                  type={"text"}
                  onChange={(e) => handleGetListCustomer(e)}
                  errorMessage={errorsMessage["name"]}
                />
                {listsearchCustomer && listsearchCustomer.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      backgroundColor: "#f6f4f4",
                      maxHeight: "50px",
                      width: "40%",
                      zIndex: "10",
                      borderRadius: "4px",
                      boxShadow: "0px 8px 10px -9px black",
                    }}
                  >
                    {listsearchCustomer.map((res: any) => (
                      <div
                        style={{
                          height: "40px",
                          padding: "6px",
                        }}
                        onClick={() => handleSetData(res)}
                      >
                        {res.fullName}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div
              className="col-sm-12"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <label htmlFor="name">Khách hàng</label>
              <div className="col-sm-10 pl-3 pr-0" style={{ display: "flex" }}>
                <select
                  name=""
                  id=""
                  style={{
                    width: "40%",
                    marginRight: "10px",
                    border: "1px solid #e3e3e3",
                    borderRadius: "4px",
                  }}
                >
                  <option>Nam</option>
                  <option>Nữ</option>
                  <option>Khác</option>
                </select>
                <Input
                  required={true}
                  name={"fullName"}
                  placeholder="Họ và tên"
                  value={form.fullName}
                  className={className(
                    "form-group",
                    "input-custom",
                    "name-input"
                  )}
                  type={"text"}
                  onChange={(e) => onChange(e)}
                  errorMessage={errorsMessage["name"]}
                />
                <Input
                  required={true}
                  name={"number"}
                  placeholder="Điện thoại"
                  value={form.number}
                  className={className("form-group", "input-custom")}
                  type={"text"}
                  onChange={(e) => onChange(e)}
                  errorMessage={errorsMessage["name"]}
                />
              </div>
            </div>
            {/* <div className='col-sm-12'>
              <Input
                required={true}
                name={'name'}
                label={'Ngày bắt đầu'}
                value={form.name}
                className={className('form-group', 'input-custom')}
                type={'text'}
                onChange={(e) => onChange(e)}
                errorMessage={errorsMessage['name']}
              />

              <TimePicker
                name='startTime' // Set the name to identify the field in the form state
                placeholder='Thời gian bắt đầu'
                value={form.startTime}
                className={className('form-group', 'input-custom')}
                defaultValue={
                  form.startTime ? moment(form.startTime, 'HH:mm') : moment()
                }
                format='HH:mm'
                minuteStep={15}
                disabledTime={() => ({
                  disabledHours: () =>
                    Array.from(Array(24).keys()).filter(
                      (hour) => hour < 8 || hour > 20
                    ),
                })}
                hideDisabledOptions={true}

                // onChange={(value, dateString) => {
                //   console.log('Time', value, dateString);
                //   setTime(dateString);
                // }}
              />
            </div> */}
          </div>
          <div className="row my-3">
            <div
              className="col-sm-12"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <label htmlFor="name">Địa chỉ</label>
              <div
                className="col-sm-10 pl-3 pr-0"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Input
                  required={true}
                  name={"address"}
                  value={form.address}
                  placeholder="Địa chỉ"
                  className={className("form-group", "input-custom")}
                  type={"text"}
                  onChange={(e) => onChange(e)}
                  errorMessage={errorsMessage["name"]}
                />
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div
              className="col-sm-12"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <label htmlFor="name">Ghi chú</label>
              <div className="col-sm-10 pl-3 pr-0">
                <textarea
                  name=""
                  id=""
                  rows={2}
                  style={{
                    width: "100%",
                    padding: "5px",
                    border: "1px solid #e3e3e3",
                    borderRadius: "4px",
                  }}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div
              className="col-sm-12"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <label htmlFor="name">Tại chi nhánh</label>
              <div className="col-sm-10 pl-3 pr-0 d-flex justify-content-between align-items-center">
                <select
                  name=""
                  id=""
                  style={{
                    width: "40%",
                    height: "36px",
                    border: "1px solid #e3e3e3",
                    borderRadius: "4px",
                  }}
                  onChange={(e) => setForm({...form,branchId:e.target.value})}
                >
                  <option selected disabled hidden>
                    select
                  </option>
                  {listBranches &&
                    listBranches.length > 0 &&
                    listBranches.map((branch: any) => {
                      return <option value={branch.id}>{branch?.name}</option>;
                    })}
                </select>
              </div>
            </div>
          </div>
          <div
            className="row py-3 mx-0"
            style={{
              borderTop: "1px solid #e0d1d1",
              color: "#333",
              fontWeight: 500,
            }}
          >
            <div className="col-sm-2 p-0">
              <span>Khách hàng</span>
            </div>
            <div className="col-sm-5">
              <span>Dịch vụ</span>
            </div>
            {/* <div className="col-sm-5">
              <span>Nhân viên phục vụ</span>
            </div> */}
          </div>
          <div className="row guest-list">
            <div className="col-sm-2">
              <span>KHÁCH 1</span>
            </div>
            <div className="col-sm-5 pl-4 pr-0">
              <ReactSelect
                options={selectedOptionService}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option,
                }}
                onChange={(e:any)=>setServiceSelected(e)}
                // allowSelectAll={true}
                // value={optionSelected}
              />
            </div>
            {/* <div className="col-sm-5">
              <ReactSelect
                options={staffOptions}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option,
                }}
                // onChange={handleChange}
                // allowSelectAll={true}
                // value={optionSelected}
              />
            </div> */}
          </div>
          {/* <div className='row'>
            <div className='col-sm-12'>
              <Input
                required={true}
                name={'name'}
                label={'Booking bạn muốn thêm'}
                value={form.name}
                className={className('form-group', 'input-custom')}
                type={'text'}
                onChange={(e) => onChange(e)}
                errorMessage={errorsMessage['name']}
              />
            </div>
          </div> */}
        </div>
      </div>
      <div
        className="row d-flex justify-content-end pt-4 mt-5"
        style={{ margin: "0px", borderTop: "1px solid #e0d1d1" }}
      >
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
    </div>
  );
}
