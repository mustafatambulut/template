import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IModal {
  onClose?: void;
  isDisableClose?: boolean;
  isOpen: boolean;
  bodyClass?: string;
  className?: string;
  label?: string | ReactNode;
  children: ReactNode | string;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}
