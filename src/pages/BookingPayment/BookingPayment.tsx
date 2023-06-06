import { Suspense, lazy, useEffect, useState } from 'react';
import { FiBold, FiDollarSign } from 'react-icons/fi';
import { formatPriceVietnam } from '../../common/helper';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import { httpService } from '../../redux/service/httpService';
import './BookingPayment.scss';
import MerchantInfo from './components/MerchantInfo';
import ServiceInfo, { Iservice } from './components/ServiceInfo';
import { useNavigate } from 'react-router-dom';
import ModalConfirm from '../../components/ModalConfirm/ModalConfirm';
import { toast } from 'react-toastify';
import { BASE_API_URL } from '../../constants';
const MainLayout = lazy(() => import('../../components/MainLayout'));

export default function BookingPayment() {
  const navigate = useNavigate();
  const [bookingDetail, setBookingDetail] = useState<any>();
  const [selectedMethod, setSelectedMethod] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(0); // -1: that bat/ 1. thanh cong
  const [total, setTotal] = useState<number>(0);
  const url = new URL(window.location.href);
  const params = url.pathname.split('/');
  const bookingId = params[params.length - 1];

  const getBookingDetail = async () => {
    try {
      const res: any = await httpService.GET({
        uri: `/bookings/${bookingId}`,
      });
      setBookingDetail(res.result.booking);
    } catch (error) {}
  };
  useEffect(() => {
    getBookingDetail();
  }, []);

  const handleMethodChange = (event: any) => {
    setSelectedMethod(event.target.value);
  };

  useEffect(() => {
    if (
      bookingDetail &&
      bookingDetail?.services &&
      bookingDetail?.services.length > 0
    ) {
      let total = 0;
      bookingDetail?.services.forEach((service: { price: number }) => {
        total += service.price;
      });
      setTotal(total);
    }
  }, [bookingDetail]);

  const paramsSearch = new URLSearchParams(url.search);
  const vnpResponseCode = paramsSearch.get('vnp_ResponseCode');

  const callBackPayment = async () => {
    try {
      const res = await httpService.GET({
        uri: `${BASE_API_URL}/payments/callback${window.location.search}`,
      });
      if (res) {
        if (vnpResponseCode == '00') {
          setPaymentSuccess(1);
        } else {
          setPaymentSuccess(-1);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (vnpResponseCode) {
      callBackPayment();
    }
  }, [vnpResponseCode]);

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast.error('Chưa chọn phương thức thanh toán!');
    }
    if (selectedMethod == 'vnpay') {
      const res: any = await httpService.POST({
        uri: 'payments',
        request: {
          type: 1,
          bookingIds: [+bookingId],
          totalPrice: total,
          vnpayUrl: window.location.href,
        },
      });
      if (res) window.location.href = res.result.payment.vnpUrl;
    } else if (selectedMethod == 'cash') {
      try {
        const res: any = await httpService.POST({
          uri: 'payments',
          request: {
            type: 0,
            bookingIds: [+bookingId],
            totalPrice: total,
            vnpayUrl: window.location.href,
          },
        });
        if (res) {
          setPaymentSuccess(1);
        }
      } catch (error) {
        setPaymentSuccess(-1);
      }
    }
  };
  if (!bookingDetail) {
    return <Loading />;
  }
  return (
    <Suspense fallback={<></>}>
      <MainLayout title="Booking Payment">
        <div className="row booking-payment">
          <div className="col-md-8 left">
            <p className="booking-payment-title">Thông tin chi tiết</p>
            <span className="service-info-title">Thông tin dịch vụ:</span>
            <div className="serviceList">
              {bookingDetail.services?.map((service: Iservice) => {
                return <ServiceInfo service={service} />;
              })}
            </div>
            <hr style={{ marginTop: '30px' }} />
            <span className="service-info-title">Thông nhà cung cấp:</span>
            <MerchantInfo merchant={bookingDetail.merchant} />
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-3 right">
            <span className="payment-title-right">Thanh toán</span>
            <div className="content-payment">
              <div className="infoItem">
                <FiDollarSign color="#ACB2BC" />
                <span className="nameTitle">Tổng tiền:</span>
                <span className="valueTitle">{formatPriceVietnam(total)}</span>
              </div>
              <div className="infoItem">
                <FiBold color="#ACB2BC" />
                <span className="nameTitle">Giảm giá:</span>
                <span className="valueTitle">{formatPriceVietnam('0')}</span>
              </div>
              <div className="payment-methods">
                <span className="method-title">
                  Chọn phương thức thanh toán:
                </span>
                <div className="list-method">
                  <div className="payment-method">
                    <input
                      type="radio"
                      id="cash"
                      name="paymentMethod"
                      value="cash"
                      checked={selectedMethod === 'cash'}
                      onChange={handleMethodChange}
                    />
                    <label htmlFor="cash">Thanh toán bằng tiền mặt</label>
                  </div>

                  <div className="payment-method">
                    <input
                      type="radio"
                      id="vnpay"
                      name="paymentMethod"
                      value="vnpay"
                      checked={selectedMethod === 'vnpay'}
                      onChange={handleMethodChange}
                    />
                    <label htmlFor="vnpay">Thanh toán bằng VNPAY</label>
                  </div>
                  <br />
                  <Button
                    disabled={bookingDetail.status == 6 || paymentSuccess != 0}
                    label="Thanh toán"
                    maxWidth="100%"
                    onClick={handlePayment}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalConfirm
          title={
            paymentSuccess == 1
              ? 'Thanh toán thành công'
              : 'Thanh toán thất bại'
          }
          isModal={paymentSuccess != 0}
          subTitle={
            paymentSuccess == 1
              ? 'Bạn đã thanh toán booking thành công'
              : 'Thanh toán lỗi vui lòng thử lại'
          }
          confirmText="Quay về danh sách"
          cancelText="Hủy bỏ"
          onClick={() => {
            window.location.replace(window.location.origin + '/booking');
          }}
          setOpenModals={async () => {
            await getBookingDetail();
            setPaymentSuccess(0);
            // window.location.replace(window.location.href.split("?")[0]);
          }}
        ></ModalConfirm>
      </MainLayout>
    </Suspense>
  );
}
