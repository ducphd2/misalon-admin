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
import { FiPlusCircle } from 'react-icons/fi';
import { FaPhoneAlt } from 'react-icons/fa';

import { default as ReactSelect } from 'react-select';
import Option from '../../../components/OptionSelect';
import axios from 'axios';
import { BASE_API_URL } from '../../../constants';

const Input = lazy(() => import('../../../components/Input'));
const Button = lazy(() => import('../../../components/Button'));

export default function ModalBooking({ onCloseModal, defaultValue }: any) {
  const dispatch = useAppDispatch();
  const cx = classNames.bind(styles);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
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
  useEffect(() => {
    const getList = async () => {
      // try {
      //   const res = await axios.get(
      //     `${BASE_API_URL}/merchants/:merchantId/customers`
      //   );
      //   console.log(res);
      // } catch (error) {
      //   console.log(error);
      // }
      axios
        .get(`${BASE_API_URL}/merchants/17/customers`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getList();
  }, []);
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

  const colourOptions = [
    { value: 'ocean1', label: 'Ocean' },
    { value: 'blue', label: 'Blue' },
    { value: 'purple', label: 'Purple' },
    { value: 'red', label: 'Red' },
    { value: 'orange', label: 'Orange' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'green', label: 'Green' },
  ];
  const staffOptions = [
    { value: 'nv1', label: 'Nhan vien 1' },
    { value: 'nv2', label: 'Nhan vien 2' },
    { value: 'nv3', label: 'Nhan vien 3' },
    { value: 'nv4', label: 'Nhan vien 4' },
  ];

  return (
    <div className={cx('form')}>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='row my-3'>
            <div
              className='col-sm-12'
              style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label htmlFor='name'>Tên khách hàng</label>
              <div className='col-sm-10 pl-3 pr-0'>
                <Input
                  required={true}
                  name={'name'}
                  value={form.name}
                  className={className('form-group', 'input-custom')}
                  type={'text'}
                  onChange={(e) => onChange(e)}
                  errorMessage={errorsMessage['name']}
                />
              </div>
            </div>
          </div>
          <div className='row my-3'>
            <div
              className='col-sm-12'
              style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label htmlFor='name'>Khách hàng</label>
              <div className='col-sm-10 pl-3 pr-0' style={{ display: 'flex' }}>
                <select
                  name=''
                  id=''
                  style={{
                    width: '40%',
                    marginRight: '10px',
                    border: '1px solid #e3e3e3',
                    borderRadius: '4px',
                  }}>
                  <option>Nam</option>
                  <option>Nữ</option>
                  <option>Khác</option>
                </select>
                <Input
                  required={true}
                  name={'name'}
                  placeholder='Họ và tên'
                  value={form.name}
                  className={className(
                    'form-group',
                    'input-custom',
                    'name-input'
                  )}
                  type={'text'}
                  onChange={(e) => onChange(e)}
                  errorMessage={errorsMessage['name']}
                />
                <Input
                  required={true}
                  name={'name'}
                  placeholder='Điện thoại'
                  value={form.name}
                  className={className('form-group', 'input-custom')}
                  type={'text'}
                  onChange={(e) => onChange(e)}
                  errorMessage={errorsMessage['name']}
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
          <div className='row my-3'>
            <div
              className='col-sm-12'
              style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label htmlFor='name'>Địa chỉ</label>
              <div
                className='col-sm-10 pl-3 pr-0'
                style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Input
                  required={true}
                  name={'name'}
                  value={form.name}
                  placeholder='Địa chỉ'
                  className={className('form-group', 'input-custom')}
                  type={'text'}
                  onChange={(e) => onChange(e)}
                  errorMessage={errorsMessage['name']}
                />
              </div>
            </div>
          </div>
          <div className='row my-3'>
            <div
              className='col-sm-12'
              style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label htmlFor='name'>Ghi chú</label>
              <div className='col-sm-10 pl-3 pr-0'>
                <textarea
                  name=''
                  id=''
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '5px',
                    border: '1px solid #e3e3e3',
                    borderRadius: '4px',
                  }}></textarea>
              </div>
            </div>
          </div>
          <div className='row my-3'>
            <div
              className='col-sm-12'
              style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label htmlFor='name'>Tại chi nhánh</label>
              <div className='col-sm-10 pl-3 pr-0 d-flex justify-content-between align-items-center'>
                <select
                  name=''
                  id=''
                  style={{
                    width: '40%',
                    height: '36px',
                    border: '1px solid #e3e3e3',
                    borderRadius: '4px',
                  }}>
                  <option selected disabled hidden>
                    Da Nang
                  </option>
                  <option value=''>HCM</option>
                  <option value=''>Ha Noi</option>
                </select>
              </div>
            </div>
          </div>
          <div
            className='row py-3 mx-0'
            style={{
              borderTop: '1px solid #e0d1d1',
              color: '#333',
              fontWeight: 500,
            }}>
            <div className='col-sm-2 p-0'>
              <span>Khách hàng</span>
            </div>
            <div className='col-sm-5'>
              <span>Dịch vụ</span>
            </div>
            <div className='col-sm-5'>
              <span>Nhân viên phục vụ</span>
            </div>
          </div>
          <div className='row guest-list'>
            <div className='col-sm-2'>
              <span>KHÁCH 1</span>
            </div>
            <div className='col-sm-5 pl-4 pr-0'>
              <ReactSelect
                options={colourOptions}
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
            </div>
            <div className='col-sm-5'>
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
            </div>
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
        className='row d-flex justify-content-end pt-4 mt-5'
        style={{ margin: '0px', borderTop: '1px solid #e0d1d1' }}>
        <div className={cx('submit-section')}>
          <Suspense>
            <Button
              label='Submit'
              disabled={isUploading}
              type='submit'
              onClick={handleSubmit}
              classType={cx('btn-submit')}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
