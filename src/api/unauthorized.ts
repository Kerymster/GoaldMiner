export type UnauthorizedHandler = () => void | Promise<void>

let handler: UnauthorizedHandler | null = null

/** Called once from a component under `BrowserRouter` (e.g. `ApiUnauthorizedBridge`). */
export function setUnauthorizedHandler(fn: UnauthorizedHandler | null) {
  handler = fn
}

/** Invoked when the API returns 401 or a protected call has no session token. */
export function notifyUnauthorized() {
  const fn = handler
  if (!fn) return
  void Promise.resolve(fn()).catch((err) => {
    console.error('Unauthorized handler failed', err)
  })
}
