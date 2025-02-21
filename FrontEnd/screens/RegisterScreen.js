import React, { useState } from "react";
import { View, TextInput, Button, Switch, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { 
  Container, 
  Title, 
  Input, 
  ConsentContainer, 
  ConsentText, 
  LinkText, 
  Logo 
} from "../components/StyledComponents";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState(""); // Nuevo input para nombre
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [consent, setConsent] = useState(false);

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Por favor, ingresa tu nombre.");
      return;
    }

    if (!email || !isValidEmail(email)) {
      Alert.alert("Error", "Por favor, ingresa un email válido.");
      return;
    }
    
    if (!password || password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    if (!consent) {
      Alert.alert("Error", "Debes aceptar los términos y condiciones.");
      return;
    }

    try {
      const response = await axios.post("http://192.168.100.6:3000/api/register", {
        name,  // 🔹 Ahora enviamos el nombre al backend
        email,
        password
      });

      Alert.alert("Éxito", response.data.message || "Registro exitoso");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error en el registro:", error);
      Alert.alert("Error", error.response?.data?.message || error.message || "Error desconocido");
    }
  };

  return (
    <Container>
      <Logo source={require("../assets/logo.jpg")} />
      <Title>Registro</Title>

      <Input 
        placeholder="Nombre" 
        value={name} 
        onChangeText={setName} 
        placeholderTextColor="gray" 
      />

      <Input 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address"
        placeholderTextColor="gray" 
      />

      <Input 
        placeholder="Contraseña" 
        secureTextEntry 
        value={password} 
        onChangeText={setPassword} 
        placeholderTextColor="gray" 
      />

      <Input 
        placeholder="Confirmar Contraseña" 
        secureTextEntry 
        value={confirmPassword} 
        onChangeText={setConfirmPassword} 
        placeholderTextColor="gray" 
      />

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
