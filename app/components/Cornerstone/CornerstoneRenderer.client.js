import * as cornerstone from "@cornerstonejs/core";
import * as cornerstoneTools from "@cornerstonejs/tools";

import React, { useEffect, useRef, useState } from "react";

import { ClientOnly } from "remix-utils/client-only";
import { ViewportType } from "@cornerstonejs/core/dist/esm/enums";
import { init as csRenderInit } from "@cornerstonejs/core";
import { init as csToolsInit } from "@cornerstonejs/tools";
import initCornerstoneDICOMImageLoader from "./initDICOMImageLoader";
import initProviders from "./initProviders";
import initVolumeLoader from "./initVolumeLoader";

// import uids from "../uids";

const {
  PanTool,
  WindowLevelTool,
  StackScrollMouseWheelTool,
  ZoomTool,
  ToolGroupManager,
  Enums: csToolsEnums,
} = cornerstoneTools;

const { MouseBindings } = csToolsEnums;
const toolGroupId = "myToolGroup";

const CornerStoneRenderer = ({ url, size = 600 }) => {
  const viewport = useRef();
  const element = useRef();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      init();

      // Disable right click context menu so we can have right click tools
      element.current.oncontextmenu = (e) => e.preventDefault();
    }
  }, [mounted]);

  // useEffect(() => {
  //   console.log(element, viewport, mounted)
  //   if (element.current && viewport.current && mounted) {
  //     downloadAndView(url);
  //   }
  // }, [element, viewport, mounted, url]);

  async function init() {
    console.log("hi", url);
    initProviders();
    initCornerstoneDICOMImageLoader();
    initVolumeLoader();
    await csRenderInit();
    await csToolsInit();

    cornerstoneTools.addTool(PanTool);
    cornerstoneTools.addTool(WindowLevelTool);
    cornerstoneTools.addTool(StackScrollMouseWheelTool);
    cornerstoneTools.addTool(ZoomTool);

    // Define a tool group, which defines how mouse events map to tool commands for
    // Any viewport using the group
    const toolGroup = ToolGroupManager.createToolGroup(toolGroupId);

    // Add tools to the tool group
    toolGroup.addTool(WindowLevelTool.toolName);
    toolGroup.addTool(PanTool.toolName);
    toolGroup.addTool(ZoomTool.toolName);
    toolGroup.addTool(StackScrollMouseWheelTool.toolName);

    // Set the initial state of the tools, here all tools are active and bound to
    // Different mouse inputs
    toolGroup.setToolActive(WindowLevelTool.toolName, {
      bindings: [
        {
          mouseButton: MouseBindings.Primary, // Left Click
        },
      ],
    });
    toolGroup.setToolActive(PanTool.toolName, {
      bindings: [
        {
          mouseButton: MouseBindings.Auxiliary, // Middle Click
        },
      ],
    });
    toolGroup.setToolActive(ZoomTool.toolName, {
      bindings: [
        {
          mouseButton: MouseBindings.Secondary, // Right Click
        },
      ],
    });
    // As the Stack Scroll mouse wheel is a tool using the `mouseWheelCallback`
    // hook instead of mouse buttons, it does not need to assign any mouse button.
    toolGroup.setToolActive(StackScrollMouseWheelTool.toolName);

    // Get Cornerstone imageIds and fetch metadata into RAM

    // Instantiate a rendering engine
    const renderingEngineId = "myRenderingEngine";
    const renderingEngine = new cornerstone.RenderingEngine(renderingEngineId);

    // Create a stack viewport
    const viewportId = "CT_STACK";
    const viewportInput = {
      viewportId,
      type: ViewportType.STACK,
      element: element.current,
    };

    renderingEngine.enableElement(viewportInput);

    // Get the stack viewport that was created
    viewport.current = renderingEngine.getViewport(viewportId);

    console.log(element, mounted,viewport)
    toolGroup.addViewport(viewportId, renderingEngineId);

    // now download
    downloadAndView(url)
  }

  async function loadAndViewImage(imageId) {
    // console.log({ viewport });
    // Set the stack on the viewport
    // const start = new Date().getTime();
    viewport.current.setStack([imageId]).then(
      () => {
        // Set the VOI of the stack
        // viewport.setProperties({ voiRange: ctVoiRange });
        // Render the image
        viewport.current.render();
      },
      function (err) {
        throw err;
      }
    );
  }

  function downloadAndView(downloadUrl) {
    console.log('dowload')
    let url = downloadUrl;

    // prefix the url with wadouri: so cornerstone can find the image loader
    url = "wadouri:" + url;

    // image enable the dicomImage element and activate a few tools
    loadAndViewImage(url);
  }

  if (!mounted) return null;
  console.log(window?.navigator, element);
  return <div ref={element} style={{ height: size, width: size }}></div>;
};

export { CornerStoneRenderer };
