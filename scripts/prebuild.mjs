if (process.env.VERCEL_ENV === "production")
  await import("./check-content.mjs");
