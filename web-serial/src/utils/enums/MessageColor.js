import MessageAuthor from "./MessageAuthor";

const MessageColor = {
    [MessageAuthor.SELF]: "primary",
    [MessageAuthor.SERIAL]: "secondary",
    [MessageAuthor.COMMAND]: "teal",
};

export default MessageColor;
