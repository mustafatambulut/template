import Link from "next/link";
import { get, map } from "lodash";

import { IDropDownLinkMenu } from "@/components/atoms/dropDownLinkMenu/types";
import Typography from "../typography/Typography";

const DropDownLinkMenu = ({
  items,
  className = "",
  handleDrawerClose = null
}: IDropDownLinkMenu) => {
  return (
    <ul
      className={`menu lg:flex-1 lg:flex lg:justify-between text-gray-800 p-0 ${className}`}>
      <li className="mb-6">
        <details className="active:bg-white active:text-gray-600">
          <summary className="pl-0 focus:bg-white flex justify-start text-22 line-clamp-1">
            <Typography
              variant="h5"
              element="h5"
              className="line-clamp-1 max-w-[90%]">
              {get(items, "title")}
            </Typography>
          </summary>
          <ul className="before:hidden ml-0 pl-0">
            {map(get(items, "menu_links.data"), (link, key) => (
              <li
                key={key}
                className=""
                onClick={handleDrawerClose ? handleDrawerClose : null}>
                <Link
                  href={get(link, "attributes.link")}
                  className="p-0 active:bg-white capitalize text-lg text-gray-700 mt-3">
                  {get(link, "attributes.label")}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </li>
    </ul>
  );
};

export default DropDownLinkMenu;
