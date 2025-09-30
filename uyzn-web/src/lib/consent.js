export function getConsent() {
  return localStorage.getItem("analytics_consent") === "yes";
}
export function setConsent(yes) {
  localStorage.setItem("analytics_consent", yes ? "yes" : "no");
}
