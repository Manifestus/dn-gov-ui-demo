import { Unstable_Grid2 as Grid, TextField } from "@mui/material";
import React, { FC } from "react";
import { UseFormRegister, useFormContext } from "react-hook-form";
import {
  NumericFormat,
  NumericFormatProps,
  PatternFormat,
} from "react-number-format";

interface IProps {
  value: string;
  type: string;
  token: string;
  numericFormat?: boolean;
  patternFormat?: boolean;
  optional?: boolean;
  houseData: string | number | undefined;
}

/**
 * @author
 * @function @FormGenerator
 **/

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        valueIsNumericString
        prefix="$"
      />
    );
  }
);

const NumberFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        valueIsNumericString
      />
    );
  }
);

const PatternFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <PatternFormat
        format={"(+503) ####-####"}
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        valueIsNumericString
      />
    );
  }
);

export const FormGenerator: FC<IProps> = (props) => {
  const { token, houseData, value, numericFormat, patternFormat, optional } =
    props;
  const { register } = useFormContext();
  let patternFormatData: string | number | undefined = 0;
  patternFormat
    ? houseData
      ? (patternFormatData = houseData
          ?.toString()
          .split("(+503) ")[1]
          .split("-")
          .join(""))
      : (patternFormatData = houseData)
    : (patternFormatData = houseData);
  return (
    <Grid xs={12} md={6} spacing={1}>
      {numericFormat ? (
        <TextField
          fullWidth
          required
          label={token}
          InputProps={{
            inputComponent: NumericFormatCustom as any,
          }}
          {...register(value, { required: `${token} es un requisito!` })}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            bottom: "0px",
          }}
          defaultValue={houseData}
        />
      ) : patternFormat ? (
        <TextField
          fullWidth
          required
          label={token}
          InputProps={{
            inputComponent: PatternFormatCustom as any,
          }}
          {...register(value, { required: `${token} es un requisito!` })}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            bottom: "0px",
          }}
          defaultValue={patternFormatData}
        />
      ) : value === "id_number_municipal_record" ||
        value === "total_area_deeds" ||
        value === "construction_area_owner" ||
        value === "number_floors_property" ||
        value === "lineal_meters_property_facing_paved_street_north" ||
        value === "lineal_meters_property_facing_paved_street_south" ||
        value === "lineal_meters_property_facing_paved_street_east" ||
        value === "lineal_meters_property_facing_paved_street_west" ||
        value === "lineal_meters_property_facing_dirt_street_north" ||
        value === "lineal_meters_property_facing_dirt_street_south" ||
        value === "lineal_meters_property_facing_dirt_street_east" ||
        value === "lineal_meters_property_facing_dirt_street_west" ||
        value === "width_street_property_sits_north" ||
        value === "width_street_property_sits_south" ||
        value === "width_street_property_sits_east" ||
        value === "width_street_property_sits_west" ||
        value === "lineal_meters_property_facing_dirt_street_east" ||
        value === "municipal_taxes" ||
        value === "total_area_property_according_national_registry" ||
        value === "parcel_number_national_registry" ||
        value === "map_number_national_registry" ? (
        <TextField
          fullWidth
          required
          label={token}
          {...register(value, { required: `${token} es un requisito!` })}
          InputProps={{
            inputComponent: NumberFormatCustom as any,
          }}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            bottom: "0px",
          }}
          defaultValue={houseData}
        />
      ) : (
        <TextField
          fullWidth
          required={!optional}
          label={token}
          {...register(value, { required: `${token} es un requisito!` })}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            bottom: "0px",
          }}
          defaultValue={houseData}
        />
      )}
    </Grid>
  );
};
