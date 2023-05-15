import { useState, useEffect, memo } from "react";
import axios from "axios";
import styles from "./styles.module.scss";
import Dropdown from "../Dropdown/Dropdown";

function LocationSelector({ onChangAddress }: any) {
  const [cities, setCities] = useState<any>([]);
  const [cityCode, setSelectedCity] = useState("");
  const [districts, setDistricts] = useState([]);
  const [districtCode, setSelectedDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [wardCode, setSelectedWard] = useState("");
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleCityChange(cityId: string) {
    setSelectedCity(cityId);
    setSelectedDistrict("");
    setSelectedWard("");
    const selectedCityData: any = cities.find(
      (city: any) => city.Id === cityId
    );
    setDistricts(selectedCityData ? selectedCityData.Districts : []);
  }

  function handleDistrictChange(districtId: string) {
    setSelectedDistrict(districtId);
    setSelectedWard("");
    const selectedDistrictData: any = districts.find(
      (district: any) => district.Id === districtId
    );
    setWards(selectedDistrictData ? selectedDistrictData.Wards : []);
  }

  function handleWardChange(id: string) {
    setSelectedWard(id);
  }

  useEffect(() => {
    onChangAddress({
      cityCode: +cityCode,
      city: (cities.find((i: any) => i.Id == cityCode)?.Name as string) || "",
      districtCode: +districtCode,
      district: cityCode
        ? cities
            .find((i: any) => i.Id == cityCode)
            ?.Districts.find((i: any) => i.Id == districtCode)?.Name
        : "",
      wardCode: +wardCode,
      ward: districtCode
        ? cities
            .find((i: any) => i.Id == cityCode)
            ?.Districts.find((i: any) => i.Id == districtCode)
            .Wards.find((i: any) => i.Id == wardCode)?.Name
        : "",
    });
  }, [cityCode, districtCode, wardCode]);

  return (
    <div className="row">
      <div className="col-sm-4">
        <Dropdown
          options={cities || []}
          label="Name"
          value="Id"
          valueChosen=""
          setValueChosen={handleCityChange}
          title="Tỉnh"
        />
      </div>
      <div className="col-sm-4">
        <Dropdown
          options={districts || []}
          label="Name"
          value="Id"
          valueChosen=""
          setValueChosen={handleDistrictChange}
          title="Huyện"
        />
      </div>
      <div className="col-sm-4">
        <Dropdown
          options={wards || []}
          label="Name"
          value="Id"
          valueChosen=""
          setValueChosen={handleWardChange}
          title="Xã"
        />
      </div>
    </div>
  );
}

export default memo(LocationSelector);
