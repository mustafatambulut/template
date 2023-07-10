import { get, map } from "lodash";
import Image from "next/image";
import moment from "moment/moment";

import { IDrawer } from "@/components/molecules/drawer/types";

import UserMenu from "@/components/atoms/userMenu/UserMenu";
import SelectLanguage from "@/components/atoms/selectLanguage/SelectLanguage";
import Menu from "@/components/molecules/menu/Menu";
import DropDownLinkMenu from "@/components/atoms/dropDownLinkMenu/DropDownLinkMenu";

const Drawer = ({ drawerCloseRef, data }: IDrawer) => {
  const handleDrawerClose = () => drawerCloseRef.current?.click();
  return (
    <div className="drawer-side">
      <label htmlFor="missafir-drawer" className="drawer-overlay"></label>
      <div className="p-8 w-full h-full bg-white relative flex flex-col overflow-y-auto">
        <div className="border-b border-gray-100 pb-5 mb-5 flex items-start justify-between">
          <UserMenu variant="light" data={get(data, "userMenuData")} />
          <Image
            onClick={handleDrawerClose}
            src="/images/close.svg"
            alt="close"
            width={20}
            height={20}
          />
        </div>
        <div className="border-b border-gray-100 pb-5 mb-5 flex items-start justify-between">
          {/*{map(get(data, "userMenuData.footerMenu.body"), (item, key) => (*/}
          {/*  <DropDownLinkMenu items={items} key={key} />*/}
          {/*))}*/}
        </div>
        <div className="w-28 mb-5">
          <SelectLanguage
            variant={"gray"}
            showIndicator={true}
            languages={get(data, "languages")}
          />
        </div>
        <div className="mt-auto flex flex-col text-gray-500">
          <Menu
            isCollapsable={false}
            className="gap-y-2"
            menuItemClass="text-xs"
            links={get(data, "links")}
          />
          <span className="mt-5 text-xxs">
            {`© ${moment().year()} MSFR All rights reserved.`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
