import { DialectManager, Generator } from "kysely-codegen";

import { getDB } from "../index";

const outFile = "./src/backend/db/database-schema.d.ts";

const initGenerator = async () => {
  const db = await getDB();

  try {
    const generator = new Generator();
    await generator.generate({
      db,
      dialect: new DialectManager().getDialect("postgres"),
      camelCase: true,
      outFile,
    });
    console.log(`Schema written to ${outFile}`);
    process.exit(0);
  } catch (error) {
    console.error(error);
  }
};
initGenerator();
