import React, { ChangeEvent, useState } from "react";

import { userEvent, within, expect, waitFor } from "@storybook/test";
import { UtilStory } from "../../stories/hooks.stories";

import { Button } from "litten/dist/button";

import {
    setCheckedByGroupValue,
    useCurrentChecked,
} from "../../control/checkedControl/checkedControl";
import { ControlType } from "../../global/enum";
import { StackPanel } from "litten/dist/stackPanel";

const Test = () => {
    const [checked, setChecked] = useState<boolean | undefined>(undefined);

    const [currentChecked, setCurrentChecked, setOriginalEvent] =
        useCurrentChecked({
            checked,
            defaultChecked: false,
            controlType: ControlType.Checkbox,
        });

    const [
        currentAppleRadioChecked,
        setCurrentAppleRadioChecked,
        setAppleRadioOriginalEvent,
    ] = useCurrentChecked<HTMLInputElement>({
        checked,
        value: "apple",
        name: "fruit",
        defaultChecked: false,
        controlType: ControlType.Radio,
    });

    const [
        currentPitayaRadioChecked,
        setCurrentPitayaRadioChecked,
        setPitayRaadioOriginalEvent,
    ] = useCurrentChecked<HTMLInputElement>({
        checked,
        value: "pitaya",
        name: "fruit",
        defaultChecked: false,
        controlType: ControlType.Radio,
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setOriginalEvent(e);
        setCurrentChecked(e.target.checked);
    }

    function handleAppleRadioChange(e: ChangeEvent<HTMLInputElement>) {
        setAppleRadioOriginalEvent(e);
        setCurrentAppleRadioChecked(e.target.checked);
    }

    function handlePitayaRadioChange(e: ChangeEvent<HTMLInputElement>) {
        setPitayRaadioOriginalEvent(e);
        setCurrentPitayaRadioChecked(e.target.checked);
    }

    function handleChangeValueButtonClick() {
        setChecked(true);
    }

    return (
        <div>
            <label>
                fruit
                <input
                    type="checkbox"
                    data-testid="fruitCheckbox"
                    checked={currentChecked}
                    onChange={handleChange}
                />
            </label>
            <StackPanel
                direction="column"
                alignItems="flex-start"
                style={{ marginTop: "10px" }}
            >
                <label>
                    <input
                        type="radio"
                        name="fruit"
                        data-testid="apple"
                        checked={currentAppleRadioChecked}
                        value="apple"
                        onChange={handleAppleRadioChange}
                    />
                    apple
                </label>
                <label>
                    <input
                        type="radio"
                        name="fruit"
                        data-testid="pitaya"
                        checked={currentPitayaRadioChecked}
                        value="pitaya"
                        onChange={handlePitayaRadioChange}
                    />
                    pitaya
                </label>
            </StackPanel>
            <Button onClick={handleChangeValueButtonClick}>
                Checked Fruit
            </Button>
            <p>msg:{currentChecked?.toString()}</p>
        </div>
    );
};

export const UseCurrentCheckedTest: UtilStory = {
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const fruitCheckbox = canvas.getByTestId("fruitCheckbox");
        const checkedBtu = canvas.getByText("Checked Fruit");
        const appleRadio = canvas.getByTestId("apple");
        const pitayaRadio = canvas.getByTestId("pitaya");

        await step('Click "fruit" checkbox, then "msg:true" to be in the document.', async () => {
            await userEvent.click(fruitCheckbox);
            await expect(canvas.getByText("msg:true")).toBeInTheDocument();
        });

        await step('Click "fruit" checkbox, then "msg:false" to be in the document.', async () => {
            await userEvent.click(fruitCheckbox);
            await expect(canvas.getByText("msg:false")).toBeInTheDocument();
        });

        await step('Click "Checked Fruit" button then "msg:false" to be in the document.', async () => {
            await userEvent.click(checkedBtu);
            await expect(canvas.getByText("msg:true")).toBeInTheDocument();
        });

        await step(
            'Click "apple" radio, then "pitaya" is unchecked.',
            async () => {
                await userEvent.click(appleRadio);
                await expect(pitayaRadio).not.toBeChecked();
            }
        );

        await step(
            'setCheckedByGroupValue("fruit",ControlType.Radio,"pitaya"),then "pitaya" is checked.',
            async () => {
                await setCheckedByGroupValue(
                    "fruit",
                    ControlType.Radio,
                    "pitaya"
                );

                await waitFor(() => expect(pitayaRadio).toBeChecked());
            }
        );
    },
};
