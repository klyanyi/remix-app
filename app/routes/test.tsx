import { ClientOnly } from "remix-utils/client-only";
import { CornerStoneRenderer } from "../components/Cornerstone/CornerstoneRenderer.client";
import { LoaderFunction } from "@remix-run/react";
// import type { MetaFunction } from "@remix-run/cloudflare";

export let loader: LoaderFunction = async ({ request }) => {
  return new Response("This is a client-only route.", {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  });
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <ClientOnly>
        {() => {
          return (
            <CornerStoneRenderer
              url={`https://passradiology.s3.ap-southeast-1.amazonaws.com/assets/dcm/0fe2d01c-6110-48a4-9292-a85f82d90f8f.dcm`}
            />
          );
        }}
      </ClientOnly>
    </div>
  );
}
