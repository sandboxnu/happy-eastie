import { IronSessionOptions } from "iron-session"
import { NextApiRequest, NextApiResponse } from "next"

// TODO: replace all instances of the collection name (and other constants) with the constants defined here
export const ADMIN_COLLECTION = "admins"
export const RESOURCE_COLLECTION = "resources3"
export const QUIZ_RESPONSE_ENCRYPTION_PASSPHRASE = "Secret Passphrase"
export const RESOURCE_SEARCH_PLACEHOLDER_TEXT = "Search Resources"

export const IRON_OPTION_ : IronSessionOptions = {
    cookieName: "MY_APP_COOKIE",
    password: "yPo4T7apfbdvctV1Bso1oAndQH9qwC94",
    ttl: 80, // default to be a day 
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        // maxAge: function(req, res) {
        //   return req.body.keepMeSignedIn ? 60*60*24*365 : 60*60*24;
        // }
  },
}

export const IRON_OPTION = function(req? : NextApiRequest, res?: NextApiResponse) {
  if (req) {
    console.log("requesttttt ", req)
  }
  let ttl =  60*60*24
  if (req && req.body["keepMeSignedIn"]) {
    ttl *= 365
  }
  return {
    cookieName: "MY_APP_COOKIE",
    password: "yPo4T7apfbdvctV1Bso1oAndQH9qwC94",
    ttl,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
  },
  }
}
