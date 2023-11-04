import { Grid, Title } from "@tremor/react";
import { useLoaderData, useOutletContext } from "@remix-run/react";

import { ClientOnly } from "remix-utils/client-only";
import { CornerStoneRenderer } from "~/components/Cornerstone/CornerstoneRenderer.client";
import { json } from "@remix-run/cloudflare";

export let loader = async ({ request }) => {
  return json({ questions: [{ id: 1 }, { id: 2 }] });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const currentIndex = useOutletContext();

  return (
    <Grid className="bg-gray-100 w-full h-screen" numItems={2}>
      <div className="py-4 pl-4 pr-2">
        <Title className="px-4 py-2 bg-tremor-brand text-white bg-gray-800">
          {currentIndex}
        </Title>

        <div className="p-4">
          {/* <ClientOnly>
            {() => (
              <CornerStoneRenderer
                url={`https://passradiology.s3.ap-southeast-1.amazonaws.com/assets/dcm/0fe2d01c-6110-48a4-9292-a85f82d90f8f.dcm`}
              />
            )}
          </ClientOnly> */}
        </div>
      </div>

      <div className="py-4 pl-2 pr-4">
        <Title className="px-4 py-2 bg-tremor-brand text-white bg-gray-800 ">
          Answer
        </Title>
      </div>
    </Grid>
  );
}
