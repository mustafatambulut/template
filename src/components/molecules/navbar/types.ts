import { Dispatch, SetStateAction } from "react";

import { IHeader } from "@/components/molecules/header/types";
import { IUserMenuData } from "@/components/atoms/userMenu/types";

export interface INavbar {
  data: Data;
  isScrolledHeaderActive: boolean;
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

export interface Data {
  header: IHeader;
  userMenuData: IUserMenuData;
}
