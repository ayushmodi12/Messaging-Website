import { React, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
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
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [profilePicture, setprofilePicture] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();
  const [profilePictureLoading, setprofilePictureLoading] = useState(false);

  const handleClick = () => setShow(!show);

  const { setUser } = ChatState();

  const postDetails = (pictures) => {
    // setprofilePictureLoading(true);
    if (pictures === undefined) {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
    }

    if (pictures.type === "image/jpeg" || pictures.type === "image/png") {
      const data = new FormData();
      data.append("file", pictures);
      data.append("upload_preset", "messaging-app");
      data.append("cloud_name", "dyvbezh4i");
      fetch("https://api.cloudinary.com/v1_1/dyvbezh4i/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setprofilePicture(data.url.toString());
          console.log(data);
          // setprofilePictureLoading(false);
        })
        .catch((err) => {
          console.log(err);
          // setprofilePictureLoading(false);
        });
    } else {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      // setprofilePictureLoading(false);
      return;
    }
  };

  const handleSubmit2 = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      toast({
        title: "The Passwords do not match",
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
        "/api/user",
        {
          name,
          email,
          password,
          profilePicture,
        },
        config
      );

      toast({
        title: "Registered Succesfully. Login using your registered credentials",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      // setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/");
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

  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
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
    if (password !== confirmPassword) {
      toast({
        title: "The Passwords do not match",
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
        "/api/user",
        {
          name,
          email,
          password,
          profilePicture,
        },
        config
      );

      toast({
        title: "Registered Succesfully",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      // setUser(data);
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
        <FormControl id="first-name">
          <FormLabel></FormLabel>
          <Input
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
          ></Input>
        </FormControl>
        <FormControl id="email">
          <FormLabel></FormLabel>
          <Input
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </FormControl>
        <FormControl id="password">
          <FormLabel></FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            ></Input>
            <InputRightElement width={"4.5em"}>
              <Button h="1.75em" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="confirmPassword">
          <FormLabel></FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Input>
            <InputRightElement width={"4.5em"}>
              <Button h="1.75em" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="profilePicture">
          <FormLabel>
            {/* Profile Picture */}
            <Text paddingLeft={"10px"} paddingTop="5px" fontFamily={"Poppins"}>
              Profile Picture (Optional)
            </Text>
          </FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/"
            onChange={(e) => postDetails(e.target.files[0])}
          ></Input>
        </FormControl>
        <Button
          marginTop={"15px"}
          colorScheme="teal"
          width="100%"
          border="2px"
          borderColor="green.500"
          onClick={handleSubmit2}
          isLoading={loading}
        >
          Register
        </Button>
      </VStack>
    </div>
  );
};

export default Register;
