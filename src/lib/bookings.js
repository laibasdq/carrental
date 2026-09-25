const STORAGE_KEY = "driveeasyBookings";

/**
 * Reads all saved bookings from localStorage.
 * Always returns an array, even if storage is empty, corrupted,
 * or unavailable (e.g. private browsing).
 */
export function getBookings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

/**
 * Overwrites the full bookings list in localStorage.
 * Returns true on success, false if storage failed silently.
 */
export function saveBookings(bookings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    return true;
  } catch {
    return false;
  }
}

/**
 * Adds a new booking to the top of the list and persists it.
 */
export function addBooking(booking) {
  const updated = [booking, ...getBookings()];
  saveBookings(updated);
  return updated;
}

/**
 * Finds a single booking by id (string/number safe).
 */
export function findBookingById(id) {
  if (!id) return null;
  return (
    getBookings().find((item) => String(item.id) === String(id)) || null
  );
}
