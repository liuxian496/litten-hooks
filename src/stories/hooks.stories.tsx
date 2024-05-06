import { Meta, StoryObj } from "@storybook/react";

import { UsePreviousTest } from "../test/hooks/usePreviousTest";

export default {
  title: "Example/Hooks",
} as Meta;

export type UtilStory = StoryObj;


export const UsePrevious = {
  name: "usePrevious",
  ...UsePreviousTest,
};
