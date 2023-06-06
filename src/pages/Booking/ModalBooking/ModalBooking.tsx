import classNames from 'classnames/bind';
import { Suspense, lazy, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import {
  addBooking,
  editBooking,
} from '../../../redux/slice/Booking/BookingSlice';
import { EditBookingReq } from '../../../redux/types/Booking/booking';
import styles from './ModalBooking.module.scss';

import { TimePicker } from 'antd';

import moment from 'moment';
const Input = lazy(() => import('../../../components/Input'));
const Button = lazy(() => import('../../../components/Button'));

export default function ModalBooking({ onCloseModal, defaultValue }: any) {
  const dispatch = useAppDispatch();
  const cx = classNames.bind(styles);
  const [isUploading, setIsUploading] = useState(false);
  const merchant = JSON.parse(localStorage.getItem('merchant') as any);
  const [form, setForm] = useState({
    merchantId: merchant.id,
    sku: '',
    code: '',
    name: '',
    description: '',
    status: 1,
    startTime: null,
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

  const [isAccept, setIsAccept] = useState(1);

  const handleOptionSelect = (e: any) => {
    setIsAccept(+e.target.value);
  };

  return (
    <div className={cx('form')}>
      <div className="row">
        <div className="col-sm-12">
          <Input
            required={true}
            name={'name'}
            label={'Tên khách hàng'}
            value={form.name}
            className={className('form-group', 'input-custom')}
            type={'text'}
            onChange={(e) => onChange(e)}
            errorMessage={errorsMessage['name']}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <Input
            required={true}
            name={'name'}
            label={'Thời gian bắt đầu'}
            value={form.name}
            className={className('form-group', 'input-custom')}
            type={'text'}
            onChange={(e) => onChange(e)}
            errorMessage={errorsMessage['name']}
          />
        </div>
        <div className="col-sm-12">
          {/* <Input
            required={true}
            name={'name'}
            label={'Ngày bắt đầu'}
            value={form.name}
            className={className('form-group', 'input-custom')}
            type={'text'}
            onChange={(e) => onChange(e)}
            errorMessage={errorsMessage['name']}
          /> */}

          <TimePicker
            name="startTime" // Set the name to identify the field in the form state
            placeholder="Thời gian bắt đầu"
            value={form.startTime}
            className={className('form-group', 'input-custom')}
            defaultValue={
              form.startTime ? moment(form.startTime, 'HH:mm') : moment()
            }
            format="HH:mm"
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
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
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
      </div>
      <div className={cx('submit-section')}>
        <Suspense>
          <Button
            label="Submit"
            disabled={isUploading}
            type="submit"
            onClick={handleSubmit}
            classType={cx('btn-submit')}
          />
        </Suspense>
      </div>
    </div>
  );
}
