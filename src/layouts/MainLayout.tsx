import { ParentComponent } from "solid-js";
import { Navbar } from "../components/Navbar";

export const MainLayout: ParentComponent = (props) => {
  return (
    <div class="flex flex-col w-full items-center pattern relative overflow-y-clip py-4">
      <img
        class="absolute w-full top-0"
        src="/images/Webpage_Design_Parts_header_block.webp"
      ></img>
      <div class="max-w-6xl w-full top-5 z-20 px-4">
        <Navbar></Navbar>
      </div>
      {props.children}
    </div>
  );
};
