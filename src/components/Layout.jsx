import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Routes, Route } from "react-router-dom";
// import { Navbar } from "./Navbar";
import Tuner from "./Tuner";

export default function Layout(props) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>{props.header}</AppShell.Header>

      <AppShell.Navbar p="md">{props.navbar}</AppShell.Navbar>

      <AppShell.Main>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/maps" element={<div>Map Page</div>} />
          <Route path="/tuner" element={<Tuner />} />
          <Route path="/simbadthesailor" element={<div>Internet</div>} />
          {/* Add more routes as needed */}
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
}
