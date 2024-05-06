import React, { useState } from "react";
import { Container, VStack, Button, Input, List, ListItem, IconButton, useToast, Text, Box, Heading } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [events, setEvents] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const toast = useToast();

  const handleAddEvent = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "Error",
        description: "Event name can't be empty",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newEvents = [...events, inputValue];
    setEvents(newEvents);
    setInputValue("");
    toast({
      title: "Event Added",
      description: "Your event has been added successfully!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleDelete = (index) => {
    const newEvents = events.filter((_, i) => i !== index);
    setEvents(newEvents);
    toast({
      title: "Event Deleted",
      description: "The event has been deleted successfully!",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleEdit = (index) => {
    setInputValue(events[index]);
    setEditIndex(index);
  };

  const handleSaveEdit = () => {
    const newEvents = [...events];
    newEvents[editIndex] = inputValue;
    setEvents(newEvents);
    setEditIndex(-1);
    setInputValue("");
    toast({
      title: "Event Updated",
      description: "Your event has been updated successfully!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Heading>Event Manager</Heading>
        <Box width="100%" display="flex" alignItems="center">
          <Input placeholder="Enter event name" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          {editIndex === -1 ? (
            <IconButton aria-label="Add event" icon={<FaPlus />} ml={2} onClick={handleAddEvent} />
          ) : (
            <Button ml={2} onClick={handleSaveEdit}>
              Save
            </Button>
          )}
        </Box>
        <List width="100%">
          {events.map((event, index) => (
            <ListItem key={index} display="flex" justifyContent="space-between" alignItems="center" p={2} borderWidth="1px" borderRadius="lg">
              <Text>{event}</Text>
              <Box>
                <IconButton aria-label="Edit event" icon={<FaEdit />} mr={2} onClick={() => handleEdit(index)} />
                <IconButton aria-label="Delete event" icon={<FaTrash />} onClick={() => handleDelete(index)} />
              </Box>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
