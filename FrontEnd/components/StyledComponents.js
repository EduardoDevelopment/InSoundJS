import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

export const Title = styled.Text`
  color: white;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const Input = styled.TextInput`
  border-width: 1px;
  border-color: white;
  width: 250px;
  padding: 10px;
  margin-bottom: 15px;
  color: white;
  font-size: 18px;
`;

export const LinkText = styled.Text`
  color: red;
  margin-top: 10px;
  font-size: 16px;
`;

export const ConsentContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

export const ConsentText = styled.Text`
  color: white;
  margin-left: 10px;
`;

export const Logo = styled.Image`
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
`;
