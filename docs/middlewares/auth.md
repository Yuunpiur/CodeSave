## Auth Overview

CodeSave uses a two-token JWT authentication scheme: a short-lived **access token** and a longer-lived **refresh token**. This pattern avoids two bad extremes — making users log in constantly (if tokens are too short-lived with no renewal) or leaving a single long-lived token exposed to theft for too long.

The access token is what proves identity on each API call, and the refresh token exists purely to reissue access tokens without forcing a full re-login.

## Access Token vs Refresh Token

|                    | Access Token                                | Refresh Token                       |
| ------------------ | ------------------------------------------- | ----------------------------------- |
| Lifespan           | 15 minutes                                  | 7 days                              |
| Secret             | `JWT_ACCESS_SECRET`                         | `JWT_REFRESH_SECRET`                |
| Sent via           | `Authorization: Bearer <token>` header      | httpOnly cookie                     |
| Stored client-side | In memory (Zustand store, `useAccessToken`) | Not accessible to JS at all         |
| Purpose            | Authorizes each request                     | Used only to mint new access tokens |

Both tokens carry the same payload: `{ username, role: "user" }`.

Storing the access token in memory (not localStorage) means it's wiped on page refresh — this is a deliberate tradeoff for security over convenience. The refresh token, by contrast, persists via the cookie so the user doesn't have to log in again within the 7-day window.

## Where Tokens Are Created

Token generation happens in two places that mirror each other: `signUp` and `login`, both in `service-authenticate.js`. After a successful account creation or password check, both call the shared helper:

```
generateJWT(username, expiry, secret)
```

The corresponding controllers (`controller-authenticate.js`) then:

- Attach the refresh token as a cookie via `res.cookie(...)`
- Return the access token in the JSON response body

## Verifying Requests — `verifyJWT` Middleware

Located in `middlewares/verifiy-jwt.js` (note: filename has a typo — `verifiy`, not `verify`). Applied to protected routes (currently only `/api/library`).

Flow, step by step:

1. Read the refresh token cookie and verify it. If missing or invalid, respond `401` immediately — this effectively logs the user out.
2. Read the access token from the `Authorization` header and verify it.
3. If the access token is invalid (most commonly: expired), a new one is silently generated using the username from the already-verified refresh token, and stored in `res.locals.newAccessToken`.
4. Either way, `next()` is called — an expired access token doesn't block the request outright, as long as the refresh token is still valid.

## Delivering the Renewed Token — `attachNewAccessToken` Middleware

Chained immediately after `verifyJWT` (see `server.js`). It works by overwriting `res.json` for the duration of the request: if `res.locals.newAccessToken` was set upstream, it gets merged into the outgoing JSON body under a `newAccessToken` key.

This is the mechanism that lets renewal happen silently — there's no separate `/refresh` endpoint. Any authenticated request can double as a renewal opportunity.

## Client-Side Handling

`RegisteredUserAPIRequest`, in `frontend/src/utils/client-utils.js`, is the fetch wrapper used for all authenticated calls. Responsibilities:

- Attaches the current access token (read from the Zustand store) as the `Authorization` header
- After the response returns, checks for a renewed token and updates the store
