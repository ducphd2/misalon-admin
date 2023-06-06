import React from "react";
import { FiMapPin, FiPackage, FiPhone, FiUser } from "react-icons/fi";
export interface IMerchant {
  id: number;
  address: string;
  name: string;
  phone: string;
  userId: string;
}
interface Iprop {
  merchant: IMerchant;
}
export default function MerchantInfo({ merchant }: Iprop) {
  return (
    <div className="service-info">
      <div className="info-text">
        <div className="infoItem">
          <FiUser color="#ACB2BC" />
          <span className="nameTitle">Tên nhà cung cấp:</span>
          <span className="valueTitle">{merchant.name}</span>
        </div>
        <div className="infoItem">
          <FiMapPin color="#ACB2BC" />
          <span className="nameTitle">Địa chỉ:</span>
          <span className="valueTitle">{merchant.address}</span>
        </div>
        <div className="infoItem">
          <FiPhone color="#ACB2BC" />
          <span className="nameTitle">Số điện thoại:</span>
          <span className="valueTitle">{merchant.phone}</span>
        </div>
      </div>
      <div className="image"></div>
    </div>
  );
}
