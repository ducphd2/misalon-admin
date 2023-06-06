import classNames from 'classnames/bind';
import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { uploadImages } from '../../../common/utils';
import { MarkerPosition } from '../../../components/Map/Map';
import { useAppDispatch } from '../../../redux/hooks';
import { addBranch, editBranch } from '../../../redux/slice/Branch/BranchSlice';
import { EditBranchReq } from '../../../redux/types/Branch/branch';
import styles from './ModalBranch.module.scss';
const Input = lazy(() => import('../../../components/Input'));
const Button = lazy(() => import('../../../components/Button'));
const Map = lazy(() => import('../../../components/Map'));

export default function ModalBranch({ onCloseModal, defaultValue }: any) {
  const dispatch = useAppDispatch();
  const cx = classNames.bind(styles);
  const merchant = JSON.parse(localStorage.getItem('merchant') as any);

  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const [coordinate, setCoordinate] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 20.9809307166735,
    longitude: 105.7961750470138,
  });

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    merchantId: merchant.id,
    latitude: 20.9809307166735,
    longitude: 105.7961750470138,
    image: '',
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinate({
          latitude,
          longitude,
        });
      }
    );
  }, []);

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

  const handleSelected = (position: MarkerPosition) => {
    setForm({ ...form, latitude: position.lat, longitude: position.lng });
  };

  const handleUpload = async (event: any) => {
    setIsUploading(true);
    const res = await uploadImages(event.target.files);

    setForm({ ...form, image: res[0].url });
    setIsUploading(false);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  return (
    <div className={cx('form')}>
      <div className="row">
        <div className="col-md-5">
          <div className="col-sm-12">
            <Input
              required={true}
              name={'name'}
              label={'Tên chi nhánh'}
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
              name={'phone'}
              label={'Số điện thoại'}
              value={form.phone}
              className={className('form-group', 'input-custom')}
              type={'text'}
              onChange={(e) => onChange(e)}
              errorMessage={errorsMessage['name']}
            />
          </div>
          <div className="col-sm-12">
            <Input
              required={true}
              name={'address'}
              label={'Địa chỉ'}
              value={form.address}
              className={className('form-group', 'input-custom')}
              type={'text'}
              onChange={(e) => onChange(e)}
              errorMessage={errorsMessage['name']}
            />
          </div>

          <div className="col-sm-12">
            <div className={cx('input-label')}>Ảnh chi nhánh</div>
            <input type="file" onChange={handleUpload} />
            {imagePreview && (
              <div className={cx('image-preview')}>
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
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
          <div style={{ height: '400px', width: '100%' }}>
            <label style={{ fontSize: '16px' }}>Vui lòng chọn vị trí</label>
            <Map
              defaultValue={{ lat: form.latitude, lng: form.longitude }}
              onCloseModal={onCloseModal}
              onSelected={handleSelected}
            />
          </div>
        </div>
      </div>
      <div className={cx('submit-section')}>
        <Suspense>
          <Button
            label="Submit"
            type="submit"
            disabled={isUploading}
            onClick={handleSubmit}
            classType={cx('btn-submit')}
          />
        </Suspense>
      </div>
    </div>
  );
}
