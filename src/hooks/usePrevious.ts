import { useEffect, useRef } from "react";

/**
 * 保存前一个状态的值
 * @param value 要保存的值
 * @returns current 前一个状态的值 {T}
 */
export function usePrevious<T>(value: T) {
    const ref = useRef<T>();
    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}
