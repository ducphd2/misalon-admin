import classNames from 'classnames/bind'
import React from 'react'
import styles from "./PageSizeSelector.module.scss"
const className = classNames.bind(styles)
interface PageSizeSelectorType {
    listPageSize:number[]
    onPageSizeChange:Function
    pageSize?:number
}
function PageSizeSelector({listPageSize,onPageSizeChange,pageSize}:PageSizeSelectorType) {
    const handleChangePageSize = (e:any) => {
        onPageSizeChange(e.target.value)
    }
  return (
    <div className={className("pagesize-selector","col-sm-12", "col-md-6")}>
        <label>
            Show{" "}
            <select className={className("pagesize-select")} onChange={handleChangePageSize} value={pageSize}>
                {listPageSize.map((opt,index) => {
                    return (
                        <option value={opt} key={index}>{opt}</option>
                    )
                })}
            </select>
            {" "}entries
        </label>
    </div>
  )
}

export default PageSizeSelector