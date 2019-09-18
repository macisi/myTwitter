export enum TIMELINE_REQUEST_TYPE {
  TOP,
  BOTTOM,
}

export const STATUS_CODE_MAP = new Map([
  [200, 'OK'],
  [304, 'Not Modified'],
  [400, 'Bad Request'],
  [401, 'Unauthorized'],
  [403, 'Forbidden'],
  [404, 'Not Found'],
  [406, 'Not Acceptable'],
  [410, 'Gone'],
  [420, 'Enhance Your Calm'],
  [422, 'Unprocessable Entity'],
  [429, 'Too Many Requests'],
  [500, 'Internal Server Error'],
  [502, 'Bad Gateway'],
  [503, 'Service Unavailable'],
  [504, 'Gateway timeout'],
]);

/**
 * HTTP Status Codes
 */
export enum STATUS_CODE_ENUM {
  /**
   * Success!
   */
  OK = 200,
  /**
   * There was no new data to return.
   */
  'Not Modified' = 304,
  /**
   * The request was invalid or cannot be otherwise served. An accompanying error message will explain further. Requests without authentication are considered invalid and will yield this response.
   */
  'Bad Request' = 400,
  /**
   * Missing or incorrect authentication credentials. This may also returned in other undefined circumstances.
   */
  Unauthorized = 401,
  /**
   * The request is understood, but it has been refused or access is not allowed. An accompanying error message will explain why. This code is used when requests are being denied due to update limits . Other reasons for this status being returned are listed alongside the error codes in the table below.
   */
  Forbidden = 403,
  /**
   * The URI requested is invalid or the resource requested, such as a user, does not exist. 
   */
  'Not Found' = 404,
  /**
   * Returned when an invalid format is specified in the request.
   */
  'Not Acceptable' = 406,
  /**
   * This resource is gone. Used to indicate that an API endpoint has been turned off.
   */
  Gone = 410,
  /**
   * Returned when an app is being rate limited for making too many requests.
   */
  'Enhance Your Calm' = 420,
  /**
   * Returned when the data is unable to be processed (for example, if an image uploaded to POST account / update_profile_banner is not valid, or the JSON body of a request is badly-formed).
   */
  'Unprocessable Entity' = 422,
  /**
   * Returned when a request cannot be served due to the app's rate limit having been exhausted for the resource. See Rate Limiting.
   */
  'Too Many Requests' = 429,
  /**
   * Something is broken. This is usually a temporary error, for example in a high load situation or if an endpoint is temporarily having issues. Check in the developer forums in case others are having similar issues,  or try again later.
   */
  'Internal Server Error' = 500,
  /**
   * Twitter is down, or being upgraded.
   */
  'Bad Gateway' = 502,
  /**
   * The Twitter servers are up, but overloaded with requests. Try again later.
   */
  'Service Unavailable' = 503,
  /**
   * The Twitter servers are up, but the request couldn’t be serviced due to some failure within the internal stack. Try again later.
   */
  'Gateway timeout' = 504,
}
