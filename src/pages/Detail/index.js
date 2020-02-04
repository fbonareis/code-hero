import React, { useState, useEffect } from "react";

import { Container, Group, Title, List, Label } from "./styles";

export default function Detail({ navigation }) {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    setCharacter(navigation.getParam("data"));

    console.log(navigation.getParam("data"));
  }, []);

  return (
    <Container>
      <Group>
        <Title>Comics</Title>
        <List>
          {character?.comics.items.map(item => (
            <Label>{item.name}</Label>
          ))}
        </List>
      </Group>

      <Group>
        <Title>Series</Title>
        <List>
          {character?.series.items.map(item => (
            <Label>{item.name}</Label>
          ))}
        </List>
      </Group>

      <Group>
        <Title>Stories</Title>
        <List>
          {character?.stories.items.map(item => (
            <Label>{item.name}</Label>
          ))}
        </List>
      </Group>

      <Group>
        <Title>Events</Title>
        <List>
          {character?.events.items.map(item => (
            <Label>{item.name}</Label>
          ))}
        </List>
      </Group>
    </Container>
  );
}

Detail.navigationOptions = ({ navigation }) => ({
  headerTitle: navigation.getParam("data").name
});
