"use client";
import { useEffect, useState } from "react";
import classNames from "classnames";
import { useAppSelector } from "@/redux/hooks";
import { filter, get, map, size } from "lodash";

import Button from "@/components/atoms/button/Button";
import SelectFilter from "@/components/atoms/selectFilter/SelectFilter";
import ReservationItem from "@/components/molecules/reservationItem/ReservationItem";

import PlaneIcon from "../../../../public/images/plane.svg";
import AllIcon from "../../../../public/images/circles.svg";
import ConfirmedIcon from "../../../../public/images/confirmed.svg";
import CancelledIcon from "../../../../public/images/cancelled.svg";

const ReservationList = () => {
  const { reservations } = useAppSelector((state) => state.profileReducer);

  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [filteredReservations, setFilteredReservations] = useState<any[]>([]);
  const filterOptionIconClass = (type: string): string => {
    return classNames("fill-gray", {
      "fill-primary": activeFilter === type
    });
  };

  const filterOptionButtonClass = (type: string): string => {
    return classNames(
      "relative outline-none px-0 pb-2 text-xl cursor-pointer flex gap-x-3 items-center hover:text-gray text-gray transition-none",
      {
        "text-primary hover:text-primary": type === activeFilter
      }
    );
  };

  const tabMenuBorderClass = (type: string): string => {
    return classNames(
      "absolute bottom-0 left-0 w-full bg-primary rounded-xl h-1",
      {
        block: activeFilter === type,
        hidden: activeFilter !== type
      }
    );
  };

  // todo: dil seçeneği ekleyince güncellenecek
  const filterOptions = [
    {
      attributes: {
        type: "filter",
        value: "all",
        label: "All",
        icon: <AllIcon className={filterOptionIconClass("all")} />
      }
    },
    {
      attributes: {
        type: "filter",
        value: "confirmed",
        label: "Confirmed",
        icon: <ConfirmedIcon className={filterOptionIconClass("confirmed")} />
      }
    },
    {
      attributes: {
        type: "filter",
        value: "pending",
        label: "Pending",
        icon: <PlaneIcon className={filterOptionIconClass("pending")} />
      }
    },
    {
      attributes: {
        type: "filter",
        value: "cancelled",
        label: "Cancelled",
        icon: <CancelledIcon className={filterOptionIconClass("cancelled")} />
      }
    }
  ];

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredReservations(reservations);
    } else {
      setFilteredReservations(
        filter(reservations, (reservation) => {
          return reservation.status.type === activeFilter;
        })
      );
    }
  }, [activeFilter]);

  return (
    <div className="flex flex-col gap-y-3">
      <div className="hidden lg:flex justify-between items-center">
        <h1 className="text-gray-800 font-mi-sans-semi-bold text-28">
          Geçmiş Rezervasyonlar
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-y-2">
        <div>
          <div className="hidden lg:flex gap-4">
            {map(filterOptions, (filter, key) => (
              <Button
                key={key}
                className={filterOptionButtonClass(filter.attributes.value)}
                variant="btn-ghost"
                onClick={() => setActiveFilter(filter.attributes.value)}>
                {get(filter, "attributes.icon")}
                <span>{get(filter, "attributes.label")}</span>
                <div
                  className={tabMenuBorderClass(
                    get(filter, "attributes.value")
                  )}></div>
              </Button>
            ))}
          </div>
          <div className="lg:hidden flex justify-between">
            <SelectFilter onChange={setActiveFilter} />
          </div>
        </div>
        <div className="text-sm lg:text-lg text-gray-800">
          {size(reservations)} geçmiş rezervasyon
        </div>
      </div>
      <div className="relative gap-y-5 flex flex-col">
        {map(filteredReservations, (reservation, key) => (
          <ReservationItem reservation={reservation} key={key} />
        ))}
      </div>
    </div>
  );
};

export default ReservationList;