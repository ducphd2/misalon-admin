import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./InformationProjects.module.scss";
import Avatar from "../../assets/images/avatar-02.jpg";
import useClickOutside from "../../hooks/useClickOutside";
interface InformationProjectsProps {}
const cx = classNames.bind(styles);
function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
export default function InformationProjects({}: InformationProjectsProps) {
  const [showListMember, setShowListMember] = useState<Boolean>(false);
  const [distance, setDistance] = useState(0);
  const modalRef = useRef<any>();
  const cardRef = useRef<any>();
  const { innerHeight } = getWindowSize();
  const handleShowListMember = () => {
    if (cardRef.current) {
      const tmpDistance =
        innerHeight - cardRef.current.getBoundingClientRect().bottom;
      setDistance(tmpDistance);
    }
    setShowListMember(!showListMember);
  };

  useClickOutside(modalRef, () => {
    setShowListMember(false);
  });
  return (
    <div className="col-lg-4 col-sm-6 col-md-4 col-xl-3" ref={cardRef}>
      <div className={cx("card")}>
        <div className={cx("card-body")}>
          <h4 className={cx("project-title")}>
            <a>Office Management</a>
          </h4>
          <small className={cx("block", "text-ellipsis", "m-b-15")}>
            <span className={cx("text-xs")}>1</span>{" "}
            <span className={cx("text-muted")}>open tasks, </span>
            <span className={cx("text-xs")}>9</span>{" "}
            <span className={cx("text-muted")}>tasks completed</span>
          </small>
          <p className={cx("text-muted")}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. When an unknown printer took a galley of type and
            scrambled it...
          </p>
          <div className={cx("pro-deadline", "m-b-15")}>
            <div className={cx("sub-title")}>Deadline:</div>
            <div className={cx("text-muted")}>17 Apr 2019</div>
          </div>
          <div className={cx("pro-deadline", "m-b-15")}>
            <div>Project Leader :</div>
            <ul className={cx("team-members")}>
              <li>
                <a href="#" data-toggle="tooltip" title="Jeffery Lalor">
                  <img alt="" src={Avatar} />
                </a>
              </li>
            </ul>
          </div>
          <div className={cx("pro-deadline", "m-b-15")}>
            <div>Team :</div>
            <ul className={cx("team-members")}>
              <li>
                <a href="#" data-toggle="tooltip" title="John Doe">
                  <img alt="" src={Avatar} />
                </a>
              </li>
              <li>
                <a href="#" data-toggle="tooltip" title="Richard Miles">
                  <img alt="" src={Avatar} />
                </a>
              </li>
              <li>
                <a href="#" data-toggle="tooltip" title="John Smith">
                  <img alt="" src={Avatar} />
                </a>
              </li>
              <li>
                <a href="#" data-toggle="tooltip" title="Mike Litorus">
                  <img alt="" src={Avatar} />
                </a>
              </li>
              <li className={cx("dropdown", "avatar-dropdown")}>
                <span
                  onClick={handleShowListMember}
                  className={cx("all-users", "dropdown-toggle")}
                  id="dropdown-toggle"
                  ref={modalRef}
                >
                  +15
                </span>
                {showListMember && (
                  <div
                    className={cx(
                      "dropdown-menu",
                      "dropdown-menu-right",
                      "dropdown-avatar",
                      distance < 100 && "top-end"
                    )}
                  >
                    <div className={cx("avatar-group")}>
                      <a className={cx("avatar", "avatar-xs")} href="#">
                        <img alt="" src={Avatar} />
                      </a>
                      <a className={cx("avatar", "avatar-xs")} href="#">
                        <img alt="" src={Avatar} />
                      </a>
                      <a className={cx("avatar", "avatar-xs")} href="#">
                        <img alt="" src={Avatar} />
                      </a>
                      <a className={cx("avatar", "avatar-xs")} href="#">
                        <img alt="" src={Avatar} />
                      </a>
                      <a className={cx("avatar", "avatar-xs")} href="#">
                        <img alt="" src={Avatar} />
                      </a>
                      <a className={cx("avatar", "avatar-xs")} href="#">
                        <img alt="" src={Avatar} />
                      </a>
                      <a className={cx("avatar", "avatar-xs")} href="#">
                        <img alt="" src={Avatar} />
                      </a>
                      <a className={cx("avatar", "avatar-xs")} href="#">
                        <img alt="" src={Avatar} />
                      </a>
                      <a className={cx("avatar", "avatar-xs")} href="#">
                        <img alt="" src={Avatar} />
                      </a>
                      <a className={cx("avatar", "avatar-xs")} href="#">
                        <img alt="" src={Avatar} />
                      </a>
                    </div>
                    <div className={cx("avatar-pagination")}>
                      <ul className={cx("pagination")}>
                        <li className={cx("page-item")}>
                          <a
                            className={cx("page-link")}
                            href="#"
                            aria-label="Previous"
                          >
                            <span aria-hidden="true">«</span>
                            <span className={cx("sr-only")}>Previous</span>
                          </a>
                        </li>
                        <li className={cx("page-item")}>
                          <a className={cx("page-link")} href="#">
                            1
                          </a>
                        </li>
                        <li className={cx("page-item")}>
                          <a className={cx("page-link")} href="#">
                            2
                          </a>
                        </li>
                        <li className={cx("page-item")}>
                          <a
                            className={cx("page-link")}
                            href="#"
                            aria-label="Next"
                          >
                            <span aria-hidden="true">»</span>
                            <span className={cx("sr-only")}>Next</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
          <p className="m-b-5">
            Progress{" "}
            <span className={cx("text-success", "float-right")}>40%</span>
          </p>
          <div className={cx("progress", "progress-xs", "mb-0")}>
            <div
              className={cx("progress-bar", "bg-success")}
              role="progressbar"
              data-toggle="tooltip"
              title="40%"
              style={{ width: "40%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
