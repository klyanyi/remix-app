import {
  cornerstoneStreamingDynamicImageVolumeLoader,
  cornerstoneStreamingImageVolumeLoader,
} from "@cornerstonejs/streaming-image-volume-loader";

import { volumeLoader } from "@cornerstonejs/core";

export default function initVolumeLoader() {
  volumeLoader.registerUnknownVolumeLoader(
    cornerstoneStreamingImageVolumeLoader
  );
  volumeLoader.registerVolumeLoader(
    "cornerstoneStreamingImageVolume",
    cornerstoneStreamingImageVolumeLoader
  );
  volumeLoader.registerVolumeLoader(
    "cornerstoneStreamingDynamicImageVolume",
    cornerstoneStreamingDynamicImageVolumeLoader
  );
}
