import React, { useState } from "react";

import { userEvent, within, expect } from "@storybook/test";
import { Button } from "litten/dist/button";
import { StackPanel } from "litten/dist/stackPanel";

import { UtilStory } from "../../stories/hooks.stories";

import {
    useFocused,
    getStateByFocused,
} from "../../control/focusControl/focusControl";

let labelCheckResult = false;

function handleLabelMouseStateCheck() {
    return labelCheckResult;
}

const Test = () => {
    const [focusLog, setFocusLog] = useState("");
    const [blurLog, setBlurLog] = useState("");

    const [tomFocused, handleTomFocus, handleTomBlur] = useFocused({
        onFocus: () => {
            setFocusLog("Tom");
        },
        onBlur: () => {
            setBlurLog("Tom");
        },
    });

    const [jerryoFocused, handleJerryFocus, handleJerryBlur] = useFocused({
        onLabelMouseStateCheck: handleLabelMouseStateCheck,
    });

    function handleChangeLabelResultClick() {
        labelCheckResult = true;
    }

    return (
        <>
            <StackPanel direction="column" alignItems="baseline">
                <p>Tom focused: {getStateByFocused(tomFocused)}</p>
                <p>Focus log: {focusLog}</p>
                <p>Blur log: {blurLog}</p>

                <button onFocus={handleTomFocus} onBlur={handleTomBlur}>
                    Tom
                </button>
            </StackPanel>
            <StackPanel direction="column" alignItems="baseline">
                <p>Jerry focused: {getStateByFocused(jerryoFocused)}</p>

                <button onFocus={handleJerryFocus} onBlur={handleJerryBlur}>
                    Jerry
                </button>
                <Button onClick={handleChangeLabelResultClick}>
                    Change Label Result
                </Button>
            </StackPanel>
        </>
    );
};

export const UseFocusedTest: UtilStory = {
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const tomBtu = canvas.getByText("Tom");
        const jerryBtu = canvas.getByText("Jerry");
        const changeLabelResultBtu = canvas.getByText("Change Label Result");

        await step(
            '"Tom" button is blur, "Jerry" button is blur.',
            async () => {
                await expect(tomBtu).not.toHaveFocus();
                await expect(jerryBtu).not.toHaveFocus();

                await expect(
                    canvas.getByText("Tom focused: blur")
                ).toBeInTheDocument();

                await expect(
                    canvas.getByText("Jerry focused: blur")
                ).toBeInTheDocument();

                await expect(
                    canvas.getByText("Focus log:")
                ).toBeInTheDocument();

                await expect(canvas.getByText("Blur log:")).toBeInTheDocument();
            }
        );

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
            'Click "Jerry" button, then "Jerry focused: blur" to be in the document. ',
            async () => {
                await userEvent.click(jerryBtu);

                await expect(tomBtu).not.toHaveFocus();
                await expect(jerryBtu).toHaveFocus();
                await expect(
                    canvas.getByText("Tom focused: blur")
                ).toBeInTheDocument();

                await expect(
                    canvas.getByText("Jerry focused: blur")
                ).toBeInTheDocument();

                await expect(
                    canvas.getByText("Focus log: Tom")
                ).toBeInTheDocument();

                await expect(
                    canvas.getByText("Blur log: Tom")
                ).toBeInTheDocument();
            }
        );


        await step(
            'Click "Change Label Result" button, Click "Jerry" button,then "Jerry focused: focus" to be in the document.',
            async () => {
                await userEvent.click(changeLabelResultBtu);
                await userEvent.click(jerryBtu);

                await expect(jerryBtu).toHaveFocus();

                await expect(
                    canvas.getByText("Jerry focused: focus")
                ).toBeInTheDocument();
            }
        );
    },
};
