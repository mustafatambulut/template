import { get, map } from "lodash";

import { ISubMenu } from "@/components/atoms/subMenu/types";

import MenuItem from "@/components/atoms/menuItem/MenuItem";

const Submenu = ({
  name,
  items,
  isCollapsable,
  className = "",
  variant = "default"
}: ISubMenu) => {
  const CollapsableComponent = () => {
    return (
      <details className="active:bg-white active:text-black mb-3">
        <summary className="pl-0 focus:bg-white flex justify-start text-xxl mb-3">
          {name}
        </summary>
        <ul className="before:hidden ml-0 pl-0">
          {map(items, (link, key) => (
            <MenuItem
              key={key}
              variant={variant}
              item={get(link, "attributes")}
              linkClassName="hover:bg-transparent text-gray-700 font-light p-0 mb-2"
            />
          ))}
        </ul>
      </details>
    );
  };

  const NonCollapsableComponent = () => {
    return (
      <ul className="menu border-none before:hidden">
        <li className="menu-title text-gray-800 text-xs uppercase p-0 mb-4 font-bold">
          {name}
        </li>
        {map(items, (link, key) => (
          <MenuItem
            key={key}
            variant={variant}
            item={get(link, "attributes")}
            linkClassName="hover:bg-transparent text-gray-500 p-0 mb-2"
          />
        ))}
      </ul>
    );
  };

  return (
    <li className={className}>
      {isCollapsable ? CollapsableComponent() : NonCollapsableComponent()}
    </li>
  );
};

export default Submenu;
