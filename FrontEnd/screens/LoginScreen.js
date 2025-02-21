import React, { useState } from "react";
import { View, Alert, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Cambio importante
import { login } from "../screens/_api";
import { Container, Title, Input, LinkText, Logo } from "../components/StyledComponents";

const LoginScreen = () => {
  const navigation = useNavigation(); // Cambio importante
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email.trim(), password);
      Alert.alert("Éxito", "Inicio de sesión exitoso");
      navigation.navigate("Home"); // Cambio importante
    } catch (error) {
      Alert.alert("Error", error.message || "Algo salió mal");
    }
  };

  return (
    <Container>
      <Logo source={require("../assets/logo.jpg")} />
      <Title>Login</Title>

      <Input 
        placeholder="Email" 
        value={email} 
        onChangeText={(text) => setEmail(text.trim())} // Mejora
        placeholderTextColor="gray" 
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Input 
        placeholder="Contraseña" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
        placeholderTextColor="gray" 
      />

      <Button 
        title="Iniciar Sesión" 
        onPress={handleLogin} 
        disabled={!email || !password} 
        color="#2196F3"
      />

      <TouchableOpacity onPress={() => navigation.navigate("Register")}> 
        <LinkText>¿No tienes cuenta? Regístrate</LinkText>
      </TouchableOpacity>
    </Container>
  );
};

export default LoginScreen;
