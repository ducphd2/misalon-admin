import classNames from 'classnames/bind';
import { Suspense, lazy, useEffect, useState } from 'react';
import { uploadImages } from '../../../common/utils';
import { useAppDispatch } from '../../../redux/hooks';
import {
  addService,
  editService,
} from '../../../redux/slice/Service/ServiceSlice';
import {
  AddServiceReq,
  EditServiceReq,
} from '../../../redux/types/Service/service';
import styles from './ModalService.module.scss';
const Input = lazy(() => import('../../../components/Input'));
const Button = lazy(() => import('../../../components/Button'));

export default function ModalService({ onCloseModal, defaultValue }: any) {
  const dispatch = useAppDispatch();
  const cx = classNames.bind(styles);
  const [isUploading, setIsUploading] = useState(false);
  const merchant = JSON.parse(localStorage.getItem('merchant') as any);

  const [form, setForm] = useState<AddServiceReq>({
    merchantId: merchant.id,
    name: '',
    description: '',
    price: 0,
    type: 0,
  });

  useEffect(() => {
    if (!!defaultValue) {
      setForm(defaultValue);
    }
  }, [defaultValue]);
  const [errorsMessage, setErrorsMessage] = useState({} as any);
  const className = classNames.bind(styles);
  const onChange = (e: any) => {
    if (e.target.name == 'price') {
      setForm({ ...form, [e.target.name]: +e.target.value });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    if (!!defaultValue) {
      dispatch(editService(form as unknown as EditServiceReq));
    } else {
      dispatch(addService(form));
    }
    onCloseModal();
  };

  const handleUpload = async (event: any) => {
    setIsUploading(true);
    const res = await uploadImages(event.target.files);

    setForm({ ...form, image: res[0].url });
    setIsUploading(false);
  };

  const handleSelect = (e: number, name: string) => {
    setForm({ ...form, [name]: e });
  };

  return (
    <div className={cx('form')}>
      <div className="row">
        <div className="col-sm-12">
          <Input
            required={true}
            name={'name'}
            label={'Tên dịch vụ'}
            value={form.name}
            className={className('form-group', 'input-custom')}
            type={'text'}
            onChange={(e) => onChange(e)}
            errorMessage={errorsMessage['name']}
          />
        </div>
        <div className="col-sm-12">
          <Input
            required={true}
            name={'description'}
            label={'Mô tả'}
            value={form.description}
            className={className('form-group', 'input-custom')}
            type={'text'}
            onChange={(e) => onChange(e)}
            errorMessage={errorsMessage['description']}
          />
        </div>
        {/* <div className="col-sm-6">
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
        </div> */}
        {/* <div className="col-sm-6">
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
        </div> */}
        <div className="col-sm-12">
          <Input
            required={true}
            name={'price'}
            label={'Giá dịch vụ'}
            value={Number(form.price)}
            className={className('form-group', 'input-custom')}
            type={'text'}
            onChange={(e) => onChange(e)}
            errorMessage={errorsMessage['price']}
          />
        </div>
        {/* <div className="col-sm-6">
          <Input
            required={true}
            name={"initialPrice"}
            label={"Giá gốc"}
            value={form.initialPrice}
            className={className("form-group", "input-custom")}
            type={"text"}
            onChange={(e) => onChange(e)}
            errorMessage={errorsMessage["initialPrice"]}
          />
        </div>
        <div className="col-sm-6">
          <Input
            required={true}
            name={"durationHour"}
            label={"Thời gian(Giờ)"}
            value={form.durationHour}
            className={className("form-group", "input-custom")}
            type={"text"}
            onChange={(e) => onChange(e)}
            errorMessage={errorsMessage["durationHour"]}
          />
        </div>
        <div className="col-sm-6">
          <Input
            required={true}
            name={"durationMinute"}
            label={"Thời gian(Phút)"}
            value={form.durationMinute}
            className={className("form-group", "input-custom")}
            type={"text"}
            onChange={(e) => onChange(e)}
            errorMessage={errorsMessage["durationMinute"]}
          />
        </div> */}
        {/* <div className="col-sm-6">
          <Dropdown
            options={EServiceShowTypeValue || []}
            label="name"
            value="value"
            valueChosen=""
            setValueChosen={(e) => handleSelect(e, "showType")}
            className={className("form-group", "input-custom")}
            title="Chọn vị trí hiển thị"
          />
        </div>
        <div className="col-sm-6">
          <Dropdown
            options={EServiceTypeValue || []}
            label="name"
            value="value"
            valueChosen=""
            setValueChosen={(e) => handleSelect(e, "type")}
            className={className("form-group", "input-custom")}
            title="Chọn loại"
          />
        </div> */}
        {/* <div className="col-sm-12">
          <Dropdown
            options={canPrintableInvoice || []}
            label="name"
            value="value"
            valueChosen=""
            setValueChosen={(e) => handleSelect(e, "canPrintableInvoice")}
            className={className("form-group", "input-custom")}
            title="Không in hóa đơn"
          />
        </div> */}
        <div className="col-sm-12">
          <div className={cx('input-label')}>Ảnh dịch vụ</div>
          <input type="file" onChange={handleUpload} />
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
