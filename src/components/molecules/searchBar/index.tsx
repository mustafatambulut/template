"use client";
import React, { useRef, useState } from "react";
import { get } from "lodash";

import { isMobileView } from "@/utils/helper";

import Guests from "@/components/atoms/guests";
import Button from "@/components/atoms/button";
import DatePicker from "@/components/atoms/datePicker";
import DestinationSelect from "@/components/atoms/destinationSelect";

import SearchIcon from "../../../../public/images/search-icon.svg";
import SearchIconWhite from "../../../../public/images/search-white.svg";
import CalendarIcon from "../../../../public/images/calendar.svg";
import GuestsIcon from "../../../../public/images/guests.svg";
import ArrowLeftIcon from "../../../../public/images/arrow-left.svg";
import { IBookingDate } from "@/components/atoms/datePicker/types";

const SearchBar = () => {
  const drawerCloseRef = useRef<HTMLInputElement>(null);
  const [activeSearchItem, setActiveSearchItem] = useState("");
  const [bookingDestination, setBookingDestination] = useState("");
  const [skipButtonVisibility, setSkipButtonVisibility] = useState(true);
  const [bookingDate, setBookingDate] = useState<IBookingDate>({
    startDate: null,
    endDate: null
  });
  const [bookingGuests, setBookingGuests] = useState({
    adults: 0,
    kids: 0,
    pets: false
  });

  const handleDrawerClose = () => {
    drawerCloseRef.current?.click();
  };
  const handleClickBackButton = () => {
    switch (activeSearchItem) {
      case "bookingDestination":
        handleDrawerClose();
        break;
      case "bookingDate":
        setActiveSearchItem("bookingDestination");
        break;
      case "bookingGuests":
        setActiveSearchItem("bookingDate");
        break;
      default:
        break;
    }
  };

  const handleClickSkipButton = () => {
    switch (activeSearchItem) {
      case "bookingDestination":
        setActiveSearchItem("bookingDate");
        break;
      case "bookingDate":
        setActiveSearchItem("bookingGuests");
        break;
      case "bookingGuests":
        handleDrawerClose();
        break;
      default:
        break;
    }
  };

  const handleClearClick = () => {
    switch (activeSearchItem) {
      case "bookingDate":
        setBookingDate({
          startDate: null,
          endDate: null
        });
        break;
      case "bookingGuests":
        setBookingGuests({
          adults: 0,
          kids: 0,
          pets: false
        });
        break;
      default:
        break;
    }
  };

  const applyButtonDisabledStatus = () => {
    switch (activeSearchItem) {
      case "bookingDate":
        return (
          get(bookingDate, "startDate") == null ||
          get(bookingDate, "endDate") == null
        );
      case "bookingGuests":
        return get(bookingGuests, "adults") === 0;
      default:
        return false;
    }
  };

  const clearButtonVisibilityStatus = () => {
    switch (activeSearchItem) {
      case "bookingDate":
        return (
          get(bookingDate, "startDate") !== null &&
          get(bookingDate, "endDate") !== null
        );
      case "bookingGuests":
        return (
          get(bookingGuests, "adults") > 0 ||
          get(bookingGuests, "kids") > 0 ||
          get(bookingGuests, "pets")
        );
      default:
        return false;
    }
  };

  const handleApplyClick = () => {
    switch (activeSearchItem) {
      case "bookingDate":
        setActiveSearchItem("bookingGuests");
        break;
      case "bookingGuests":
        handleDrawerClose();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row rounded-2xl lg:bg-white w-full items-center lg:p-2 lg:h-[72px]">
        <div className="flex-1 mb-3 lg:mb-0 w-full">
          {isMobileView() ? (
            <label
              htmlFor="my-drawer"
              onClick={() => setActiveSearchItem("bookingDestination")}
              className="drawer-button py-1 px-4 !h-[56px] bg-white cursor-pointer w-full rounded-2xl flex items-center text-grey-600">
              {bookingDestination ? (
                <div className="ml-3">{get(bookingDestination, "label")}</div>
              ) : (
                <div className="ml-1 flex">
                  <SearchIcon className="mr-3" /> <span>Where?</span>
                </div>
              )}
            </label>
          ) : (
            <DestinationSelect
              setActiveSearchItem={setActiveSearchItem}
              componentId="desktop-destination"
              setSkipButtonVisibility={setSkipButtonVisibility}
              setBookingDestination={setBookingDestination}
            />
          )}
        </div>
        <div className="flex-1 mb-3 lg:mb-0 w-full">
          {isMobileView() ? (
            <label
              htmlFor="my-drawer"
              onClick={() => setActiveSearchItem("bookingDate")}
              className="drawer-button py-1 px-4 !h-[56px] bg-white cursor-pointer w-full rounded-2xl flex items-center text-grey-600">
              {get(bookingDate, "startDate") || get(bookingDate, "endDate") ? (
                <div className="ml-3">
                  <div className="flex text-grey-800">
                    <span>
                      {get(bookingDate, "startDate")?.format("DD MMM")}
                    </span>
                    <span className="mx-1">-</span>
                    <span>{get(bookingDate, "endDate")?.format("DD MMM")}</span>
                  </div>
                </div>
              ) : (
                <div className="ml-1 flex items-center">
                  <CalendarIcon className="mr-3" />
                  <span>Dates</span>
                </div>
              )}
            </label>
          ) : (
            <DatePicker
              bookingDate={bookingDate}
              setBookingDate={setBookingDate}
              setSkipButtonVisibility={setSkipButtonVisibility}
            />
          )}
        </div>
        <div className="flex-1 mb-3 lg:mb-0 w-full">
          {isMobileView() ? (
            <div className="flex">
              <label
                htmlFor="my-drawer"
                onClick={() => setActiveSearchItem("bookingGuests")}
                className="drawer-button py-1 px-4 !h-[56px] bg-white cursor-pointer w-full rounded-2xl flex items-center text-grey-600">
                {get(bookingGuests, "adults") > 0 ||
                get(bookingGuests, "kids") > 0 ||
                get(bookingGuests, "pets") ? (
                  <div className="flex ml-3">
                    {get(bookingGuests, "adults") > 0 && (
                      <span className="mr-2">
                        {get(bookingGuests, "adults")} Adults
                      </span>
                    )}
                    {get(bookingGuests, "kids") > 0 && (
                      <span className="mr-2">
                        {get(bookingGuests, "kids")} Kids
                      </span>
                    )}
                    {get(bookingGuests, "pets") && (
                      <span className="mr-2">Pets</span>
                    )}
                  </div>
                ) : (
                  <div className="flex">
                    <div className="ml-1 flex items-center">
                      <GuestsIcon className="mr-3" />
                      <span>Guests</span>
                    </div>
                  </div>
                )}
              </label>
              <Button
                variant="primary"
                className="rounded-2xl !h-[56px] ml-3 w-[72px] lg:w-auto">
                <SearchIconWhite />
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-start">
              <Guests
                data={bookingGuests}
                setBookingGuests={setBookingGuests}
              />
              <Button
                variant="primary"
                className="rounded-2xl !h-[56px] ml-3 w-[72px] lg:w-auto">
                {isMobileView() ? <SearchIcon /> : <span>Search</span>}
              </Button>
            </div>
          )}
        </div>
      </div>
      {isMobileView() && (
        <div className="drawer">
          <input
            ref={drawerCloseRef}
            id="my-drawer"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content"></div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <div className="p-3 w-full h-full bg-white flex flex-col overflow-y-auto">
              <div className="flex justify-between items-center p-2 mb-3">
                <div onClick={handleClickBackButton}>
                  <ArrowLeftIcon />
                </div>
                {skipButtonVisibility && (
                  <div
                    className="text-primary mr-2"
                    onClick={handleClickSkipButton}>
                    Skip
                  </div>
                )}
              </div>
              <div
                className={
                  activeSearchItem === "bookingDestination"
                    ? "block h-full"
                    : "hidden"
                }>
                <DestinationSelect
                  setActiveSearchItem={setActiveSearchItem}
                  componentId="mobile-destination"
                  setSkipButtonVisibility={setSkipButtonVisibility}
                  setBookingDestination={setBookingDestination}
                />
              </div>
              <div
                className={
                  activeSearchItem === "bookingDate" ? "block h-full" : "hidden"
                }>
                <DatePicker
                  bookingDate={bookingDate}
                  setBookingDate={setBookingDate}
                  setSkipButtonVisibility={setSkipButtonVisibility}
                />
              </div>
              <div
                className={
                  activeSearchItem === "bookingGuests"
                    ? "block h-full"
                    : "hidden"
                }>
                <Guests
                  data={bookingGuests}
                  setBookingGuests={setBookingGuests}
                />
              </div>
              {(activeSearchItem === "bookingGuests" ||
                activeSearchItem === "bookingDate") && (
                <section className="w-full flex justify-end p-2 bg-white">
                  {clearButtonVisibilityStatus() && (
                    <Button
                      onClick={handleClearClick}
                      variant="link"
                      className="text-primary bg-transparent shadow-none border-none">
                      Clear
                    </Button>
                  )}
                  <Button
                    onClick={handleApplyClick}
                    disabled={applyButtonDisabledStatus()}
                    className="ml-2"
                    variant="primary">
                    Apply
                  </Button>
                </section>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
