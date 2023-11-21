export interface ChatPayload {
    tag: string;
    patterns: string[];
    responses: string[];
}

export interface ChatResponse {
    intents: ChatPayload[];
}

export interface chatState {
    listchat: ChatPayload[];
    isFetching: boolean;
}