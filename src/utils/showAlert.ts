import { message } from "antd";

export const showAlert = (
    type: "success" | "error" | "warning" | "info" | "loading",
    content: string,
    duration?: number,
    onClose?: () => void
) => {
    // duration: 0 means never close
    if (duration === undefined) {
        duration = 2;
    }
    switch (type) {
        case "success":
            message.success({
                content: content,
                duration,
            });
            break;
        case "error":
            message.error({
                content: content,
                duration,
            });
            break;
        case "warning":
            message.warning({
                content: content,
                duration,
            });
            break;
        case "info":
            message.info({
                content: content,
                duration,
            });
            break;
        case "loading":
            message.loading({
                content: content,
                duration,
            });
            break;
        default:
            message.info({
                content: content,
                duration,
            });
            break;
    }
};