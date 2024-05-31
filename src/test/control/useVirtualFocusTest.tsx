import React, { useState } from "react";

import { userEvent, within, expect } from "@storybook/test";

import { Button } from "litten/dist/button";

import { UtilStory } from "../../stories/hooks.stories";
import {
    getLastSelectedIndex,
    getNextListFocusIndex,
    useVirtualFocus,
} from "../../control/focusControl/useVirtualFocus";
import { LittenItems } from "../../control/userControl/userControl.types";
const listItems: LittenItems = [
    {
        value: "a",
    },
    {
        value: "b",
        disabled: true,
    },
    {
        value: "c",
    },
    {
        value: "d",
        disabled: true,
    },
    {
        value: "e",
    },
    {
        value: "f",
    },
    {
        value: "g",
    },
    {
        value: "h",
    },
    {
        value: "i",
    },
    {
        value: "j",
    },
    {
        value: "k",
    },
];

const Test = () => {
    const [focusIndex, focusValue, setFocusValue] = useVirtualFocus(listItems);

    function handleSetAClick() {
        setFocusValue("a");
    }

    function handleArrowDownClick() {
        const nextIndex = getNextListFocusIndex(
            focusIndex,
            listItems,
            "ArrowDown"
        );
        const { value } = listItems[nextIndex];

        setFocusValue(value);
    }

    function handleArrowUpClick() {
        const nextIndex = getNextListFocusIndex(
            focusIndex,
            listItems,
            "ArrowUp"
        );
        const { value } = listItems[nextIndex];

        setFocusValue(value);
    }

    function handleHomeClick() {
        const nextIndex = getNextListFocusIndex(focusIndex, listItems, "Home");
        const { value } = listItems[nextIndex];

        setFocusValue(value);
    }

    function handleEndClick() {
        const nextIndex = getNextListFocusIndex(focusIndex, listItems, "End");
        const { value } = listItems[nextIndex];

        setFocusValue(value);
    }

    return (
        <div>
            <p>{`focusValue: ${focusValue}`}</p>
            <p>{`focusIndex: ${focusIndex}`}</p>
            <Button onClick={handleSetAClick}>Set FocusValue to a</Button>
            <Button onClick={handleArrowDownClick}>ArrowDown</Button>
            <Button onClick={handleArrowUpClick}>ArrowUp</Button>
            <Button onClick={handleHomeClick}>Home</Button>
            <Button onClick={handleEndClick}>End</Button>
        </div>
    );
};

export const UseVirtualFocusTest: UtilStory = {
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const setABtu = canvas.getByText("Set FocusValue to a");
        const arrowDownBtu = canvas.getByText("ArrowDown");
        const arrowUpBtu = canvas.getByText("ArrowUp");
        const homeBtu = canvas.getByText("Home");
        const endBtu = canvas.getByText("End");

        await step(
            '"focusValue: undefined" and "focusIndex: -1" to be in the document',
            async () => {
                await expect(
                    canvas.getByText("focusValue: undefined")
                ).toBeInTheDocument();

                await expect(
                    canvas.getByText("focusIndex: -1")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click "Set FocusValue to a" button. Then "focusValue: a" and "focusIndex: 0" to be in the document',
            async () => {
                await userEvent.click(setABtu);

                await expect(
                    canvas.getByText("focusValue: a")
                ).toBeInTheDocument();

                await expect(
                    canvas.getByText("focusIndex: 0")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click "ArrowDown" button. Then "focusValue: c" and "focusIndex: 2" to be in the document',
            async () => {
                await userEvent.click(arrowDownBtu);

                await expect(
                    canvas.getByText("focusValue: c")
                ).toBeInTheDocument();

                await expect(
                    canvas.getByText("focusIndex: 2")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click "ArrowUp" button. Then "focusValue: a" and "focusIndex: 0" to be in the document',
            async () => {
                await userEvent.click(arrowUpBtu);

                await expect(
                    canvas.getByText("focusValue: a")
                ).toBeInTheDocument();

                await expect(
                    canvas.getByText("focusIndex: 0")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click "End" button. Then "focusValue: k" and "focusIndex: 10" to be in the document',
            async () => {
                await userEvent.click(endBtu);

                await expect(
                    canvas.getByText("focusValue: k")
                ).toBeInTheDocument();

                await expect(
                    canvas.getByText("focusIndex: 10")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Click "Home" button. Then "focusValue: a" and "focusIndex: 0" to be in the document',
            async () => {
                await userEvent.click(homeBtu);

                await expect(
                    canvas.getByText("focusValue: a")
                ).toBeInTheDocument();

                await expect(
                    canvas.getByText("focusIndex: 0")
                ).toBeInTheDocument();
            }
        );

        await step(
            'Test getLastSelectedIndex.',
            async () => {
                await expect(getLastSelectedIndex(listItems, "k")).toEqual(10);

                await expect(
                    getLastSelectedIndex(listItems, undefined)
                ).toEqual(-1);

                await expect(
                    getLastSelectedIndex(listItems, ["k", "a", "c"])
                ).toEqual(-1);

                await expect(
                    getLastSelectedIndex(listItems, ["k", "a", "c"], true)
                ).toEqual(2);

                await expect(
                    getLastSelectedIndex(listItems, ["c", "a", "k"], true)
                ).toEqual(10);
            }
        );
    },
};
