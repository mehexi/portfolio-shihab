import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { PROFILE_TAG } from "@/sanity/queries";

// Target for a Sanity webhook (filter: _type == "profile") so published edits
// show up without waiting for the cache lifetime to pass.
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ message: "SANITY_REVALIDATE_SECRET is not set" }, { status: 500 });
  }

  const { isValidSignature } = await parseBody(req, secret);
  if (!isValidSignature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  revalidateTag(PROFILE_TAG, { expire: 0 });
  return NextResponse.json({ revalidated: true });
}
