import styled from "styled-components/native";

import Marvel from "../../../assets/marvel.png";

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
  flex-direction: column;
`;

export const List = styled.FlatList.attrs({
  contentContainerStyle: { padding: 10 },
  showsVerticalScrollIndicator: false,
  shouldComponentUpdate: false,
  numColumns: 2
})``;

export const HeaderLogo = styled.Image.attrs({
  source: Marvel,
  resizeMode: "contain"
})``;

export const HeaderContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const SearchBar = styled.View`
  padding-left: 12;
  padding-right: 12;
  padding-bottom: 12;
  padding-top: 12;
`;

export const TitleGroup = styled.View`
  flex-direction: row;
`;

export const Title = styled.Text`
  color: #d42026;
  font-size: 16;
  line-height: 19;
  margin-bottom: 5;
  font-family: "Roboto-Black";
`;

export const Subtitle = styled.Text`
  color: #d42026;
  font-size: 16;
  line-height: 19;
  margin-bottom: 5;
  font-family: "Roboto-Light";
`;

export const InputLabel = styled.Text`
  color: #d42026;
  font-size: 14;
  line-height: 16;
  margin-bottom: 5;
  font-family: "Roboto-Regular";
`;

export const Input = styled.TextInput`
  color: #4e4e4e;
  font-size: 14;
  line-height: 16;
  font-family: "Roboto-Regular";
  border-color: #4e4e4e;
  border-width: 1;
  border-radius: 3;
  padding-left: 7;
  padding-right: 3;
  padding-bottom: 5;
  padding-top: 7;
`;

export const Legend = styled.View`
  background: #d42026;
  padding-left: 75;
  padding-bottom: 6;
  padding-top: 6;
`;

export const LegendTitle = styled.Text`
  color: #ffffff;
  font-family: "Roboto-Black";
  font-size: 16;
`;

export const Loading = styled.ActivityIndicator.attrs({
  size: "small",
  color: "#999"
})`
  margin: 30px 0;
`;
