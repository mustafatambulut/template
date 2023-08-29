"use client";
import React from "react";
import Image from "next/image";
import { components } from "react-select";
import AsyncSelect from "react-select/async";
import { isMobile } from "react-device-detect";
import { Swiper, SwiperSlide } from "swiper/react";
import { compact, get, has, keys, map, size } from "lodash";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateBookingDestination } from "@/redux/features/listingSlice/listingSlice";

import { BOOKING_DATE } from "@/components/molecules/searchBar/constants";
import { IDestinationSelect } from "@/components/atoms/destinationSelect/types";

import "swiper/css";
import "./DestinationSelect.css";

import ClearIcon from "../../../../public/images/clear.svg";
import SearchIcon from "../../../../public/images/search.svg";
import HistoryIcon from "../../../../public/images/history.svg";
import LocationIcon from "../../../../public/images/location.svg";

const DestinationSelect = ({
  componentId,
  setActiveSearchItem,
  isInCustomSection = false
}: IDestinationSelect) => {
  const dispatch = useAppDispatch();
  const { filterData, bookingDestination } = useAppSelector(
    (state) => state.listingReducer
  );
  const { locations } = useAppSelector((state) => state.landingReducer);
  //todo : örnek location datası. popular Destinations için kullanılacak

  // const destinationOptions = [
  //   {
  //     label: "Popular Destinations",
  //     isPopularDestinations: true,
  //     options: [
  //       {
  //         value: "london",
  //         label: "London",
  //         desc: "United Kingdom",
  //         image: "destination.jpg",
  //         isPopularDestinations: true,
  //         isHistory: false
  //       },
  //       {
  //         value: "newyork",
  //         label: "New York",
  //         desc: "United States",
  //         image: "destination.jpg",
  //         isPopularDestinations: true,
  //         isHistory: false
  //       },
  //       {
  //         value: "istanbul",
  //         label: "Istanbul",
  //         desc: "Turkey",
  //         image: "destination.jpg",
  //         isPopularDestinations: true,
  //         isHistory: false
  //       },
  //       {
  //         value: "antalya",
  //         label: "Antalya",
  //         desc: "Turkey",
  //         image: "destination.jpg",
  //         isPopularDestinations: true,
  //         isHistory: false
  //       },
  //       {
  //         value: "stockholm",
  //         label: "Stockholm",
  //         desc: "Sweden",
  //         image: "destination.jpg",
  //         isPopularDestinations: true,
  //         isHistory: false
  //       }
  //     ]
  //   },
  //   {
  //     value: "icmeler",
  //     label: "İçmeler",
  //     isPopularDestinations: false,
  //     desc: "Marmaris/Muğla, Türkiye",
  //     isHistory: false
  //   },
  //   {
  //     value: "uzungol",
  //     label: "Uzungöl",
  //     isPopularDestinations: false,
  //     desc: "Çaykara/Trabzon, Türkiye",
  //     isHistory: false
  //   },
  //   {
  //     label: "En Son Bakılanlar",
  //     isPopularDestinations: false,
  //     options: [
  //       {
  //         value: "uzungol",
  //         label: "Uzungöl",
  //         desc: "Çaykara/Trabzon, Türkiye",
  //         isPopularDestinations: false,
  //         isHistory: true
  //       }
  //     ]
  //   }
  // ];

  const filterOptions = (inputValue: string) => {
    return compact(
      map(keys(locations), (location) => {
        if (
          locations[location].city
            .toLowerCase()
            .includes(inputValue.toLowerCase()) ||
          locations[location].district
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        ) {
          return {
            value: location,
            label: locations[location].district,
            isPopularDestinations: false,
            desc: `${locations[location].city} / ${locations[location].country}`,
            isHistory: false
          };
        }
      })
    );
  };

  const loadOptions = (
    inputValue: string,
    // eslint-disable-next-line no-unused-vars
    callback: (inputValue: any) => void
  ) => {
    callback(filterOptions(inputValue));
  };

  const handleOnChange = (e: any) => {
    dispatch(updateBookingDestination(e));
    setActiveSearchItem(BOOKING_DATE);
  };
  return (
    <div className="relative">
      <AsyncSelect
        isClearable
        isSearchable
        cacheOptions
        defaultOptions
        id={`id-${componentId}`}
        loadOptions={loadOptions}
        onChange={handleOnChange}
        key={`key-${componentId}`}
        inputId={`input-${componentId}`}
        instanceId="msfr-destination-select"
        maxMenuHeight={isMobile ? 400 : 300}
        {...(isInCustomSection &&
          has(filterData, "district_id") && {
            value: bookingDestination
          })}
        className={`w-full items-center flex ${
          isMobile && "border rounded-2xl"
        }`}
        classNames={{
          control: (state) => (state.isFocused ? "lg:bg-gray-50" : "bg-white")
        }}
        {...(isMobile && !isInCustomSection && { menuIsOpen: true })}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
          LoadingIndicator: () => null,
          Control: (props) => (
            <components.Control
              className={`w-full border-none shadow-none rounded-2xl ${
                isInCustomSection ? "h-10" : "h-14"
              }`}
              {...props}>
              <div
                className={`flex w-full text-left items-center ${
                  isInCustomSection ? "px-2" : "px-4"
                } py-0.5 h-full`}>
                <div
                  className={`${
                    !isInCustomSection ? "lg:mr-3" : "lg-mr-1"
                  } hidden lg:block`}>
                  <SearchIcon className="fill-gray-800" />
                </div>
                <div className="flex-wrap flex w-full h-full">
                  {!isInCustomSection && (
                    <div className="text-gray-600 w-full text-sm hidden lg:block">
                      Where
                    </div>
                  )}
                  {get(props, "children")}
                </div>
              </div>
            </components.Control>
          ),
          Placeholder: (props) => (
            <components.Placeholder className="ml-3" {...props}>
              <div
                className={`text-gray-600 text-base ${
                  isInCustomSection ? "lg:text-base" : "lg:text-lg"
                } font-mi-semi-bold`}>
                {isInCustomSection
                  ? "Destination"
                  : isMobile
                  ? "Where do you want to go?"
                  : "Search destinations"}
              </div>
            </components.Placeholder>
          ),
          NoOptionsMessage: (props) => (
            <components.NoOptionsMessage
              className={`${get(
                props,
                "selectProps.noOptionsMessageClassName"
              )}`}
              {...props}>
              <div
                className={`${get(
                  props,
                  "selectProps.noOptionsMessageInnerClassName"
                )}`}>
                No destinations
              </div>
            </components.NoOptionsMessage>
          ),
          Menu: (props) => (
            <components.Menu
              className={`rounded-xl mt-5 z-20 shadow-none lg:shadow-md ${
                isInCustomSection && "w-auto"
              }`}
              {...props}>
              <div
                className={`${get(props, "selectProps.menuInnerClassName")}`}>
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
                  className={`${get(
                    props,
                    "selectProps.groupInnerClassName"
                  )}`}>
                  {isPopularDestinations ? (
                    <Swiper
                      spaceBetween={0}
                      slidesPerView={3}
                      className="pr-16">
                      {map(
                        get(props, "children"),
                        (child: React.ReactNode, key) => (
                          <SwiperSlide key={key}>{child}</SwiperSlide>
                        )
                      )}
                    </Swiper>
                  ) : (
                    get(props, "children")
                  )}
                </div>
              </components.Group>
            );
          },
          Input: (props) => (
            <components.Input
              className={`m-0 p-0 ${
                isMobile ? "rsi-container absolute w-full" : null
              }`}
              {...props}>
              {get(props, "children")}
            </components.Input>
          ),
          ValueContainer: (props) => (
            <components.ValueContainer className="pl-0" {...props}>
              {get(props, "children")}
            </components.ValueContainer>
          ),
          IndicatorsContainer: (props) => (
            <components.IndicatorsContainer
              className="absolute right-2 top-[50%] transform translate-y-[-50%]"
              {...props}>
              {get(props, "children")}
            </components.IndicatorsContainer>
          ),
          ClearIndicator: (props) => (
            <components.ClearIndicator
              className={`${get(props, "selectProps.clearIndicatorClassName")}`}
              {...props}>
              <ClearIcon />
            </components.ClearIndicator>
          ),
          Option: (props) => {
            const image = get(props, "data.image");
            const isPopularDestinations = get(
              props,
              "data.isPopularDestinations"
            );
            return (
              <components.Option
                className="bg-transparent text-left cursor-pointer m-0 pt-2 pb-0 px-0 lg:px-3"
                {...props}>
                <div
                  className={`${
                    isPopularDestinations && "text-center"
                  } rounded flex items-start p-1`}>
                  {!isPopularDestinations ? (
                    get(props, "data.isHistory") ? (
                      <HistoryIcon className="mt-1" />
                    ) : (
                      <LocationIcon className="mt-1" />
                    )
                  ) : null}
                  <div
                    className={`flex flex-col ${
                      !isPopularDestinations && "ml-2"
                    }`}>
                    {image && (
                      <Image
                        src={`/images/${image}`}
                        alt="destination"
                        width={93}
                        height={81}
                        className="rounded-2xl"
                      />
                    )}
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
    </div>
  );
};

export default DestinationSelect;
