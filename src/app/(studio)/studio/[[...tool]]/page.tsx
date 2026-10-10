import { NextStudio } from "next-sanity/studio";
import config from "../../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ fontFamily: "system-ui, sans-serif", maxWidth: 560, margin: "15vh auto", padding: 24, lineHeight: 1.6 }}>
        <h1 style={{ fontSize: 22 }}>Sanity isn’t connected yet</h1>
        <p>
          Set <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> and <code>NEXT_PUBLIC_SANITY_DATASET</code> in{" "}
          <code>.env.local</code> (see <code>.env.example</code>), then restart the dev server.
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
