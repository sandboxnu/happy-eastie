import type { NextApiRequest, NextApiResponse } from "next";
import { Resource } from "../../../../models/types2";
import mongoDbInteractor from "../../../../db/mongoDbInteractor";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
    const accessibility =
    await mongoDbInteractor.getDistinctValues<Resource, string>("resources2", "accessibilityOptions");

    return res.status(200).json(accessibility);
}