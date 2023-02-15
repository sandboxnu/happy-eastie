import type { NextApiRequest, NextApiResponse } from "next";
import mongoDbInteractor from "../../../../db/mongoDbInteractor";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  const languages = await mongoDbInteractor.getDistinctValues<string>(
    "resources2",
    "availableLanguages"
  );

  return res.status(200).json(languages);
}
