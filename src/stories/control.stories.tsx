import { Meta, StoryObj } from "@storybook/react";

import { UseCurrentCheckedTest } from "../test/control/useCurrentCheckedTest";
import { UseCurrentValueTest } from "../test/control/useCurrentValueTest";
import { UseDisabledTest } from "../test/control/useDisabledTest";
import { UseFocusedTest } from "../test/control/useFocusedTest";
import { UseRelativePositionTest } from "../test/control/useRelativePositionTest";
import { UseVirtualFocusTest } from "../test/control/useVirtualFocusTest";

export default {
    title: "Example/Control",
} as Meta;

export type UtilStory = StoryObj;

export const UseCurrentChecked = {
    name: "useCurrentChecked",
    ...UseCurrentCheckedTest,
};

export const UseCurrentValue = {
    name: "useCurrentValue",
    ...UseCurrentValueTest,
};

export const UseDisabled = {
    name: "useDisabled",
    ...UseDisabledTest,
};

export const UseFocused = {
    name: "useFocused",
    ...UseFocusedTest,
};

export const UseRelativePosition = {
    name: "useRelativePosition",
    ...UseRelativePositionTest,
};

export const UseVirtualFocus = {
    name: "useVirtualFocusTest",
    ...UseVirtualFocusTest
}
