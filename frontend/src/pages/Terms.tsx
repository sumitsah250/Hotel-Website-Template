import { LegalPage } from "@/components/shared/LegalPage";

export default function Terms() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Stay"
      updated="1 June 2026"
      intro="The house rules, written the way we would explain them over a glass of vermouth. A reservation with Royal Sumix is accepted on these terms."
      sections={[
        {
          heading: "Reservations & cancellation",
          body: [
            "Flexible rates may be cancelled without charge until 7 days before arrival; within 7 days the first night is due.",
            "Seasonal packages, residences and the Royal Penthouse carry their own terms, always shown before you confirm.",
          ],
        },
        {
          heading: "Arrival & departure",
          body: [
            "Check-in from 15:00, check-out until 12:00. Early arrivals are welcomed at the pool or the bar while your room is finished.",
          ],
        },
        {
          heading: "The house",
          body: [
            "The estate is a quiet house: no amplified music outdoors, and the infinity pool keeps family hours from 10:00 to 12:00.",
            "Small and medium dogs are welcome in garden-level rooms and residences. Smoking is outdoors only, on the west terrace.",
          ],
        },
        {
          heading: "Liability",
          body: [
            "We care for the house and its guests with diligence; we cannot be responsible for belongings left in public areas or for the moods of the sea.",
          ],
        },
        {
          heading: "This website",
          body: [
            "Content on this site describes the house in good faith. Photography is representative; the light is better in person.",
          ],
        },
      ]}
    />
  );
}
