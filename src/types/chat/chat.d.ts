export interface ChatPayload {
    tag: string;
    patterns: string[];
    responses: string[];
}
export interface chatState {
    listchat: ChatPayload[];
    keyword: string;
}