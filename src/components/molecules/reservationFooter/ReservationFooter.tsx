"use client";
import { capitalize } from "lodash";
import { useTranslations } from "next-intl";

import {
  STEP_1,
  STEP_2,
  STEP_3,
  SUCCESS
} from "@/redux/features/reservationSlice/enum";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { changeCurrentStep } from "@/redux/features/reservationSlice/reservationSlice";

import Button from "@/components/atoms/button/Button";

const ReservationFooter = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { currentStep } = useAppSelector((state) => state.reservationReducer);

  const handleSubmitBtn = () => dispatch(changeCurrentStep(SUCCESS));

  switch (currentStep) {
    case STEP_1:
      return (
        <Button
          className="text-xl font-mi-sans border-0 bg-gradient-to-tr from-[#E1004C] to-[#F8479E]"
          onClick={() => alert("reserve")}>
          {capitalize(t("reserve"))}
        </Button>
      );
    case STEP_2:
      return (
        <>
          <Button
            disabled={true}
            className="hidden lg:block text-xl font-mi-sans border-0 enabled:bg-gradient-to-tr enabled:from-[#E1004C] to-[#F8479E]">
            {capitalize(t("reserve"))}
          </Button>
          <Button
            outline={true}
            variant="btn-ghost"
            className="text-primary text-xl font-mi-sans"
            onClick={() => dispatch(changeCurrentStep(STEP_3))}>
            Skip Extra Services
          </Button>
        </>
      );
    case STEP_3:
      return (
        <Button
          className="text-xl font-mi-sans border-0 bg-gradient-to-tr from-[#E1004C] to-[#F8479E]"
          onClick={handleSubmitBtn}>
          {capitalize("submit")}
        </Button>
      );
  }
};

export default ReservationFooter;
