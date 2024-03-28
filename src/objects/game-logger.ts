export class GameLogger {
    private messages = new Array<string>();
    private lastMessage = "";

    log(message: string): void {
        this.messages.push(message);
        this.lastMessage = message;
    }

    insertDivider(): void {
        this.log("-------------------");
    }

    clear(): void {
        this.messages = new Array<string>();
        this.lastMessage = "";
    }

    getLastMessage(): string {
        return this.lastMessage;
    }

    getMessages(): Array<string> {
        return this.messages;
    }
}