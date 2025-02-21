import React, { useState } from "react";
import { View, TextInput, Button, TouchableOpacity } from "react-native";
import { Container, Title, Input, LinkText, Logo } from "../components/StyledComponents";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      <Logo source={require("../assets/logo.jpg")} />
      <Title>Login</Title>
      <Input placeholder="Email" value={email} onChangeText={setEmail} placeholderTextColor="gray" />
      <Input placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} placeholderTextColor="gray" />
      <Button title="Iniciar Sesión" onPress={() => navigation.navigate("Home")} disabled={!email || !password} />
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <LinkText>¿No tienes cuenta? Regístrate</LinkText>
      </TouchableOpacity>
    </Container>
  );
};

export default LoginScreen;
