import { action } from "@solidjs/router";

export const testAction = action(async (test: string) => {
  "use server";

  console.log("meowing from the server " + test);

  return { success: true, message: `Hello ${test} back to the client` };
});
