import type { NextApiRequest, NextApiResponse } from "next";
import mongoDbInteractor from "../../../../db/mongoDbInteractor";
import { RESOURCE_COLLECTION } from "../../../../models/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  const languages = await mongoDbInteractor.getDistinctValues<string>(
    RESOURCE_COLLECTION,
    "category"
  );

  return res.status(200).json(languages);
}
