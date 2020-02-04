import React, { useState, useEffect } from "react";
import { FlatList, TouchableHighlight, View, Text, Image } from "react-native";
import axios from "axios";
import md5 from "js-md5";

import {
  Container,
  SearchBar,
  TitleGroup,
  Title,
  Subtitle,
  InputLabel,
  Input,
  Legend,
  LegendTitle,
  HeaderContainer,
  HeaderLogo,
  Loading
} from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";

const PUBLIC_KEY = "14cdb2d889dc27f7261069d16b434baa";
const PRIVATE_KEY = "dabee01260ea631bfc4fdfd2a257023a01249564";

export default function Home({ navigation }) {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (search != "") return;

    if (total && pageNumber > total) return;

    setLoading(true);

    const timestamp = Number(new Date());
    const hash = md5.create();
    hash.update(timestamp + PRIVATE_KEY + PUBLIC_KEY);

    let limit = 10;
    let offset = pageNumber * limit;

    const { data } = await axios.get(
      `https://gateway.marvel.com/v1/public/characters?offset=${offset}&limit=${limit}&ts=${timestamp}&orderBy=name&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`
    );

    setTotal(Math.floor(data.data.total / limit));
    setCharacters(
      shouldRefresh ? data.data.results : [...characters, ...data.data.results]
    );
    setPage(pageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    if (search === "") {
      loadPage(0, true);
    }
  }, [search]);

  useEffect(() => {
    loadPage();
  }, []);

  async function refreshList() {
    setRefreshing(true);
    await loadPage(0, true);
    setRefreshing(false);
  }

  function handleSearch(e) {
    setSearch(e);

    if (e.lenght <= 3) return;

    let text = e.toLowerCase();

    let filter = characters.filter(item => {
      if (item.name.toLowerCase().match(text)) {
        return item;
      }
    });

    setCharacters(filter);
  }

  function handleShowDetail(data) {
    //console.log(data);

    navigation.navigate("Detail", {
      data
    });
  }

  return (
    <Container>
      <SearchBar>
        <TitleGroup>
          <Title>BUSCA MARVEL</Title>
          <Subtitle>TESTE MOBILE</Subtitle>
        </TitleGroup>

        <InputLabel>Nome do Personagem</InputLabel>
        <Input
          onChangeText={handleSearch}
          keyboardType="web-search"
          placeholder="Ex: Iron Man"
        />
      </SearchBar>

      <FlatList
        data={characters}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.4}
        onRefresh={refreshList}
        refreshing={refreshing}
        ListFooterComponent={loading && <Loading />}
        ListHeaderComponent={() => (
          <Legend>
            <LegendTitle>Nome</LegendTitle>
          </Legend>
        )}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View style={{ flex: 1, height: 1, backgroundColor: "#d42026" }} />
        )}
        renderItem={({ item, index, separators }) => (
          <TouchableOpacity onPress={() => handleShowDetail(item)}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 12
              }}
            >
              <Image
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  marginVertical: 18,
                  backgroundColor: "#ccc"
                }}
                resizeMode="cover"
                source={{
                  uri: `${item.thumbnail.path}.${item.thumbnail.extension}`
                }}
              />
              <View style={{ marginLeft: 15 }}>
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                  {item.name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
}

Home.navigationOptions = () => ({
  headerTitle: () => (
    <HeaderContainer>
      <HeaderLogo />
    </HeaderContainer>
  )
});
