import { Navbar } from "./components/Navbar";
import MyHeader from "./components/Header";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Layout
      navbar={<Navbar />}
      header={<MyHeader />}
      pages={{ path: "hi" }}
    ></Layout>
  );
}
