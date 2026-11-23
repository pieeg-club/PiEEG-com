export const PIEEG_XR_KICKSTARTER_URL =
  "https://www.kickstarter.com/projects/42415505/pieeg-xr-neural-face-interface-for-spatial-computing";

export const PIEEG_XR_CAMPAIGN = {
  url: PIEEG_XR_KICKSTARTER_URL,
  goal: "£5,000",
  endsLabel: "Ends 31 Dec",
  snoozeMs: 3 * 24 * 60 * 60 * 1000, // 3 days
} as const;

export function pieegXrKickstarterUrl(placement?: string): string {
  if (!placement) return PIEEG_XR_KICKSTARTER_URL;
  const params = new URLSearchParams({
    utm_source: "pieeg.com",
    utm_medium: "website",
    utm_campaign: "pieeg_xr_kickstarter",
    utm_content: placement,
  });
  return `${PIEEG_XR_KICKSTARTER_URL}?${params.toString()}`;
}
