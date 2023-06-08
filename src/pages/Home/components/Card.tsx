import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiMapPin } from "react-icons/fi";
import { toast } from "react-toastify";
import { formatPriceVietnam } from "../../../common/helper";
import Button from "../../../components/Button/Button";
import ModalDesignation from "../../../components/Modal/Modal";
import { httpService } from "../../../redux/service/httpService";
import Styles from "./style.module.scss";
interface IService {
  id: number;
  image: string;
  name: string;
  price: number;
  merchant: any;
}
interface Iprop {
  id: number;
  image: string;
  rating: number;
  name: string;
  price: number;
  merchant: any;
  onSelectService: (service: IService) => void;
}

const Card = ({ id, image, name, price, merchant, onSelectService }: Iprop) => {
  return (
    <div className={Styles.card}>
      <img className="card-img-top" src={image} alt={name} />
      <div className={Styles.serviceCardBody}>
        <p className={Styles.cardName}>{name}</p>
        <p className={Styles.cardAddress}>
          <FiMapPin /> {merchant.address}
        </p>
        <p className={Styles.cardPrice}>{formatPriceVietnam(price)} </p>
      </div>
      <div className={Styles.wappBtn}>
        <Button
          label="Đặt ngay."
          maxWidth="100px"
          classType={Styles.bookingNow}
          onClick={() =>
            onSelectService({
              id,
              image,
              merchant,
              name,
              price,
            })
          }
        />
      </div>
    </div>
  );
};

function CardHome() {
  const [activeMenu, setActiveMenu] = useState(1);
  const [services, setService] = useState<IService[]>([]);
  const [limit, setLimit] = useState(20);
  const [startDate, setStartDate] = useState<any>(new Date());
  const [branchIdSelected, setBranchIdSelected] = useState<
    number | undefined
  >();
  const [serviceSelected, setServiceSelected] = useState<
    IService | undefined
  >();
  const today = new Date();
  const [hasMore, setHasMore] = useState(true);
  const getServices = async () => {
    const res: any = await httpService.GET({
      uri: activeMenu == 1 ? "services" : "services/most-interested",
      params: {
        page: 1,
        limit: limit,
      },
    });
    if (res) {
      setService(res.result.items);
      if (res.result.items.length == services.length) {
        setHasMore(false);
      }
    }
  };
  useEffect(() => {
    getServices();
  }, [limit, activeMenu]);

  const handleViewMore = () => {
    setLimit(limit + 20);
  };

  const handleBooking = async () => {
    if (!branchIdSelected) {
      toast.error("Chưa chọn chi nhánh!");
      return;
    }
    const originalDate = new Date(startDate);
    const startTime = originalDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const bookingDate = originalDate.toISOString().split("T")[0];
    if (serviceSelected) {
      const res = await httpService.POST({
        uri: "bookings",
        request: {
          serviceIds: [+serviceSelected.id],
          startTime,
          bookingDate,
          branchId: branchIdSelected,
        },
      });
      if (res) {
        toast.success("Tạo lịch hẹn thành công!");
        setServiceSelected(undefined);
      }
    }
  };
  const handleSelect = (e: IService) => {
    setServiceSelected(e);
  };

  return (
    <>
      <div className={Styles.wrapperMain}>
        <div className={Styles.titleWrapper}>
          Dịch vụ tuyệt vời, có nhiều chính sách ưu đãi cao với khách hàng mới.
        </div>
        <div>
          <ul className={Styles.menuList}>
            <li
              className={`${activeMenu == 1 ? Styles.activeMenu : {}}`}
              onClick={() => {
                setHasMore(true);
                setActiveMenu(1);
              }}
            >
              Mới nhất
            </li>
            <li
              className={`${activeMenu == 2 ? Styles.activeMenu : {}}`}
              onClick={() => {
                setHasMore(true);
                setActiveMenu(2);
              }}
            >
              Quan tâm nhiều nhất
            </li>
          </ul>
        </div>
        <div className={Styles.listCard + " " + Styles.flexCenterBetween}>
          {services.map((service: IService) => {
            return (
              <Card
                id={service.id}
                image={service.image}
                name={service.name}
                price={service.price}
                rating={3}
                merchant={service.merchant as any}
                onSelectService={handleSelect}
              />
            );
          })}
        </div>
        {hasMore && (
          <div className={Styles.wappViewMoreBtn}>
            <Button
              label="Xem thêm"
              maxWidth="150px"
              classType={Styles.viewMoreBtn}
              onClick={handleViewMore}
            />
          </div>
        )}
        {/* <ModalConfirm
          cancelText="Hủy"
          confirmText="Đặt Lịch"
          onClick={handleBooking}
          setOpenModals={() => setServiceSelected(undefined)}
          isModal={!!serviceSelected}
          subTitle={"Bạn xác nhận đặt dịch vụ: " + serviceSelected?.name}
          title="Xác nhận booking"
        /> */}
        <ModalDesignation
          setOpenModals={() => setServiceSelected(undefined)}
          isModal={!!serviceSelected}
          title="Xác nhận booking"
        >
          <div>
            <p style={{ textAlign: "center" }}>
              Bạn đang yêu cầu đặt dịch vụ: {serviceSelected?.name}
            </p>
            <p>Lựa chọn chi nhánh:</p>
            <div className={Styles.listBranchSelect}>
              {serviceSelected?.merchant.branches.map((branch: any) => {
                return (
                  <div>
                    <input
                      type="radio"
                      id="cash"
                      value={branch.id}
                      checked={branchIdSelected == branch.id}
                      onChange={(e) => setBranchIdSelected(+e.target.value)}
                    />
                    <label htmlFor="cash">{branch.address}</label>
                  </div>
                );
              })}
            </div>
            <p>Chọn ngày giờ:</p>
            <DatePicker
              minDate={
                new Date(
                  today.getFullYear(),
                  today.getMonth(),
                  today.getDate() + 1
                )
              }
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              dateFormat="Pp"
            />

            <Button
              label="Đặt lịch hẹn"
              maxWidth="150px"
              classType={Styles.bookingBtn}
              onClick={handleBooking}
            />
          </div>
        </ModalDesignation>
      </div>
    </>
  );
}

export default CardHome;
