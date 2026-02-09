import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { ControlType } from "../../global/enum";
import { usePrevious } from "../../hooks/usePrevious";

import { ContentControlProps } from "./contentControl.types";

/**
 * value值不是undefined时，返回value值。否则返回defaultValue的值
 * @param value 控件的值（外部传入） {V}
 * @param defaultValue 控件的默认值（外部传入） {V}
 * @returns 计算之后的控件的值
 */
export function getCurrentValue<V>(
    value: V | undefined,
    defaultValue: V | undefined,
) {
    let current;
    if (value !== undefined) {
        current = value;
    } else {
        current = defaultValue;
    }

    return current;
}

/**
 * 如果没有设置DefaultValue，原生控件会有默认值。根据Litten控件displayName获取这个默认值
 * @param displayName Litten控件名称
 */
export function getDefaultValueByDisplayName(displayName: string) {
    let defaultValue;

    switch (displayName) {
        case ControlType.Slider:
            defaultValue = 50;
            break;
        default:
            defaultValue = "";
            break;
    }

    return defaultValue;
}

/**
 * 获取当前值和更新当前值的hook
 * @param props ContentControl组件的props
 * @returns 当前值和更新当前值的函数
 */
export function useCurrentValue<T, V>(props: ContentControlProps<T, V>) {
    const { value } = props;
    const prevValue = usePrevious(value);

    const [current, setCurrent] = useState<V | undefined>(value);

    useEffect(() => {
        if (prevValue !== value) {
            setCurrent(value);
        }
    }, [prevValue, value]);

    return [current, setCurrent] as [
        V | undefined,
        Dispatch<SetStateAction<V | undefined>>,
    ];
}
