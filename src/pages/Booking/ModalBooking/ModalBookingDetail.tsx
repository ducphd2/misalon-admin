import classNames from "classnames/bind";
import { Suspense, lazy, useEffect, useState } from "react";

import styles from "./ModalBooking.module.scss";
import { DatePicker } from "antd";

import { httpService } from "../../../redux/service/httpService";

const Input = lazy(() => import("../../../components/Input"));

export default function ModalBookingDetail({
  onCloseModal,
  defaultValuem,
  idBooking,
}: any) {
  const cx = classNames.bind(styles);

  const className = classNames.bind(styles);
  const [bookingDetail, setBookingDetail] = useState<any>();

  const getBookingDetail = async () => {
    try {
      const res: any = await httpService.GET({
        uri: `/bookings/${idBooking}`,
      });
      setBookingDetail(res.result.booking);
    } catch (error) {}
  };
  useEffect(() => {
    getBookingDetail();
  }, []);

  console.log("Detail", bookingDetail);

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
                  value={bookingDetail?.user?.fullName}
                  className={className("form-group", "input-custom")}
                  type={"text"}
                />
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
                <Input
                  required={true}
                  name={"name"}
                  placeholder="Giới tính"
                  value={bookingDetail?.user?.gender}
                  className={className(
                    "form-group",
                    "input-custom",
                    "name-input"
                  )}
                  type={"text"}
                />
                <Input
                  required={true}
                  name={"email"}
                  placeholder="Email"
                  value={bookingDetail?.user?.email}
                  className={className(
                    "form-group",
                    "input-custom",
                    "name-input"
                  )}
                  type={"text"}
                />
                <Input
                  required={true}
                  name={"number"}
                  placeholder="Điện thoại"
                  value={bookingDetail?.user?.phoneNumber}
                  className={className("form-group", "input-custom")}
                  type={"text"}
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
                  value={bookingDetail?.user?.address}
                  placeholder="Địa chỉ"
                  className={className("form-group", "input-custom")}
                  type={"text"}
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
                  value={bookingDetail?.note}
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
              <label htmlFor="name">Thời gian</label>
              <div className="col-sm-10 pl-3 pr-0" style={{ display: "flex" }}>
                <Input
                  required={true}
                  name={"date"}
                  placeholder="Ngày đặt"
                  value={bookingDetail?.bookingDate}
                  className={className(
                    "form-group",
                    "input-custom",
                    "name-input"
                  )}
                  type={"text"}
                />
                <Input
                  required={true}
                  name={"time"}
                  placeholder="Giờ bắt đầu"
                  value={bookingDetail?.startTime}
                  className={className(
                    "form-group",
                    "input-custom",
                    "name-input"
                  )}
                  type={"text"}
                />
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
                <Input
                  required={true}
                  name={"name_branch"}
                  placeholder="Tại chi nhánh"
                  value={bookingDetail?.branch?.name}
                  className={className(
                    "form-group",
                    "input-custom",
                    "name-input"
                  )}
                  type={"text"}
                />
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div
              className="col-sm-12"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <label htmlFor="name">Địa chỉ chi nhánh</label>
              <div className="col-sm-10 pl-3 pr-0 d-flex justify-content-between align-items-center">
                <Input
                  required={true}
                  name={"name_branch"}
                  placeholder="Tại chi nhánh"
                  value={bookingDetail?.branch?.address}
                  className={className(
                    "form-group",
                    "input-custom",
                    "name-input"
                  )}
                  type={"text"}
                />
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
            <div className="col-sm-5">
              <span>Dịch vụ</span>
            </div>
            <div className="col-sm-5">
              <span>Mô tả</span>
            </div>
            {/* <div className="col-sm-5">
              <span>Nhân viên phục vụ</span>
            </div> */}
          </div>
          {bookingDetail?.services?.map((item: any, i: number) => (
            <div
              className="row py-3 mx-0"
              style={{
                borderTop: "1px solid #e0d1d1",
                color: "#333",
                fontWeight: 500,
              }}
            >
              <div className="col-sm-2 p-0">
                <span>{item?.name}</span>
              </div>
              <div className="col-sm-10">
                <span>{item.description}</span>
              </div>
              {/* <div className="col-sm-5">
               <span>Nhân viên phục vụ</span>
             </div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
