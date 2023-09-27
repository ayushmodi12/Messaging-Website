// import { Avatar } from "@chakra-ui/avatar";
// import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
// import {
//   isLastMessage,
//   isSameSender,
//   isSameSenderMargin,
//   isSameUser,
// } from "../Config/ChatLogics";
// import { ChatState } from "../Context/ChatProvider";
import React from "react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../Config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import { Avatar, Tooltip } from "@chakra-ui/react";
// import moment from "moment-timezone";
// import {luxon} from "luxon";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  const getDate = (date) => {
    var d = date;
    const dat_var = new Date(d);
    return `${dat_var.toString().split(" ")[4].split(":")[0]}:${
      dat_var.toString().split(" ")[4].split(":")[1]
    }, ${d.toString().split("-")[2].split("T")[0]}/${d.toString().split("-")[1]}`;
  };

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            {/* <span
              style={{
                backgroundColor: "white",
                // marginLeft: isSameSenderMargin(messages, m, i, user._id),
                // marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            > <div>{
            `${Date(m.createdAt.toString()).split(" ")[1]} ${Date(m.createdAt.toString()).split(" ")[2]} ${Date(m.createdAt.toString()).split(" ")[3]} ${Date(m.createdAt.toString()).split(" ")[4]}`
            }</div>
            </span> */}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
            <div
              style={{
                fontSize: "10px",
                // display:"block",
                // backgroundColor: "white",
                // marginLeft:"10px",
                marginTop: "20px",
                // marginLeft: isSameSenderMargin(messages, m, i, user._id),
                // marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                // padding: "5px 2px",
                paddingLeft: "1px",
                paddingTop: "10px",
                maxWidth: "75%",
              }}
            >
              {/* <span> */}
              {
                // Date(m.createdtime.toString().toString())
                // `${dat_var}`
                // Date(m.createdtime)
                getDate(m.createdtime.toString())
                // Date('2020-01-14T17:43:37.000Z').toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})
                // m.createdtime.toString().toString()
                // DateTime.fromISO(m.createdtime.toString().toString())
                // `${m.createdtime.toString().toString().split("T")[0]} ${m.createdtime.toString().toString().split("T")[0]}`
                // `${Date( m.createdtime.toString().toString()).split(" ")[4]}, ${Date( m.createdtime.toString().toString()).split(" ")[1]} ${Date( m.createdtime.toString().toString()).split(" ")[2]}`
              }
              {/* </span> */}
            </div>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
