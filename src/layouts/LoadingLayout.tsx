import { Component } from "solid-js";
import { LoaderIcon } from "../components/commons/icons/LoaderIcon";

export const LoadingLayout: Component = () => {
  return (
    <div class="h-screen w-screen flex justify-center items-center">
      <div class="flex flex-col justify-center gap-2">
        <LoaderIcon slimeState="Jumpy"></LoaderIcon>
        Loading...
      </div>
    </div>
  );
};
