import React, { ChangeEvent, useState } from "react";

import { userEvent, within, expect } from "@storybook/test";
import { UtilStory } from "../../stories/hooks.stories";

import { Button } from "litten/dist/button";

import {
    getDefaultValueByDisplayName,
    useCurrentValue,
} from "../../control/contentControl/contentControl";
import { TextFieldValue } from "../../control/event/littenEvent.types";
import { ControlType } from "../../global/enum";

const Test = () => {
    const [value, setValue] = useState<string | undefined>(undefined);
    const [currentValue, setCurrentValue, setOriginalEvent] = useCurrentValue<
        HTMLInputElement,
        TextFieldValue
    >({
        value,
        defaultValue: getDefaultValueByDisplayName(ControlType.TextField),
        controlType: ControlType.TextField,
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setOriginalEvent(e);
        setCurrentValue(e.target.value);
    }

    function handleChangeValueButtonClick() {
        setValue("Tom");
    }

    return (
        <div>
            <input
                data-testid="myInput"
                value={currentValue}
                onChange={handleChange}
            />
            <Button onClick={handleChangeValueButtonClick}>
                Change Value To Tom
            </Button>
            <p>msg:{currentValue?.toString()}</p>
        </div>
    );
};

export const UseCurrentValueTest: UtilStory = {
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const myInput = canvas.getByTestId("myInput");
        const changeBtu = canvas.getByText("Change Value To Tom");

        await step(
            'Type "myInput" with "2233", then "msg:2233" to be in the document.',
            async () => {
                await userEvent.type(myInput, "2233");
                await expect(canvas.getByText("msg:2233")).toBeInTheDocument();
            }
        );

        await step(
            'Clear "myInput", then "msg:" to be in the document.',
            async () => {
                await userEvent.clear(myInput);
                await expect(canvas.getByText("msg:")).toBeInTheDocument();
            }
        );

        await step('Click "Change Value To Tom" button, then "msg:" to be in the document.', async () => {
            await userEvent.click(changeBtu);
            await expect(canvas.getByText("msg:Tom")).toBeInTheDocument();
        });

        await step(
            "getDefaultValueByDisplayName(ControlType.Slider) is 50.",
            async () => {
                await expect(
                    getDefaultValueByDisplayName(ControlType.Slider)
                ).toBe(50);
            }
        );
    },
};
