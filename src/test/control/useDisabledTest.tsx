import React, { useState } from "react";

import { userEvent, within, expect } from "@storybook/test";
import { UtilStory } from "../../stories/hooks.stories";

import { StackPanel } from "litten/dist/stackPanel";
import { FormLabel } from "litten/dist/formLabel";
import { Checkbox } from "litten/dist/checkbox";
import { Placement } from "litten/dist/enum";

import { useDisabled } from "../../control/disabledControl/disabledControl";
import { LittenCheckedChangeEvent } from "../../control/event/littenEvent.types";

const Test = () => {
    const [disabled, setDisabled] = useState<boolean | undefined>(false);
    const [loading, setLoading] = useState<boolean | undefined>(false);

    const currentDisabled = useDisabled({
        disabled: disabled,
        loading: loading,
    });

    function handleDisableCheckboxChange(event: LittenCheckedChangeEvent) {
        const { checked } = event;
        setDisabled(checked);
    }

    function handleLoadingCheckboxChange(event: LittenCheckedChangeEvent) {
        const { checked } = event;
        setLoading(checked);
    }

    return (
        <div>
            <StackPanel direction="column" alignItems="flex-start">
                <FormLabel label="Disabled" labelPlacement={Placement.right}>
                    <Checkbox
                        data-testid="disabled-checkbox"
                        checked={disabled}
                        onChange={handleDisableCheckboxChange}
                    />
                </FormLabel>
                <FormLabel label="Loading" labelPlacement={Placement.right}>
                    <Checkbox
                        data-testid="loading-checkbox"
                        checked={loading}
                        onChange={handleLoadingCheckboxChange}
                    />
                </FormLabel>
            </StackPanel>
            <p>msg:{currentDisabled?.toString()}</p>
        </div>
    );
};

export const UseDisabledTest: UtilStory = {
    render: () => <Test />,
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);

        const DisabledCheckbox = canvas.getByTestId("disabled-checkbox");
        const LoadingCheckbox = canvas.getByTestId("loading-checkbox");

        await step('"msg:false" to be in the document.', async () => {
            await expect(canvas.getByText("msg:false")).toBeInTheDocument();
        });

        await step(
            'Checked "Loading" checkbox, then "msg:true" to be in the document.',
            async () => {
                await userEvent.click(LoadingCheckbox);

                await expect(canvas.getByText("msg:true")).toBeInTheDocument();
            }
        );

        await step(
            'Checked "Disabled" checkbox, then "msg:true" to be in the document.',
            async () => {
                await userEvent.click(DisabledCheckbox);

                await expect(canvas.getByText("msg:true")).toBeInTheDocument();
            }
        );

        await step(
            'UnChecked "Loading" checkbox, then "msg:true" to be in the document.',
            async () => {
                await userEvent.click(LoadingCheckbox);

                await expect(canvas.getByText("msg:true")).toBeInTheDocument();
            }
        );

        await step(
            'UnChecked "Disabled" checkbox, then "msg:false" to be in the document.',
            async () => {
                await userEvent.click(DisabledCheckbox);

                await expect(canvas.getByText("msg:false")).toBeInTheDocument();
            }
        );
    },
};
