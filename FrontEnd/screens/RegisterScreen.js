import React, { useState, useEffect, useRef } from "react";
import { View, Alert, TouchableOpacity, Animated, Easing, TextInput, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { register } from "../screens/_api";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Animaciones
  const titleAnim = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const neonBorder = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(titleAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();

    Animated.spring(logoScale, {
      toValue: 1,
      friction: 5,
      tension: 80,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(neonBorder, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: false,
        }),
        Animated.timing(neonBorder, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const handleRegister = async () => {
    if (!termsAccepted) {
      Alert.alert("Error", "Debes aceptar los términos y condiciones");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }
    try {
      await register(name.trim(), email.trim(), password);
      Alert.alert("Éxito", "Registro exitoso");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Error", error.message || "Algo salió mal");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
      <Animated.View style={{ transform: [{ scale: logoScale }] }}>
        <Image source={require("../assets/logo.jpg")} style={{ width: 120, height: 120, borderRadius: 20 }} />
      </Animated.View>

      <Animated.Text
        style={{
          fontSize: 26,
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          opacity: titleAnim,
          transform: [{ translateY: titleAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
        }}
      >
        Registro
      </Animated.Text>

      {/* Campos de entrada */}
      {[{ placeholder: "Nombre", value: name, onChangeText: setName },
        { placeholder: "Email", value: email, onChangeText: setEmail, keyboardType: "email-address", autoCapitalize: "none" },
        { placeholder: "Contraseña", value: password, onChangeText: setPassword, secureTextEntry: true },
        { placeholder: "Confirmar Contraseña", value: confirmPassword, onChangeText: setConfirmPassword, secureTextEntry: true },
      ].map((input, index) => (
        <Animated.View
          key={index}
          style={{
            borderWidth: 2,
            borderColor: "cyan",
            padding: 10,
            width: "80%",
            borderRadius: 8,
            marginVertical: 10,
          }}
        >
          <TextInput
            {...input}
            placeholderTextColor="gray"
            style={{ color: "white", fontSize: 16 }}
          />
        </Animated.View>
      ))}

      {/* Botón para aceptar términos y condiciones */}
      <TouchableOpacity
        onPress={() => setTermsAccepted(!termsAccepted)}
        style={{
          backgroundColor: termsAccepted ? "green" : "gray",
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 8,
          marginTop: 15,
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          {termsAccepted ? "Términos Aceptados" : "Aceptar Términos"}
        </Text>
      </TouchableOpacity>

      {/* Botón para ver términos y condiciones */}
      <TouchableOpacity onPress={() => navigation.navigate("Terms")}>
        <Text style={{ color: "cyan", textDecorationLine: "underline", marginTop: 10 }}>
          Ver Términos y Condiciones
        </Text>
      </TouchableOpacity>

      {/* Botón de registro */}
      <Animated.View style={{ transform: [{ scale: buttonScale }], marginTop: 20 }}>
        <TouchableOpacity
          onPress={handleRegister}
          disabled={!name || !email || !password || !confirmPassword || !termsAccepted}
          style={{
            backgroundColor: termsAccepted ? "cyan" : "gray",
            paddingVertical: 16,
            paddingHorizontal: 32,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            opacity: name && email && password && confirmPassword && termsAccepted ? 1 : 0.5,
            shadowColor: "cyan",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.7,
            shadowRadius: 10,
          }}
        >
          <Text style={{ color: "#000", fontSize: 18, fontWeight: "bold" }}>Registrarse</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default RegisterScreen;
