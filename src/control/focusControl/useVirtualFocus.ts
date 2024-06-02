import { useEffect, useState } from "react";
import { LittenItems, SelectedValue } from "../userControl/userControl.types";

/** List keyboard */

function getListIndexByArrowUp(currentIndex: number, items: LittenItems) {
    let nextIndex = currentIndex;

    for (let index = currentIndex - 1; index >= 0; index--) {
        const item = items[index];
        const { disabled } = item;
        if (disabled !== true) {
            nextIndex = index;
            break;
        }
    }

    return nextIndex;
}

function getListIndexByArrowDown(currentIndex: number, items: LittenItems) {
    let nextIndex = currentIndex;

    for (let index = currentIndex + 1; index < items.length; index++) {
        const item = items[index];
        const { disabled } = item;
        if (disabled !== true) {
            nextIndex = index;
            break;
        }
    }

    return nextIndex;
}

function getListIndexByHome(items: LittenItems) {
    return items.findIndex((item) => item.disabled !== true);
}

function getListIndexByEnd(currentIndex: number, items: LittenItems) {
    let nextIndex = currentIndex;

    for (let index = items.length - 1; index >= 0; index--) {
        const item = items[index];
        const { disabled } = item;
        if (disabled !== true) {
            nextIndex = index;
            break;
        }
    }
    return nextIndex;
}

/** End List keyboard */

// function getGridIndexByArrowUp(){

// }

export function getNextListFocusIndex(
    currentIndex: number,
    items: LittenItems,
    key: string
) {
    let nextIndex = currentIndex;

    switch (key) {
        case "ArrowDown":
            nextIndex = getListIndexByArrowDown(currentIndex, items);
            break;
        case "ArrowUp":
            nextIndex = getListIndexByArrowUp(currentIndex, items);
            break;
        case "Home":
            nextIndex = getListIndexByHome(items);
            break;
        case "End":
            nextIndex = getListIndexByEnd(currentIndex, items);
            break;
    }

    return nextIndex;
}

function getLastSelectedValue(
    selectedValue?: SelectedValue,
    multiple?: boolean
) {
    let value: string | undefined;

    if (selectedValue === undefined) {
        value = undefined;
    } else {
        if (multiple === true) {
            const values = selectedValue as readonly string[];

            value = values[values.length - 1];
        } else {
            value = selectedValue as string;
        }
    }

    return value;
}

export function getLastSelectedIndex(
    items: LittenItems,
    selectedValue?: SelectedValue,
    multiple?: boolean
) {
    return items.findIndex(
        (item) => item.value === getLastSelectedValue(selectedValue, multiple)
    );
}

export const useVirtualFocus = (items: LittenItems) => {
    const [focusIndex, setFocusIndex] = useState<number>(-1);

    const [focusValue, setFocusValue] = useState<string | undefined>();

    useEffect(() => {
        setFocusIndex(items.findIndex((item) => item.value === focusValue));
    }, [items, focusValue]);

    return [focusIndex, focusValue, setFocusValue] as [
        number,
        string | undefined,
        React.Dispatch<React.SetStateAction<string | undefined>>,
    ];
};
