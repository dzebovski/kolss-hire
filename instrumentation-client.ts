import { initBotId } from "botid/client/core";
initBotId({ protect: [{ path: "/api/apply", method: "POST" }] });
