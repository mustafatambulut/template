"use client";
import React from "react";
import { get } from "lodash";
import Select, { Theme } from "react-select";

import Option from "@/components/atoms/option/Option";
import Control from "@/components/atoms/control/Control";
import SelectMenu from "@/components/atoms/selectMenu/SelectMenu";
import SingleValue from "@/components/atoms/singleValue/SingleValue";
import SelectMenuList from "@/components/atoms/selectMenuList/SelectMenuList";
import DropdownIndicator from "@/components/atoms/dropdownIndicator/DropdownIndicator";

import AllIcon from "../../../../public/images/allicon.svg";
import PlaneIcon from "../../../../public/images/planeicon.svg";
import ConfirmedIcon from "../../../../public/images/confirmedicon.svg";
import CancelledIcon from "../../../../public/images/cancelledicon.svg";

const SelectFilter = () => {
  const filterOptions = [
    {
      attributes: {
        type: "filter",
        value: "all",
        label: "All",
        icon: <AllIcon className="fill-gray" />
      }
    },
    {
      attributes: {
        type: "filter",
        value: "confirmed",
        label: "Confirmed",
        icon: <ConfirmedIcon className="fill-success-green" />
      }
    },
    {
      attributes: {
        type: "filter",
        value: "pending",
        label: "Pending",
        icon: <PlaneIcon className="fill-warning-yellow" />
      }
    },
    {
      attributes: {
        type: "filter",
        value: "cancelled",
        label: "Cancelled",
        icon: <CancelledIcon className="fill-error-red" />
      }
    }
  ];

  const config = {
    imageShow: true,
    isSearchable: false,
    defaultValue: filterOptions[0],
    theme: (theme: Theme) => ({
      ...theme,
      borderRadius: 8,
      width: 400,
      colors: {
        ...theme.colors,
        primary25: "white",
        primary: "white"
      }
    })
  };
  return (
    <Select
      className="min-w-[170px] z-50"
      controlInnerClassName="flex w-full"
      singleValueClassName="flex gap-3"
      optionClassName="flex gap-3"
      instanceId="filter-select"
      components={{
        Option: Option,
        Control: Control,
        Menu: SelectMenu,
        SingleValue: SingleValue,
        MenuList: SelectMenuList,
        IndicatorSeparator: () => null,
        DropdownIndicator: (props) => (
          <DropdownIndicator props={props} showIndicator={true} />
        )
      }}
      theme={get(config, "theme")}
      options={filterOptions}
      imageShow={get(config, "imageShow")}
      defaultValue={get(config, "defaultValue")}
      isSearchable={get(config, "isSearchable")}
    />
  );
};

export default SelectFilter;
