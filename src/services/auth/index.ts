import serverConfig from "../../server.config";
import * as stytch from "stytch";
import { authProjectId, authSecret } from "./credentials";

const stytchClient = new stytch.Client({
  project_id: authProjectId,
  secret: authSecret,
  env: serverConfig.env === "production" ? stytch.envs.live : stytch.envs.test,
});

const auth = {
  signOut: ({ res, token }: { res: Response; token: string }) => {
    stytchClient.sessions.revoke({ session_token: token });
    return;
  },
  signInOrCreateUserByEmailOTP: async (email: string) => {
    try {
      const r = await stytchClient.otps.email.loginOrCreate({
        email: email,
      });
      return r;
    } catch (e) {
      throw e;
    }
  },
  authenticateOTP: async ({
    res,
    methodId,
    code,
  }: {
    res: Response;
    methodId: string;
    code: string;
  }) => {
    try {
      const r = await stytchClient.otps.authenticate({
        method_id: methodId,
        code,
        session_duration_minutes: 43200,
      });
      return r;
    } catch (e: any) {
      throw e;
    }
  },
  authenticateSessionToken: async ({
    res,
    token,
  }: {
    token: string;
    res: any;
  }) => {
    try {
      // logic to determine whether the token
      // passed back is a jwt or session token
      let isJwt = false;
      try {
        Buffer.from(token.split(".")[1], "base64");
        isJwt = true;
      } catch (e) {
        throw e;
      }

      const response = await stytchClient.sessions.authenticate({
        session_jwt: isJwt ? token : undefined,
        session_token: isJwt ? undefined : token,
        session_duration_minutes: isJwt ? undefined : 43200,
      });
      return response;
    } catch (e) {
      throw e;
    }
  },
  deleteStytchUserByAuthId: async (authId: string) => {
    try {
      const user = await stytchClient.users.delete(authId);
      return user;
    } catch (e) {
      throw e;
    }
  },
};

export default auth;
