import { Select } from "antd";
import styled from "styled-components";

export const SelectStyle = styled(Select)`
  &&&.ant-select {
    .ant-select-selector {
      border-radius: 4px;
      height: 40px;
      align-items: center;
    }
  }
`;