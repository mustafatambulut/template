"use client";
import { useState } from "react";
import Select from "react-select";
import { find, get } from "lodash";
import classNames from "classnames";

import { ISelectLanguage } from "@/components/atoms/selectLanguage/types";

import Option from "@/components/atoms/option/Option";
import Control from "@/components/atoms/control/Control";
import SelectMenu from "@/components/atoms/selectMenu/SelectMenu";
import SingleValue from "@/components/atoms/singleValue/SingleValue";
import SelectMenuList from "@/components/atoms/selectMenuList/SelectMenuList";
import DropdownIndicator from "@/components/atoms/dropdownIndicator/DropdownIndicator";

const SelectLanguage = ({
  variant,
  languages,
  showIndicator
}: ISelectLanguage) => {
  const [currentLocale] = useState("EN");
  const selectClass = classNames("text-sm rounded-xl", {
    "bg-gray-700": variant === "dark",
    "bg-gray-100": variant !== "dark"
  });

  const singleValueChildClass = classNames(
    "text-base uppercase ml-2 mx-4 lg:text-lg",
    {
      "text-white": variant === "dark",
      "text-black": variant !== "dark"
    }
  );

  const optionClass = classNames(
    "my-1 p-0 m-0 rounded-lg cursor-pointer focus:text-black lg:text-lg",
    {
      "text-white": variant === "dark",
      "text-black": variant !== "dark",
      "bg-gray-700": variant === "dark",
      "focus:bg-gray-hover": variant !== "dark",
      "hover:bg-gray-600": variant === "dark",
      "hover:bg-gray-100": variant !== "dark"
    }
  );

  const menuClass = classNames("rounded-lg", {
    "bg-gray-700": variant === "dark"
  });

  const config = {
    imageShow: true,
    isSearchable: false,
    defaultValue: find(get(languages, "data"), [
      "attributes.value",
      currentLocale
    ]),
    theme: (theme) => ({
      ...theme,
      borderRadius: 0,
      colors: {
        ...theme.colors,
        primary25: "white",
        primary: "white"
      }
    }),
    optionClass,
    selectClass,
    menuClass,
    singleValueChildClass
  };

  return (
    <Select
      menuClassName={get(config, "menuClass")}
      menuListClassName="m-0 p-1"
      indicatorClassName="pl-0 pr-2"
      indicatorArrowClassName="fill-owner"
      className={get(config, "selectClass")}
      imageWidthClassName="w-6 lg:w-2 lg:w-6"
      optionClassName={get(config, "optionClass")}
      singleValueClassName="flex items-center gap-x-0.5 justify-around"
      singleValueChildrenClassName={get(config, "singleValueChildClass")}
      controlClassName="cursor-pointer shadow-none bg-transparent text-xs lg:text-base lg:h-11 rounded-x border-white"
      components={{
        Option: Option,
        Control: Control,
        Menu: SelectMenu,
        SingleValue: SingleValue,
        MenuList: SelectMenuList,
        IndicatorSeparator: () => null,
        DropdownIndicator: (props) => (
          <DropdownIndicator props={props} showIndicator={showIndicator} />
        )
      }}
      theme={get(config, "theme")}
      options={get(languages, "data")}
      imageShow={get(config, "imageShow")}
      defaultValue={get(config, "defaultValue")}
      isSearchable={get(config, "isSearchable")}
    />
  );
};

export default SelectLanguage;
