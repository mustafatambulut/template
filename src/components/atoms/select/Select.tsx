"use client";
import { ReactNode, useState } from "react";
import get from "lodash/get";
import has from "lodash/has";
import map from "lodash/map";
import size from "lodash/size";
import filter from "lodash/filter";
import Image from "next/image";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import { isMobile } from "react-device-detect";
import { Swiper, SwiperSlide } from "swiper/react";
import ReactSelect, { components } from "react-select";

import { ISelect } from "@/components/atoms/select/types";

import ClearIcon from "../../../../public/images/clear.svg";
import SearchIcon from "../../../../public/images/search.svg";
import HistoryIcon from "../../../../public/images/history.svg";
import LocationIcon from "../../../../public/images/location.svg";

const Select = ({
  items,
  onChange,
  name = "",
  value = null,
  className = "",
  placeHolder = "",
  controlTitle = "",
  customIcon = null,
  menuIsOpen = null,
  iconOffset = false,
  isClearable = false,
  maxMenuHeight = null,
  isSearchable = false,
  noResultsMessage = "",
  searchId = "search-id",
  showOptionIcon = false,
  searchIconColor = null,
  showSearchIcon = false,
  showPlaceholder = true,
  showControlTitle = true,
  customIconPosition = "left",
  searchIconPosition = "left",
  placeholderClassName = null,
  controlTitleClassName = null,
  controlWrapperClassName = "",
  filterOption = null,
  valueContainerClassName = null,
  rotateIconOnShow = false,
  menuClassName = null,
  isDisabled = false,
  defaultValue = null,
  menuPosition = null,
  singleValueClassName = null,
  customIconClassName = null
}: ISelect) => {
  const t = useTranslations();
  //todo: düzenlenecek
  const [isOpen, setIsOpen] = useState(false);

  const searchClass = classNames(`w-full ${className}`);

  const controlWrapperClass = classNames(
    `rounded-lg border-none shadow-none text-left bg-transparent ${controlWrapperClassName}`
  );

  const controlInnerClass = classNames(`w-full ${className}`, {
    "text-gray-800 ": !isDisabled,
    "text-gray-200": isDisabled
  });

  const customIconClass = classNames(
    "absolute top-[50%] transform translate-y-[-50%] transition-all transform",
    {
      "left-0": customIconPosition === "left" && !iconOffset,
      "right-0": customIconPosition === "right" && !iconOffset,
      "left-2": customIconPosition === "left" && iconOffset,
      "right-2": customIconPosition === "right" && iconOffset,
      "rotate-180": rotateIconOnShow && isOpen,
      "invert-[.96] sepia-[.07] saturate-[.74] hue-rotate-[161deg] brightness-[.97] contrast-[.9]":
        isDisabled
    }
  );

  const searchIconClass = classNames(
    "absolute top-[50%] transform translate-y-[-50%]",
    {
      "left-0": searchIconPosition === "left" && !iconOffset,
      "right-0": searchIconPosition === "right" && !iconOffset,
      "left-2": searchIconPosition === "left" && iconOffset,
      "right-2": searchIconPosition === "right" && iconOffset,
      "fill-gray-800": !searchIconColor,
      [searchIconColor]: searchIconColor
    }
  );

  const menuClass = classNames(
    "rounded-xl mt-5 shadow-none lg:shadow-md z-50",
    {
      [menuClassName]: menuClassName
    }
  );

  const controlTitleClass = classNames("w-full", {
    "text-gray-600 text-sm": !controlTitleClassName,
    [controlTitleClassName]: controlTitleClassName,
    "text-gray-200": isDisabled,
    block: showControlTitle,
    hidden: !showControlTitle,
    "ml-8":
      (customIcon && customIconPosition === "left") ||
      (showSearchIcon && searchIconPosition === "left"),
    "mr-8":
      showSearchIcon ||
      (customIcon && customIconPosition === "right") ||
      (showSearchIcon && searchIconPosition === "right")
  });

  const placeholderClass = classNames("w-full", {
    "text-base lg:text-lg font-mi-semi-bold": !placeholderClassName,
    [placeholderClassName]: placeholderClassName,
    "text-gray-200":
      (!placeholderClassName && isDisabled) ||
      (placeholderClassName && isDisabled),
    "text-gray-600 ": !placeholderClassName && !isDisabled,
    block: showPlaceholder,
    hidden: !showPlaceholder
  });

  const valueContainerClass = classNames("px-0", {
    [valueContainerClassName]: valueContainerClassName,
    "ml-8":
      (customIcon && customIconPosition === "left") ||
      (showSearchIcon && searchIconPosition === "left"),
    "mr-8":
      showSearchIcon ||
      (customIcon && customIconPosition === "right") ||
      (showSearchIcon && searchIconPosition === "right")
  });

  return (
    <ReactSelect
      isDisabled={isDisabled}
      name={name}
      {...(filterOption && {
        filterOption: filterOption
      })}
      {...(value && {
        value: filter(items, (item) => item.value === value)
      })}
      {...(menuIsOpen && { menuIsOpen: menuIsOpen })}
      {...(menuPosition && { menuPosition: menuPosition })}
      {...(maxMenuHeight && { menuIsOpen: maxMenuHeight })}
      {...(defaultValue && { defaultValue: defaultValue })}
      onChange={onChange}
      options={items}
      id={`id-${searchId}`}
      key={`key-${searchId}`}
      className={searchClass}
      isClearable={isClearable}
      isSearchable={isSearchable}
      inputId={`input-${searchId}`}
      instanceId={`select-${searchId}`}
      backspaceRemovesValue={true}
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
        LoadingIndicator: () => null,
        SingleValue: (props) => (
          <components.SingleValue
            className={`m-0 ${
              singleValueClassName ? singleValueClassName : ""
            }`}
            {...props}>
            {get(props, "children")}
          </components.SingleValue>
        ),
        Control: (props) => {
          const selectedValue = get(props.getValue(), "0");
          return (
            <components.Control className={controlWrapperClass} {...props}>
              <div className={controlInnerClass}>
                {showSearchIcon && (
                  <div className={searchIconClass}>
                    <SearchIcon className={searchIconClass} />
                  </div>
                )}
                {customIcon && (
                  <div
                    className={`${customIconClass} ${
                      customIconClassName ? customIconClassName : ""
                    }`}>
                    {customIcon}
                  </div>
                )}
                <div className="flex-wrap flex items-center w-full h-full">
                  {has(selectedValue, "icon") && (
                    <div className="mr-2">{get(selectedValue, "icon")}</div>
                  )}
                  {controlTitle && (
                    <div className={controlTitleClass}>{controlTitle}</div>
                  )}
                  {get(props, "children")}
                </div>
              </div>
            </components.Control>
          );
        },
        Placeholder: (props) => (
          <components.Placeholder className="m-0" {...props}>
            <div className={placeholderClass}>
              {placeHolder && <> {placeHolder} </>}
            </div>
          </components.Placeholder>
        ),
        NoOptionsMessage: (props) => (
          <components.NoOptionsMessage
            className={`${get(props, "selectProps.noOptionsMessageClassName")}`}
            {...props}>
            <div
              className={`${get(
                props,
                "selectProps.noOptionsMessageInnerClassName"
              )}`}>
              {noResultsMessage ? (
                <>{noResultsMessage}</>
              ) : (
                <> {t("no_results")} </>
              )}
            </div>
          </components.NoOptionsMessage>
        ),
        Menu: (props) => (
          <components.Menu className={menuClass} {...props}>
            <div className={`${get(props, "selectProps.menuInnerClassName")}`}>
              {get(props, "children")}
            </div>
          </components.Menu>
        ),
        Group: (props) => {
          const isPopularDestinations = get(
            props,
            "data.isPopularDestinations"
          );
          if (isPopularDestinations && !isMobile) {
            return null;
          }
          return (
            <components.Group
              className={`${get(props, "selectProps.groupClassName")}`}
              {...props}>
              <div
                className={`${get(props, "selectProps.groupInnerClassName")}`}>
                {isPopularDestinations ? (
                  <Swiper spaceBetween={0} slidesPerView={3} className="pr-16">
                    {map(get(props, "children"), (child: ReactNode, key) => (
                      <SwiperSlide key={key}>{child}</SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  get(props, "children")
                )}
              </div>
            </components.Group>
          );
        },
        Input: (props) => (
          <components.Input className={`m-0 p-0 w-full`} {...props}>
            {get(props, "children")}
          </components.Input>
        ),
        ValueContainer: (props) => (
          <components.ValueContainer className={valueContainerClass} {...props}>
            {get(props, "children")}
          </components.ValueContainer>
        ),
        IndicatorsContainer: (props) => (
          <components.IndicatorsContainer
            className="absolute right-0 top-[50%] transform translate-y-[-50%]"
            {...props}>
            {get(props, "children")}
          </components.IndicatorsContainer>
        ),
        ClearIndicator:
          customIconPosition === "right"
            ? null
            : (props) => (
                <components.ClearIndicator
                  className={`${get(
                    props,
                    "selectProps.clearIndicatorClassName"
                  )}`}
                  {...props}>
                  <ClearIcon />
                </components.ClearIndicator>
              ),
        Option: (props) => {
          const image = get(props, "data.image");
          const icon = get(props, "data.icon");
          const isPopularDestinations = get(
            props,
            "data.isPopularDestinations"
          );
          return (
            <components.Option
              className="bg-transparent text-left cursor-pointer rounded-lg mx-0.5 p-2 hover:bg-gray-100"
              {...props}>
              <div
                className={`${
                  isPopularDestinations && "text-center"
                } rounded flex items-start p-1`}>
                {showOptionIcon && (
                  <>
                    {!isPopularDestinations ? (
                      get(props, "data.isHistory") ? (
                        <HistoryIcon className="mt-1" />
                      ) : (
                        <LocationIcon className="mt-1" />
                      )
                    ) : null}
                  </>
                )}
                <div
                  className={`flex ${
                    icon ? "flex-row items-center" : "flex-col"
                  } ${!isPopularDestinations && "ml-2"}`}>
                  {image && (
                    <Image
                      src={`/images/${image}`}
                      alt="destination"
                      width={93}
                      height={81}
                      className="rounded-2xl"
                    />
                  )}
                  {icon && <div className="mr-2">{icon}</div>}
                  <span className="text-gray-800 lg:text-base text-xs mt-1 font-mi-semi-bold">
                    {get(props, "data.label")}
                  </span>
                  {!isPopularDestinations && (
                    <span className="text-gray-500 text-xs">
                      {get(props, "data.desc")}
                    </span>
                  )}
                </div>
              </div>
            </components.Option>
          );
        },
        GroupHeading: (props) => (
          <components.GroupHeading className="px-4" {...props}>
            <div
              className={`${
                size(get(props, "selectProps.options")) > 1 &&
                "border-t pt-4 mt-3"
              } text-left normal-case text-gray-500 text-sm font-mi-semi-bold`}>
              {get(props, "children")}
            </div>
          </components.GroupHeading>
        )
      }}
    />
  );
};

export default Select;
