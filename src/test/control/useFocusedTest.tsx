import React from "react";

import { userEvent, within, expect } from "@storybook/test";
import { UtilStory } from "../../stories/hooks.stories";

import {
    useFocused,
    getStateByFocused,
} from "../../control/focusControl/focusControl";

import { getLabelMouseState, setLabelMouseState } from "../../control/userControl/userControl";
import { MouseState } from "../../global/enum";

const Test = () => {
    const [focused, handleFocus, handleBlur] = useFocused({});

    return (
        <div>
            <p>focused: {getStateByFocused(focused)}</p>

            <button onFocus={handleFocus} onBlur={handleBlur}>
                my component
            </button>
        </div>
    );
};

export const UseFocusedTest: UtilStory = {
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const myBtu = canvas.getByText("my component");

        await step(
            '"my component" button is blur,"focused: blur" to be in the document.',
            async () => {
                await expect(myBtu).not.toHaveFocus();

                await expect(
                    canvas.getByText("focused: blur")
                ).toBeInTheDocument();
            }
        );

        await step(
            'click "my component" button, then "focused: focus" to be in the document.',
            async () => {
                await userEvent.click(myBtu);

                await expect(myBtu).toHaveFocus();

                await expect(
                    canvas.getByText("focused: focus")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Trigger tab, then "my component" button is blur and "focused: focus" to be in the document.',
            async () => {
                await userEvent.tab();

                await expect(myBtu).not.toHaveFocus();

                await expect(
                    canvas.getByText("focused: blur")
                ).toBeInTheDocument();
            }
        );

        await step('Set label MouseState to mouseup, click "my component" button, then MouseState to be none', async () => {
            await setLabelMouseState(MouseState.mouseup);

            await userEvent.click(myBtu);

            await expect(getLabelMouseState()).toBe(MouseState.none);
        });
    },
};
