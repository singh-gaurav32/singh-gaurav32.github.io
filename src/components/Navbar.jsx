import { NavLink } from "@mantine/core";
import { IconGauge, IconFingerprint } from "@tabler/icons-react";

export function Navbar() {
  return (
    <>
      <NavLink label="Home" href="/#" />
      <NavLink label="Maps" href="/#/maps" />
      <NavLink label="Tuner" href="/#/tuner" />
      <NavLink label="SimbadTheSailor" href="/#/simbadthesailor" />
    </>
  );
}
