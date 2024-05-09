import { useState, FocusEvent } from "react";
import isFunction from "lodash/isFunction";

import { FocusControlProps } from "./focusControl.types";
import { FocusState } from "../../global/enum";

/**
 * 获取用户控件的focused属性对应的值，以及onFocus和onBlur的事件处理函数
 * @param props 用户控件属性
 */
export function useFocused<T>(props: FocusControlProps<T>) {
    const { onFocus, onBlur, onLabelMouseStateCheck } = props;

    const [focused, setFocused] = useState(false);

    function handleFocus(e: FocusEvent<T>) {
        if (
            isFunction(onLabelMouseStateCheck) &&
            onLabelMouseStateCheck() === true
        ) {
             // 避免点击label时，控件显示焦点样式。
            setFocused(true);
        } else {
            setFocused(true);
        }

        onFocus?.(e);
    }

    function handleBlur(e: FocusEvent<T>) {
        setFocused(false);
        onBlur?.(e);
    }

    return [focused, handleFocus, handleBlur] as [
        boolean,
        (e: FocusEvent<T>) => void,
        (e: FocusEvent<T>) => void,
    ];
}

/**
 * 通过focused的值，获取焦点状态
 * @param focused 控件是否获得焦点
 * @returns 焦点状态
 */
export function getStateByFocused(focused: boolean) {
    return focused === true ? FocusState.focus : FocusState.blur;
}
