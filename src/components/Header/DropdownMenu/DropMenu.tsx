import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./DropdownMenu.module.scss";

const cx = classNames.bind(styles);

interface IDataItem {
  [key: string]: any;
}

export type DropMenuProps = {
  isOpen: Boolean;
  listItem: IDataItem[];
  label?: string | number;
  link?: string | number
  onItemClick?: (path: string) => void;
};

export default function DropMenu({
  listItem,
  isOpen,
  link = "",
  label = "",
  onItemClick,
}: DropMenuProps) {

  const hanleClick = (path: string) => {
    if (onItemClick) {
      onItemClick(path);
    }
  }

  return isOpen === true ? (
    <div className={cx("menu-dropdown")}>
      <ul>
        {listItem.map((name, index) => (
          <li className={cx("list-menu-dropdown")} key={index} onClick={() => hanleClick(name[link])}>
            <Link to={name[link]}>
              {name[label]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
}
