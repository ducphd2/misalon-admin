import classNames from "classnames/bind";
import styles from "./Loading.module.scss";
function Loading(props: any) {
  const { fullPage = false, height } = props;
  const cx = classNames.bind(styles);

  return (
    <div
      className={cx(`${fullPage ? "loading-container" : "loading-session"}`)}
      style={{ height: height }}
    >
      <div className={cx("lds-ripple")}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
