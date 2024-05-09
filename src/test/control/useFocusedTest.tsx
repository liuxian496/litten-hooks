import React, { useState } from "react";

import { userEvent, within, expect } from "@storybook/test";
import { UtilStory } from "../../stories/hooks.stories";

import {
    useFocused,
    getStateByFocused,
} from "../../control/focusControl/focusControl";

function handleLabelMouseStateCheck() {
    return true;
}

const Test = () => {
    const [focusLog, setFocusLog] = useState("");
    const [blurLog, setBlurLog] = useState("");

    const [tomFocused, handleTomFocus, handleTomBlur] = useFocused({
        onLabelMouseStateCheck: handleLabelMouseStateCheck,
        onFocus: () => {
            setFocusLog("Tom");
        },
        onBlur: () => {
            setBlurLog("Tom");
        },
    });

    const [jerryoFocused, handleJerryFocus, handleJerryBlur] = useFocused({
        onFocus: () => {
            setFocusLog("Jerry");
        },
        onBlur: () => {
            setBlurLog("Jerry");
        },
    });

    return (
        <div>
            <p>Tom focused: {getStateByFocused(tomFocused)}</p>
            <p>Jerry focused: {getStateByFocused(jerryoFocused)}</p>
            <p>Focus log: {focusLog}</p>
            <p>Blur log: {blurLog}</p>

            <button onFocus={handleTomFocus} onBlur={handleTomBlur}>
                Tom
            </button>

            <button onFocus={handleJerryFocus} onBlur={handleJerryBlur}>
                Jerry
            </button>
        </div>
    );
};

export const UseFocusedTest: UtilStory = {
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const tomBtu = canvas.getByText("Tom");
        const jerryBtu = canvas.getByText("Jerry");

        await step('"Tom" button is blur, "Jerry" button is blur.', async () => {
            await expect(tomBtu).not.toHaveFocus();
            await expect(jerryBtu).not.toHaveFocus();

            await expect(
                canvas.getByText("Tom focused: blur")
            ).toBeInTheDocument();

            await expect(
                canvas.getByText("Jerry focused: blur")
            ).toBeInTheDocument();

            await expect(canvas.getByText("Focus log:")).toBeInTheDocument();

            await expect(canvas.getByText("Blur log:")).toBeInTheDocument();
        });

        await step(
            'Click "Tom" button, then "Tom focused: focus","Jerry focused: blur","Focus log: Tom","Blur log:" to be in the document',
            async () => {
                await userEvent.click(tomBtu);

                await expect(tomBtu).toHaveFocus();
                await expect(jerryBtu).not.toHaveFocus();

                await expect(
                    canvas.getByText("Tom focused: focus")
                ).toBeInTheDocument();

                await expect(
                    canvas.getByText("Jerry focused: blur")
                ).toBeInTheDocument();

                await expect(
                    canvas.getByText("Focus log: Tom")
                ).toBeInTheDocument();

                await expect(canvas.getByText("Blur log:")).toBeInTheDocument();
            }
        );

        await step(
            'Click "Jerry" button, then "Tom focused: blur","Jerry focused: focus", "Focus log: Jerry", "Blur log: Tom" to be in the document. ',
            async () => {
                await userEvent.click(jerryBtu);

                await expect(tomBtu).not.toHaveFocus();
                await expect(jerryBtu).toHaveFocus();
                await expect(
                    canvas.getByText("Tom focused: blur")
                ).toBeInTheDocument();

                await expect(
                    canvas.getByText("Jerry focused: focus")
                ).toBeInTheDocument();

                await expect(
                    canvas.getByText("Focus log: Jerry")
                ).toBeInTheDocument();

                await expect(canvas.getByText("Blur log: Tom")).toBeInTheDocument();
            }
        );
    },
};
