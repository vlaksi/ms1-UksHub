import FingerprintJS from '@fingerprintjs/fingerprintjs';

export async function getMyBrowserID() {
  const fpPromise = FingerprintJS.load();

  // Get the visitor identifier when you need it.
  const fp = await fpPromise;
  const result = await fp.get();

  return result.visitorId;
}
