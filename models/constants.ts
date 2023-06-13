import { NextApiRequest, NextApiResponse } from "next"

// TODO: replace all instances of the collection name (and other constants) with the constants defined here
export const ADMIN_COLLECTION = "admins"
export const RESOURCE_COLLECTION = "resources3"
export const QUIZ_RESPONSE_ENCRYPTION_PASSPHRASE = "Secret Passphrase"
export const RESOURCE_SEARCH_PLACEHOLDER_TEXT = "Search Resources"
export const INVITE_COLLECTION = "invites"

export const LOGIN_IRON_OPTION = function(req : NextApiRequest, res: NextApiResponse) {
  let ttl =  60*60*24
  if (req.body["keepSignedIn"]) {
    ttl *= 30
  }
  return {
    cookieName: "MY_APP_COOKIE",
    password: process.env.COOKIES_PASSWORD!,
    ttl,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
  },
  }
}

export const NORMAL_IRON_OPTION = {
    cookieName: "MY_APP_COOKIE",
    password: process.env.COOKIES_PASSWORD!,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
  }
}
