export function getLocation(
  timeoutMs = 5000
): Promise<{ lat: number; lon: number } | null> {
  return new Promise((resolve) => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      resolve(null);
      return;
    }
    const onOk = (pos: GeolocationPosition) => {
      resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude });
    };
    const onErr = () => resolve(null);
    navigator.geolocation.getCurrentPosition(onOk, onErr, {
      enableHighAccuracy: false,
      timeout: timeoutMs,
      maximumAge: 60_000,
    });
  });
}
