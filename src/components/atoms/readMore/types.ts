import { ReactNode } from "react";

export interface IReadMore {
  type: "text" | "element";
  className?: string;
  bodyClass?: string;
  labelClass?: string;
  showLabel?: string;
  lessLabel?: string;
  children: ReactNode | string;
  showAsHtml?: boolean;
}
