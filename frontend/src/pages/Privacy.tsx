import { LegalPage } from "@/components/shared/LegalPage";

export default function Privacy() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="1 June 2026"
      intro="We keep as little of your information as the law and good hospitality allow. This policy explains, in plain language, what we collect, why, and when it is deleted."
      sections={[
        {
          heading: "What we collect",
          body: [
            "Reservation details: your name, contact information, dates of stay and any requests you share with us.",
            "Correspondence: letters you send us by email, form or WhatsApp, kept so we can continue the conversation.",
            "Technical basics: anonymised analytics about how the site is used. We do not run advertising trackers.",
          ],
        },
        {
          heading: "Why we collect it",
          body: [
            "To prepare and honour your reservation, and to reply to your enquiries.",
            "To send our monthly letter, only if you asked for it. Every letter carries a one-click unsubscribe.",
          ],
        },
        {
          heading: "What we never do",
          body: [
            "We never sell, rent or trade your information. We never profile you for advertising. Your stay history stays in the house.",
          ],
        },
        {
          heading: "Retention & your rights",
          body: [
            "Reservation records are kept for the period required by Italian fiscal law, then deleted. Correspondence is deleted after two quiet years.",
            "You may ask at any time to see, correct or erase your information. Write to the concierge and it will be done within thirty days.",
          ],
        },
        {
          heading: "Cookies",
          body: [
            "We use a small number of functional cookies — for example, remembering your cookie choice itself. Declining changes nothing about your visit.",
          ],
        },
      ]}
    />
  );
}
