/**
 * 可用状态
 */
export enum EnableState {
    disabled = "disabled",
    enabled = "enabled",
}

/**
 * 鼠标状态
 */
export enum MouseState {
    mouseup = "mouseup",
    mousedown = "mousedown",
    mouseover = "mouseover",
    mouseout = "mouseout",
    mousemove = "mousemove",
    none = "mousenone",
}

/**
 * 焦点状态
 */
export enum FocusState {
    focus = "focus",
    blur = "blur",
}

/**
 * UserControl类型
 */
export enum ControlType {
    Button = "Button",
    Checkbox = "Checkbox",
    Form = "Form",
    FormControl = "FormControl",
    FormLabel = "FormLabel",
    IconButton = "IconButton",
    Listbox = "Listbox",
    ListItem = "ListItem",
    Loading = "Loading",
    Radio = "Radio",
    Ripple = "Ripple",
    RippleFocus = "RippleFocus",
    RadioGroup = "RadioGroup",
    Summary = "Summary",
    Switch = "Switch",
    StackPanel = "StackPanel",
    Slider = "Slider",
    TextField = "TextField",
    Wave = "Wave",
}

/**
 * 位置
 */
export enum Placement {
    // 上边
    top = "placementTop",
    // 下边
    bottom = "placementBottom",
    // 左边
    left = "placementLeft",
    // 右边
    right = "placementRight",
}

/**
 * 形状
 */
export enum Shape {
    circle = "circle",
    rectangle = "rectangle",
}

/**
 * ChangeEvent状态
 */
export enum ChangeEventState {
    //默认状态
    Default = "Default",
    //用户输入
    UserInput = "UserInput",
    //
    DevSet = "DevSet",
}

/**
 * 勾选状态
 */
export enum CheckState {
    // 选中
    checked = "checked",
    // 未选中
    unChecked = "unChecked",
    // 不确定
    indeterminate = "indeterminate",
}

/**
 * TextField类型
 */
export enum TextFieldType {
    text = "text",
    password = "password",
}

/**
 * 定义控件或布局可以具有的不同方向。
 */
export enum Orientation {
    //垂直
    vertical = "vertical",
    // 水平
    horizontal = "horizontal",
}
