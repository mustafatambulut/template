"use client";
import { get } from "lodash";

import useFetchData from "@/app/hooks/useFetchData";
import { FooterBrandProps } from "@/components/atoms/footerBrand/types";
import { FOOTER_BRAND } from "@/components/atoms/footerBrand/constants";

import Loading from "@/components/atoms/loading/Loading";
import Menu from "@/components/molecules/menu/Menu";

const FooterBrand = ({ className = "" }: FooterBrandProps) => {
  const data = useFetchData(FOOTER_BRAND);

  return (
    <Loading isLoading={!data} loader={<p>Loading feed...</p>}>
      {/*todo: skeleton eklenecek*/}
      <footer className={`footer footer-center p-4 ${className}`}>
        <div className="flex">
          {get(data, "header.title")}
          <p>{get(data, "header.description")}</p>
        </div>
        <div>
          <Menu
            isCollapsable={false}
            menuItemClass="text-15 text-gray-500 font-mi-sans-semi-bold"
            className="flex-row gap-x-7"
            links={get(data, "body.brand_links.data")}
          />
        </div>
      </footer>
    </Loading>
  );
};

export default FooterBrand;
