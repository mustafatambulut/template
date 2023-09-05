"use client";
import { useAppSelector } from "@/redux/hooks";

import {
  STEP_1,
  STEP_3,
  SUCCESS
} from "@/redux/features/reservationSlice/enum";

import PaymentSection from "@/components/organisms/paymentSection/PaymentSection";
import SuccessSection from "@/components/organisms/successSection/SuccessSection";
import ConfirmationSection from "@/components/organisms/confirmationSection/ConfirmationSection";

const Reservation = () => {
  const { currentStep } = useAppSelector((step) => step.reservationReducer);

  switch (currentStep) {
    case STEP_1:
      return <ConfirmationSection />;
    case STEP_3:
      return <PaymentSection />;
    case SUCCESS:
      return <SuccessSection />;
  }
};

export default Reservation;
