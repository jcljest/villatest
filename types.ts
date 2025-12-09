export enum ContentType {
    TEXT = 'TEXT',
    CODE = 'CODE',
    IMAGE = 'IMAGE',
    TIP = 'TIP',
    WARNING = 'WARNING'
}

export interface ContentBlock {
    type: ContentType;
    content: string;
    language?: string; // For code blocks
    alt?: string; // For images
}

export interface Chapter {
    id: string;
    title: string;
    blocks: ContentBlock[];
}

export interface TerminalCommand {
    input: string;
    output: string;
    expected?: boolean; // If this is part of a challenge
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
    timestamp: number;
}
