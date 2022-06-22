import { SliceSimulator } from "@prismicio/slice-simulator-react";
import { SliceZone } from "@prismicio/react";

import state from "../../.slicemachine/libraries-state.json";

const SliceSimulatorPage = () => {
  return (
    <SliceSimulator
      sliceZone={({ slices }) => (
        <SliceZone slices={slices} />
      )}
      state={state}
    />
  );
};

export default SliceSimulatorPage;