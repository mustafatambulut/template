"use client";
import classNames from "classnames";
import { get, isEmpty } from "lodash";
import { components } from "react-select";

import { ISingleValue } from "@/components/atoms/singleValue/types";

import OptionImage from "@/components/atoms/optionImage/OptionImage";
import Typography from "../typography/Typography";

const SingleValue = ({ ...props }: ISingleValue) => {
  const singleValueClass = classNames(
    `${get(props, "selectProps.singleValueClassName")}`,
    {
      "text-gray":
        get(props, "data.attributes.value") === "all" &&
        get(props, "data.attributes.type") === "filter",
      "text-warning-yellow":
        get(props, "data.attributes.value") === "pending" &&
        get(props, "data.attributes.type") === "filter",
      "text-error-red":
        get(props, "data.attributes.value") === "cancelled" &&
        get(props, "data.attributes.type") === "filter",
      "text-success-green":
        get(props, "data.attributes.value") === "confirmed" &&
        get(props, "data.attributes.type") === "filter"
    }
  );

  return (
    <components.SingleValue {...props}>
      <div className={singleValueClass}>
        {get(props, "selectProps.imageShow") && (
          <>
            {!isEmpty(get(props, "data.attributes.image")) && (
              <OptionImage
                src={get(props, "data.attributes.image")}
                className={get(
                  props,
                  "selectProps.optionImageWrapperClassName"
                )}
                imageClassName={get(props, "selectProps.optionImageClassName")}
                width={get(props, "selectProps.width") || 20}
                height={get(props, "selectProps.height") || 20}
              />
            )}
            {!isEmpty(get(props, "data.attributes.icon")) &&
              get(props, "data.attributes.icon")}
          </>
        )}
        <div className="grid grid-cols-1">
          <Typography variant="p6" element="span" className="text-xs capitalize">
            {get(props, "selectProps.selectTitle")}
          </Typography>
          <Typography
            variant="p6"
            element="span"
            className={`${get(
              props,
              "selectProps.singleValueChildrenClassName"
            )}`}>
            {get(props, "data.attributes.label")}
          </Typography>
        </div>
      </div>
    </components.SingleValue>
  );
};

export default SingleValue;
