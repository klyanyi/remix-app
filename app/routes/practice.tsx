import { Button, Flex, Subtitle, Title } from "@tremor/react";
import type {
  LoaderArgs,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";

import { Bars4Icon } from "@heroicons/react/24/solid";
import Modal from "~/components/Modal";
import type { SetStateAction } from "react";
import Sidebar from "~/components/Sidebar";
import { json } from "@remix-run/cloudflare";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [{ title: "PassRadiology | Practice Exam" }];
};

// Define the bindings associated with our Function
// so that they are typed
interface Env {
  USERS_EXAMS: KVNamespace;
}

export const loader: LoaderFunction = async ({
  context,
  params,
}: LoaderArgs) => {
  // Bindings are accessible on context.env
  let env = context.env as Env;
  return json(
    await env.USERS_EXAMS.get<{ name: string }>(`1`, {
      type: "json",
    })
  );
};

export default function Index() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isExitModalOpen, setExitModalOpen] = useState(false);
  const [isSubmitModalOpen, setSubmitModalOpen] = useState(false);

  const data = useLoaderData<typeof loader>();

  const list = data.questions.map((item: any, idx: number) => {
    return {
      key: item.id,
      //   href: `/practice/${id}`,
      label: idx + 1,
      active: false,
      isFlagged: false,
    };
  });

  return (
    <div>
      <Flex className="py-4 px-4 bg-gray-800" justifyContent="between">
        <Flex alignItems="center" justifyContent="start">
          <Button
            className="mr-2 text-white border-white"
            variant="secondary"
            onClick={() => {
              setShowSidebar(!showSidebar);
            }}
          >
            <Bars4Icon height={24} />
          </Button>
          <Button
            className="mr-4 text-white border-white"
            variant="secondary"
            onClick={() => {
              setExitModalOpen(true);
            }}
          >
            Exit
          </Button>
          <Title className="font-bold text-2xl text-white">
            PassRadiology |{" "}
          </Title>

          <Subtitle>{data.title}</Subtitle>
        </Flex>
        <Flex alignItems="center" justifyContent="end">
          <Button
            className="mr-2"
            onClick={() => {
              setSubmitModalOpen(true);
            }}
          >
            Submit
          </Button>
          <Button
            className="mr-2 text-white border-white"
            variant="secondary"
            onClick={() => {
              if (Number(currentIndex) === 1) {
                setCurrentIndex(data.questions.length);
              } else {
                setCurrentIndex(currentIndex - 1);
              }
            }}
          >
            Previous
          </Button>
          <Button
            className="text-white border-white"
            variant="secondary"
            onClick={() => {
              if (Number(currentIndex) === data.questions.length) {
                setCurrentIndex(1);
              } else {
                setCurrentIndex(Number(currentIndex) + 1);
              }
            }}
          >
            Next
          </Button>
        </Flex>
      </Flex>
      <Flex className="h-screen">
        {showSidebar ? (
          <Sidebar
            list={list}
            currentIndex={currentIndex}
            onClickItem={(index: SetStateAction<number>) =>
              setCurrentIndex(index)
            }
          />
        ) : null}
        <Outlet context={currentIndex} />
      </Flex>

      <Modal
        small
        isOpen={isExitModalOpen}
        title={"Exit session"}
        text1={
          "You are about to exit the current session. By doing this, you will lose all your current progress."
        }
        text2={"Are you sure?"}
        cancelButtonText={"Cancel"}
        confirmButtonText={"Go back to dashboard"}
        onCancel={() => setExitModalOpen(false)}
        onConfirm={() => {}}
      />

      <Modal
        small
        isOpen={isSubmitModalOpen}
        title={"Final submission"}
        text1={
          "You are about to submit your answers, you will not be able to come back and change your answers."
        }
        text2={"Are you sure?"}
        text3={
          <>
            <br />
            {/* Questions answered: {getValues(values)} */}
          </>
        }
        cancelButtonText={"Cancel"}
        confirmButtonText={"Submit my answers"}
        onCancel={() => setExitModalOpen(false)}
        onConfirm={() => {
          //   handleSubmit();
        }}
        confirmButtonLoading={false}
      />
    </div>
  );
}
