import React, { useRef, useState } from "react";

import { fireEvent, within } from "@storybook/test";
import { UtilStory } from "../../stories/hooks.stories";

import { StackPanel } from "litten/dist/stackPanel";

import { useRelativePosition } from "../../control/userControl/userControl";
import { RelativeRect } from "../../control/userControl/userControl.types";

const Test = () => {
    const divRef = useRef<HTMLDivElement>(null);

    const [rect, setRect] = useState<RelativeRect | undefined>();

    const [startMeasure] = useRelativePosition(divRef, handleRectChange);

    function handleRectChange(rect: RelativeRect) {
        setRect(rect);
    }

    function handleDivMouseDown() {
        startMeasure();
    }

    return (
        <>
            <StackPanel justifyContent="center">
                <div
                    data-testid="container"
                    ref={divRef}
                    style={{
                        width: 300,
                        height: 300,
                        boxSizing: "border-box",
                        border: "1px solid orange",
                    }}
                    onMouseDown={handleDivMouseDown}
                ></div>
            </StackPanel>
            <div>{`left: ${rect?.left}`}</div>
            <div>{`right: ${rect?.right}`}</div>
            <div>{`top: ${rect?.top}`}</div>
            <div>{`bottom: ${rect?.bottom}`}</div>
            <div>{`targetWidth: ${rect?.targetWidth}`}</div>
            <div>{`targetHeight: ${rect?.targetHeight}`}</div>
        </>
    );
};

export const UseRelativePositionTest: UtilStory = {
    render: () => <Test />,
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const container = canvas.getByTestId("container");

        await fireEvent.mouseDown(container);
        await fireEvent.mouseMove(document);
        await fireEvent.mouseUp(document);
    },
};
