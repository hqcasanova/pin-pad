// Both constants to be removed after migrating to server-side auth.
const serverDelay: number = JSON.parse(process.env.VUE_APP_SERVER_DELAY);

// Not JSON-parsed to get raw string even if it's a number eg: "1234" (see .env)
export const validPin: string = process.env.VUE_APP_VALID_PIN;

/**
 * Delayed promise emulating server-side validation.
 * @param code - PIN code to be verified.
 * @returns Promise object.
 */
export function validate(code: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    setTimeout(code === validPin ? resolve : reject, serverDelay);
  });
}
