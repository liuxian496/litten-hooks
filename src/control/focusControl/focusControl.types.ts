import { FocusEvent } from "react";

import { UserControlProps } from "../userControl/userControl.types";

export interface FocusControlProps<T = Element> extends UserControlProps {
    /**
     * 设置元素是否可以聚焦
     */
    tabIndex?: number;
    /**
     *
     * @returns void
     */
    onFocus?: (e: FocusEvent<T>) => void;
    /**
     *
     * @returns void
     */
    onBlur?: (e: FocusEvent<T>) => void;
    onLabelMouseStateCheck?: () => boolean;
}
