import { Button, Flex, Icon, Metric, Text, Title } from "@tremor/react";
import React, { useState } from "react";

import { FlagIcon } from "@heroicons/react/24/outline";
import { FlagIcon as FlagSolidIcon } from "@heroicons/react/24/solid";

export default function Sidebar({
  list,
  currentIndex,
  onClickItem,
}: {
  list: [
    {
      label: string;
      isFlagged: boolean;
    }
  ];
  currentIndex: Number;
  onClickItem: Function;
}) {
  const [collapseShow, setCollapseShow] = useState("hidden");

  return (
    <nav className="md:left-0 md:block md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-gray-800 flex flex-wrap items-center justify-between relative md:w-40 z-10 py-4 px-6 h-screen">
      <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
        {/* Toggler */}
        {/* <Button
          className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
          onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
        >
          <i className="fas fa-bars"></i>
        </Button> */}

        <Title className="text-white">Questions</Title>

        {/* Collapse */}
        <div
          className={
            "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
            collapseShow
          }
        >
          {/* Collapse header */}
          <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
            <div className="flex flex-wrap">
              <div className="w-6/12 flex justify-end">
                <button
                  className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                  type="button"
                  onClick={() => setCollapseShow("hidden")}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>

          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            {list.map((item, idx) => {
              const isActive = currentIndex === item.label;

              return (
                <li
                  className={
                    isActive
                      ? "flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-md hover:bg-gray-900 bg-gray-900 text-white"
                      : "flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-md hover:bg-gray-900 text-slate-400 hover:text-slate-300"
                  }
                  key={idx}
                >
                  {/* <Link href={item.href}> */}
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    onClick={() => onClickItem(item.label)}
                  >
                    <Title className="text-white">{item.label}</Title>
                    <Icon
                      icon={item.isFlagged ? FlagSolidIcon : FlagIcon}
                      size="sm"
                      color={item.isFlagged ? "rose" : "white"}
                    />
                  </Flex>
                  {/* </Link> */}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
