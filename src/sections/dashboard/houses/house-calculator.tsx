import {
  TableContainer,
  Paper,
  Table,
  TextField,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import React, { FC, useState } from "react";
import { Houses } from "src/types/house";
import { calculatorValues } from "./form/calculator-values";
import { NumericFormatProps, NumericFormat } from "react-number-format";

interface IProps {
  house: Houses;
}

/**
 * @author
 * @function @HouseCalculator
 **/

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

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
        thousandSeparator
        valueIsNumericString
        decimalSeparator="."
      />
    );
  }
);

export const HouseCalculator: FC<IProps> = (props) => {
  const { house } = props;

  const [ml, setMl] = useState(0);
  const [m, setM] = useState(0);
  const [pisos, setPisos] = useState(0);

  return (
    <Box
      display="flex"
      sx={{
        flexGrow: 1,
        py: "8",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "2",
      }}
    >
      <Box>
        <Typography fontSize="24px" color="black" fontWeight={700}>
          CALCULADORA DE IMPUESTO DE INMUEBLES
        </Typography>
      </Box>
      <Grid spacing={2} container>
        <Grid xs={12} md={3} mb={1}>
          <TextField
            fullWidth
            required
            value={ml}
            onChange={(e) => setMl(parseInt(e.target.value))}
            label={"Metros Lineales"}
            InputProps={{
              inputComponent: NumberFormatCustom as any,
            }}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              bottom: "0px",
            }}
          />
        </Grid>
        <Grid xs={12} md={6} mb={1}>
          <TextField
            fullWidth
            required
            label={"Meses"}
            value={m}
            onChange={(e) => setM(parseInt(e.target.value))}
            InputProps={{
              inputComponent: NumberFormatCustom as any,
            }}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              bottom: "0px",
            }}
          />
        </Grid>
        <Grid xs={12} md={3} mb={1}>
          <TextField
            fullWidth
            required
            value={pisos}
            onChange={(e) => setPisos(parseInt(e.target.value))}
            label={"# de Pisos"}
            InputProps={{
              inputComponent: NumberFormatCustom as any,
            }}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              bottom: "0px",
            }}
          />
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow
              key={`head`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                align="center"
                sx={{ backgroundColor: "orange", borderRadius: 1 }}
              >
                <Typography color="white" fontWeight={700}>
                  ALUMBRADO PUBLICO
                </Typography>
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "orange", borderRadius: 1 }}
              >
                <Typography color="white" fontWeight={700}>
                  Metro/Mes
                </Typography>
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "orange", borderRadius: 1 }}
              >
                <Typography color="white" fontWeight={700}>
                  Monto/Uso
                </Typography>
              </TableCell>
            </TableRow>
            {Object.values(calculatorValues).map((row) =>
              row === "Inmuebles habitacionales e instituciones del estado" ||
              row === "Inmuebles sin construcción" ? (
                <TableRow
                  key={row}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ backgroundColor: "#F8F9FA", borderRadius: 1 }}
                  >
                    <Typography color="black" fontWeight={500}>
                      {row}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ backgroundColor: "#F8F9FA", borderRadius: 1 }}
                    align="right"
                  >
                    <Typography color="black" fontWeight={500}>
                      {`$${calculatorValues[row]}`}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ backgroundColor: "#F8F9FA", borderRadius: 1 }}
                    align="right"
                  >
                    <Typography color="black" fontWeight={500}>
                      {`$${calculatorValues[row] * m * ml}`}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : null
            )}
            <TableRow
              key={`head`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                align="center"
                sx={{ backgroundColor: "orange", borderRadius: 1 }}
              >
                <Typography color="white" fontWeight={700}>
                  ASEO
                </Typography>
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "orange", borderRadius: 1 }}
              >
                <Typography color="white" fontWeight={700}>
                  Metro/Mes
                </Typography>
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "orange", borderRadius: 1 }}
              >
                <Typography color="white" fontWeight={700}>
                  Monto/Uso
                </Typography>
              </TableCell>
            </TableRow>
            {Object.values(calculatorValues).map((row) =>
              row ===
                "Inmuebles destinados a Comercio e Industria, y otras actividades" ||
              row ===
                "Inmuebles destinados en parte para pequeños negocios y vivienda del propietario del inmueble" ||
              row === "Inmuebles destinados para vivienda" ||
              row ===
                "Inmuebles destinados a la prestación de servicios públicos del Estado e instituciones autónomas, religiosas y otras no especificadas" ||
              row ===
                "Inmuebles baldíos, aunque estuvieran con cercas de alambre, malla ciclón o construcción no especificada" ||
              row ===
                "Inmuebles en lotificación, parcelaciones y urbanizaciones en el área urbana" ? (
                <TableRow
                  key={row}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography color="black" fontWeight={500}>
                      {row}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="right"
                    sx={{ backgroundColor: "#F8F9FA", borderRadius: 1 }}
                  >
                    <Typography color="black" fontWeight={500}>
                      {`$${calculatorValues[row]}`}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="right"
                    sx={{ backgroundColor: "#F8F9FA", borderRadius: 1 }}
                  >
                    <Typography color="black" fontWeight={500}>
                      {`$${
                        calculatorValues[row] * m * ml +
                        calculatorValues[row] * m * ml * 0.5
                      }`}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : null
            )}
            <TableRow
              key={"head"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                align="center"
                sx={{ backgroundColor: "orange", borderRadius: 1 }}
              >
                <Typography color="white" fontWeight={700}>
                  BARRIDO DE PASAJES, CALLES PRINCIPALES Y AVENIDAS
                </Typography>
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "orange", borderRadius: 1 }}
              >
                <Typography color="white" fontWeight={700}>
                  Metro/Mes
                </Typography>
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "orange", borderRadius: 1 }}
              >
                <Typography color="white" fontWeight={700}>
                  Monto/Uso
                </Typography>
              </TableCell>
            </TableRow>
            {Object.values(calculatorValues).map((row, index) =>
              row ===
                "Inmuebles ubicados en los ejes preferenciales y calles principales o donde se brinde el servicio de barrido de calle" ||
              row ===
                "En casas de habitación, predios baldíos en proporción al metraje de la construcción" ? (
                <TableRow
                  key={row}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography color="black" fontWeight={500}>
                      {row}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="right"
                    sx={{ backgroundColor: "#F8F9FA", borderRadius: 1 }}
                  >
                    <Typography color="black" fontWeight={500}>
                      {`$${calculatorValues[row]}`}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="right"
                    sx={{ backgroundColor: "#F8F9FA", borderRadius: 1 }}
                  >
                    <Typography color="black" fontWeight={500}>
                      {`$${calculatorValues[row] * m * ml}`}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : null
            )}
            <TableRow
              key={"head"}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                align="center"
                sx={{ backgroundColor: "orange", borderRadius: 1 }}
              >
                <Typography color="white" fontWeight={700}>
                  Para construcciones y reparaciones de viviendas y anexos, se
                  aplicará la siguiente tabla:
                </Typography>
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "orange", borderRadius: 1 }}
              >
                <Typography color="white" fontWeight={700}>
                  % o Monto a cobrar
                </Typography>
              </TableCell>
              <TableCell
                align="center"
                sx={{ backgroundColor: "orange", borderRadius: 1 }}
              >
                <Typography color="white" fontWeight={700}>
                  Monto/Uso
                </Typography>
              </TableCell>
            </TableRow>
            {Object.values(calculatorValues).map((row) =>
              row ===
                "De $0.00 hasta un valor de $2,000.00 de presupuesto, se pagará el 0.5% del total" ||
              row ===
                "De $2,000.00 hasta $5,000.00, se pagará el 1% del presupuesto total" ||
              row ===
                "De $5,000.01 hasta $10,000.00, se pagará el 1.5% del presupuesto total" ||
              row ===
                "De $10,000.01 en adelante, se pagará el 2% del presupuesto total" ||
              row ===
                "Permiso para situar materiales de construcción en las vías urbanas, sin afectar el transito de vehículos y personas." ||
              row ===
                "Permiso por ampliación o conexión de redes para energía eléctrica conectadas a la red municipal, por persona naturales, ML: 1.00" ||
              row ===
                "Permiso por construcción de gasolinera, se aplicará el 5% sobre el presupuesto de construcción" ? (
                <TableRow
                  key={row}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography color="black" fontWeight={500}>
                      {row}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="right"
                    sx={{ backgroundColor: "#F8F9FA", borderRadius: 1 }}
                  >
                    <Typography color="black" fontWeight={500}>
                      {row ===
                        "Permiso para situar materiales de construcción en las vías urbanas, sin afectar el transito de vehículos y personas." ||
                      row ===
                        "Permiso por ampliación o conexión de redes para energía eléctrica conectadas a la red municipal, por persona naturales, ML: 1.00"
                        ? `$${calculatorValues[row]}`
                        : `%${calculatorValues[row]}`}
                    </Typography>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    align="right"
                    sx={{ backgroundColor: "#F8F9FA", borderRadius: 1 }}
                  >
                    <Typography color="black" fontWeight={500}>
                      {`$${calculatorValues[row] * m * ml}`}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : null
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
