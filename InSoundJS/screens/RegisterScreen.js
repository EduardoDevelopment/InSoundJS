import React, { useState } from "react";
import { View, TextInput, Button, Switch, TouchableOpacity, Alert } from "react-native";
import axios from "axios"; // Importamos axios
import { Container, Title, Input, ConsentContainer, ConsentText, LinkText, Logo } from "../components/StyledComponents";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [consent, setConsent] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || password !== confirmPassword || !consent) {
      Alert.alert("Error", "Por favor, completa todos los campos correctamente.");
      return;
    }

    try {
      const response = await axios.post("http://TU_IP_O_LOCALHOST:3000/api/register", {
        email,
        password
      });

      Alert.alert("Éxito", response.data.message);
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || "Hubo un problema con el registro.");
    }
  };

  return (
    <Container>
      <Logo source={require("../assets/logo.jpg")} />
      <Title>Registro</Title>
      <Input placeholder="Email" value={email} onChangeText={setEmail} placeholderTextColor="gray" />
      <Input placeholder="Contraseña" secureTextEntry value={password} onChangeText={setPassword} placeholderTextColor="gray" />
      <Input placeholder="Confirmar Contraseña" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} placeholderTextColor="gray" />
      <ConsentContainer>
        <Switch value={consent} onValueChange={setConsent} />
        <ConsentText>
          Acepto los{" "}
          <TouchableOpacity onPress={() => navigation.navigate("Terms")}>
            <LinkText>Términos y Condiciones</LinkText>
          </TouchableOpacity>
        </ConsentText>
      </ConsentContainer>
      <Button title="Registrarse" onPress={handleRegister} />
    </Container>
  );
};

export default RegisterScreen;
