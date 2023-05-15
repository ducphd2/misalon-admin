import classNames from "classnames/bind";
import { lazy, Suspense } from "react";
import styles from "./ProfileWidget.module.scss";
import { Link } from "react-router-dom";
import AvatarDefault from "../../assets/images/avatarDefault.png";
const DropDownEdit = lazy(() => import("../DropDownEdit"));
const className = classNames.bind(styles);
interface ProfileWidgetType {
  firstName?: string;
  lastName?: string;
  imgSrc?: string;
  id?: string;
  designation?: string;
  handleDelete: Function;
  handleEdit: Function;
  role:string;
  accountEmployeeId:any;
}
function ProfileWidget(props: ProfileWidgetType) {
  const {
    firstName,
    lastName,
    imgSrc,
    id,
    designation,
    handleDelete,
    handleEdit,
    role,
    accountEmployeeId
  } = props;

  return (
    <div className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3">
      <div className={className("profile-widget")}>
        <div className={className("profile-img")}>
          <Link
            to={`/employee-profile?id=${id}`}
            className={className("avatar")}
          >
            <img src={imgSrc ? imgSrc : AvatarDefault} alt="" />
          </Link>
        </div>
        {(role === "ADMIN" || id === accountEmployeeId) && (
          <Suspense fallback={<></>}>
            <DropDownEdit
              deleteCondition={id !== accountEmployeeId}
              customClass={className("dropdown-relative")}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </Suspense>
        )}
        <h4
          className={className("user-name", "m-t-10", "mb-0", "text-ellipsis")}
        >
          <Link to={`/employee-profile?id=${id}`}>
            {firstName} {lastName}
          </Link>
        </h4>
        <div className={className("small", "text-muted", "designation")}>
          {designation}
        </div>
      </div>
    </div>
  );
}

export default ProfileWidget;
