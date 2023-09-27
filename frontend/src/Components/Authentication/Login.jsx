import { React, useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  LightMode,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [show, setShow] = useState(false);
  const toast = useToast();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const { setUser } = ChatState();

  const handleClick = () => setShow(!show);

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill up all the fields",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        config
      );

      toast({
        title: "Login Succesfull",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured",
        status: "warning",
        description: error.response.data.message,
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <VStack>
        <FormControl id="email-l">
          <FormLabel></FormLabel>
          <Input
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </FormControl>
        <FormControl id="password-l">
          <FormLabel></FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <InputRightElement width={"4.5em"}>
              <Button h="1.75em" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          marginTop={"15px"}
          colorScheme="teal"
          width="100%"
          border="2px"
          borderColor="green.500"
          onClick={handleSubmit}
          isLoading={loading}
        >
          Login
        </Button>
        <Button
          marginTop={"5px"}
          colorScheme="blue"
          width="100%"
          border="2px"
          borderColor="green.500"
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
          }}
        >
          Use Guest User Credentials
        </Button>
      </VStack>
    </div>
  );
};

export default Login;
