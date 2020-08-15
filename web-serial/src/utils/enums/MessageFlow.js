import MessageAuthor from "./MessageAuthor";

const SENT = "Sent";
const RECEIVED = "Received";

const MessageFlow = {
    [MessageAuthor.SELF]: SENT,
    [MessageAuthor.SERIAL]: RECEIVED,
    [MessageAuthor.COMMAND]: SENT,
};

export default MessageFlow;
