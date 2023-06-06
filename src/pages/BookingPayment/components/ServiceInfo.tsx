import React from "react";
import { FiCode, FiCreditCard, FiEdit2, FiPackage } from "react-icons/fi";
import { formatDate, formatPriceVietnam } from "../../../common/helper";
export interface Iservice {
  id: number;
  name: string;
  price: string;
  sku: string;
  createdAt: string;
  image: string;
}
interface Iprop {
  service: Iservice;
}
export default function ServiceInfo({ service }: Iprop) {
  return (
    <div className="service-info">
      <div className="info-text">
        <div className="infoItem">
          <FiPackage color="#ACB2BC" />
          <span className="nameTitle">Tên dịch vụ:</span>
          <span className="valueTitle">{service.name}</span>
        </div>
        <div className="infoItem">
          <FiCreditCard color="#ACB2BC" />
          <span className="nameTitle">Giá:</span>
          <span className="valueTitle">
            {formatPriceVietnam(service.price)}
          </span>
        </div>
        <div className="infoItem">
          <FiCode color="#ACB2BC" />
          <span className="nameTitle">Mã dịch vụ:</span>
          <span className="valueTitle">{service.sku}</span>
        </div>
        <div className="infoItem">
          <FiEdit2 color="#ACB2BC" />
          <span className="nameTitle">Ngày tạo:</span>
          <span className="valueTitle">{formatDate(service.createdAt)}</span>
        </div>
      </div>
      <div className="image">
        <img
          src="https://misalon.s3.ap-southeast-1.amazonaws.com/b.png"
        />
      </div>
    </div>
  );
}
