import React, { useState } from "react";

import { userEvent, within, expect } from "@storybook/test";
import { UtilStory } from "../../stories/hooks.stories";

import { Button } from "litten/dist/button";

import { usePrevious } from "../../hooks/usePrevious";

const Test = () => {
    const [value, setValue] = useState(0);
    const lastValue = usePrevious(value);

    function handleClick() {
        setValue(value + 1);
    }

    function handleSubtractClick() {
        setValue(value - 1);
    }

    return (
        <div>
            <p>Current: {value}</p>
            <p>Previous: {lastValue}</p>
            <Button style={{ marginRight: "10px" }} onClick={handleClick}>
                Add
            </Button>
            <Button onClick={handleSubtractClick}>Subtract</Button>
        </div>
    );
};

export const UsePreviousTest: UtilStory = {
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const addBtu = canvas.getByText("Add");
        const subtractBtu = canvas.getByText("Subtract");

        await step(
            'Click "Add" button, then "Current: 1" and "Previous: 0" ',
            async () => {
                await userEvent.click(addBtu);

                await expect(
                    canvas.getByText("Current: 1")
                ).toBeInTheDocument();

                await expect(
                    canvas.getByText("Previous: 0")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click "Add" button, then "Current: 2" and "Previous: 1" ',
            async () => {
                await userEvent.click(addBtu);

                await expect(
                    canvas.getByText("Current: 2")
                ).toBeInTheDocument();

                await expect(
                    canvas.getByText("Previous: 1")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click "Subtract" button, then "Current: 2" and "Previous: 1" ',
            async () => {
                await userEvent.click(subtractBtu);

                await expect(
                    canvas.getByText("Current: 1")
                ).toBeInTheDocument();

                await expect(
                    canvas.getByText("Previous: 2")
                ).toBeInTheDocument();
            }
        );
    },
};
