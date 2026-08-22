Got it — here's the content for `docs/middlewares/auth.md`, written for future-you, in digestible sections. Since I can't write directly to your filesystem, copy this in yourself.

---

## Auth Overview

CodeSave uses a two-token JWT scheme: a short-lived **access token** and a longer-lived **refresh token**. The access token proves who you are on each request; the refresh token is what lets you get a new access token without logging in again once the old one expires.

## Access Token vs Refresh Token

- **Access Token** — lives 15 minutes, signed with `JWT_ACCESS_SECRET`. Sent by the client on every protected request as an `Authorization: Bearer <token>` header. Stored client-side in memory (Zustand store `useAccessToken`), not persisted — this is intentional, it disappears on page refresh.
- **Refresh Token** — lives 7 days, signed with `JWT_REFRESH_SECRET`. Stored server-side as an httpOnly cookie, so JS on the client can't read it. Its only job is to prove "this browser session is still valid" and mint new access tokens.

Both tokens carry the same payload shape: `{ username, role: "user" }`.

## Where Tokens Get Created

Both `signUp` and `login` (in `service-authenticate.js`) generate the pair right after a successful account creation or password check, using the shared `generateJWT(username, expiry, secret)` helper. The controller (`controller-authenticate.js`) then:

- Sets the refresh token as a cookie via `res.cookie(...)`
- Returns the access token in the JSON body

One thing worth noting for future-you: `signUpController` sets the refresh cookie with `httpOnly: false`, while `loginController` sets it with `httpOnly: true`. That's inconsistent — worth deciding which one is actually correct and fixing the other, since `httpOnly: false` on signup defeats the purpose of keeping the refresh token out of reach of JS.

## Verifying Requests (`verifyJWT` middleware)

This runs on protected routes (currently just `/api/library`). The flow:

1. Read the refresh token from the cookie, verify it. If invalid/missing → 401, user is effectively logged out.
2. Read the access token from the `Authorization` header, verify it.
3. If the access token fails verification (i.e., it's expired), a **new** access token is silently generated from the refresh token's payload and stashed in `res.locals.newAccessToken`. The request is still allowed to continue (`next()`).

So expired access tokens don't reject the request — they just trigger a quiet renewal alongside it, as long as the refresh token is still good.

## Getting the New Token Back to the Client (`attachNewAccessToken`)

This is the second piece of middleware, chained after `verifyJWT`. It overrides `res.json` for the rest of the request so that if `res.locals.newAccessToken` was set, it gets merged into whatever JSON payload the route handler sends back — under a `newAccessToken` key.

This is how the client silently gets refreshed without a dedicated "/refresh" endpoint: any authenticated API call doubles as a chance to renew.

## Client-Side Handling

`RegisteredUserAPIRequest` (in `client-utils.js`) is the fetch wrapper for authenticated calls. It attaches the access token from the Zustand store as the Authorization header, and after the response comes back, checks `fetchData.newAccessToken` to update the store.

Worth flagging for future-you: that check is reading `fetchData.newAccessToken` off the raw `Response` object, before `.json()` has been awaited — so as written it's checking a field that doesn't exist there. This likely needs to check the _parsed_ body instead, which would explain why silent renewal probably isn't actually working yet.

## Known Gaps / TODOs

- `httpOnly` inconsistency between signup and login cookie settings (see above)
- `newAccessToken` check in `client-utils.js` looks like it's checking the wrong object (raw response vs. parsed JSON)
- No logout mechanism yet (no cookie-clearing route)
- No CSRF protection mentioned — since the refresh token lives in a cookie, this may be worth revisiting once things are added
