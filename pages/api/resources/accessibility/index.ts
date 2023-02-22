import type { NextApiRequest, NextApiResponse } from "next";
import mongoDbInteractor from "../../../../db/mongoDbInteractor";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  const accessibility = await mongoDbInteractor.getDistinctValues<string>(
    "resources2",
    "accessibilityOptions"
  );

  return res.status(200).json(accessibility);
}
