import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import { Button } from "@chakra-ui/button";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Avatar,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Spinner,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import ChatLoading from ".././ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { getSender } from "../../Config/ChatLogics";
import Effect from "react-notification-badge";
import NotificationBadge from "react-notification-badge/lib/components/NotificationBadge";
import ChatBot from "./ChatBot/ChatBot";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { setSelectedChat, notification, setNotification, chats, setChats } =
    ChatState();

  const { user } = ChatState();
  const history = useHistory();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        // bg="white"
        // bg="green.300"
        // bg="rgb(12, 165, 196)"
        // bg="#9EDDFF"
        // bg="#7091F5"
        // bg={"#75C2F6"}
        // bg="#4FC0D0"
        // bg="#0A6EBD"
        bg="#4477CE"
        // bg="#4477CE"
        // bg="#279EFF"
        // bg="#a7bcff"
        w="100%"
        p="10px 10px 10px 10px"
        // borderWidth="2px"
      >
        <Tooltip label="Search Users" hasArrow placement="bottom-end">
          <Button bg={"blue.100"} variant={"ghost"} onClick={onOpen}>
            <i class="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px={"4"}>
              Start New Chat
            </Text>
          </Button>
        </Tooltip>
        <Box
          bg={"#caf0f8"}
          borderRadius={"4px"}
          paddingLeft={"8px"}
          paddingRight={"8px"}
        >
          <Text color={"black"} fontSize="3xl" fontFamily={"Poppins"}>
            {/* Leafy */}
            BlinkChat
          </Text>
        </Box>
        <div>
          {/* <Button
            marginRight={"7px"}
            colorScheme="blackAlpha"
            variant="solid"
            onClick={openChatBot}
          >
            ChatBot
          </Button> */}

          {/* <Menu>
            <MenuButton
              marginLeft={"5px"}
              marginRight={"5px"}
              as={Button}
              rightIcon={<ChevronDownIcon></ChevronDownIcon>}
              px={4}
              py={2}
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="1px"
              bg={"cyan.400"}

              // _hover={{ bg: "gray.400" }}
              // _expanded={{ bg: "blue.200" }}
              // _focus={{ boxShadow: "outline" }}
            >
              ChatBot
            </MenuButton>
            <MenuList>
              <ChatBot />
            </MenuList>
          </Menu> */}

          <Menu>
            <MenuButton
              px={4}
              py={2}
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="1px"
              bg={"blue.100"}
              _hover={{ bg: "gray.400" }}
              _expanded={{ bg: "blue.200" }}
              _focus={{ boxShadow: "outline" }}
              p={"1"}
            >
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize={"2xl"} m={"1"} />
            </MenuButton>
            <MenuList pl={4}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton
              marginLeft={"5px"}
              as={Button}
              rightIcon={<ChevronDownIcon></ChevronDownIcon>}
              px={4}
              py={2}
              transition="all 0.2s"
              borderRadius="md"
              borderWidth="1px"
              bg={"blue.100"}
              _hover={{ bg: "gray.400" }}
              _expanded={{ bg: "blue.200" }}
              _focus={{ boxShadow: "outline" }}
            >
              {/* File <ChevronDownIcon /> */}
              <Avatar
                border={"1px"}
                size={"sm"}
                cursor={"pointer"}
                name={user.name}
                src={user.profilePicture}
              ></Avatar>
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider></MenuDivider>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
