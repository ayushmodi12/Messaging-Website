import { React, useEffect, useState } from "react";
import { Container, Box, Text, useColorModeValue } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../Components/Authentication/Login";
import Register from "../Components/Authentication/Register";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const HomePage = () => {
  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      history.push("/chats");
    }
  }, [history]);

  const colors = useColorModeValue(
    ["teal.50", "blue.50"],
    ["teal.900", "blue.900"]
  );
  const [tabIndex, setTabIndex] = useState(0);
  const bg = colors[tabIndex];
  return (
    <Container maxW="xl" centercontent="true">
      <Box
        d="flex"
        p={3}
        bg={"white"}
        w={"100%"}
        m={"40px 0 15px 0"}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Text textAlign={"center"} fontSize={"4xl"} fontFamily={"Poppins"}>
          {/* Chutes */}
          {/* Shoots */}
          {/* Chirpings */}
          {/* Courier */}
          {/* Stems */}
          {/* Chirp-Leaf */}
          Leafy
          {/* Birdy */}
          {/* Birdlet */}
          {/* Lilypad */}
          {/* Leafpad */}
          {/* Turtle */}
          {/* Leaves */}
          {/* Leaf */}
        </Text>
      </Box>
      <Box bg="white" w="100%" p="4" borderRadius={"lg"} borderWidth={"1px"}>
        <Tabs onChange={(index) => setTabIndex(index)} bg={bg}>
          <TabList>
            <Tab w={"50%"}>Login</Tab>
            <Tab w={"50%"}>Register</Tab>
          </TabList>
          <TabPanels p="2rem">
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
