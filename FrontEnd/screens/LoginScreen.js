import React, { useState, useEffect, useRef } from "react";
import { View, Alert, TouchableOpacity, Animated, Easing, TextInput, Text, Image, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { login } from "../screens/_api";


const LoginScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

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
        Animated.timing(neonBorder, { toValue: 1, duration: 1200, useNativeDriver: false }),
        Animated.timing(neonBorder, { toValue: 0, duration: 1200, useNativeDriver: false }),
      ])
    ).start();
  }, []);

  const handleLogin = async () => {
    try {
      await login(name.trim(), password);
      Alert.alert("Éxito", "Inicio de sesión exitoso");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Error", error.message || "Algo salió mal");
    }
  };

  const handlePressIn = () => {
    Animated.spring(buttonScale, { toValue: 0.9, speed: 20, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, { toValue: 1, speed: 10, bounciness: 10, useNativeDriver: true }).start();
  };

  const interpolatedNeon = neonBorder.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0, 255, 255, 0.3)", "rgba(0, 255, 255, 1)"],
  });

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
        Inicio de Sesión
      </Animated.Text>

      <Animated.View
        style={{ borderWidth: 2, borderColor: interpolatedNeon, padding: 10, width: "80%", borderRadius: 8, marginVertical: 10 }}
      >
        <TextInput
          placeholder="Nombre"
          value={name}
          onChangeText={(text) => setName(text.trim())}
          placeholderTextColor="gray"
          autoCapitalize="words"
          style={{ color: "white", fontSize: 16 }}
        />
      </Animated.View>

      <Animated.View
        style={{ borderWidth: 2, borderColor: interpolatedNeon, padding: 10, width: "80%", borderRadius: 8, marginVertical: 10 }}
      >
        <TextInput
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="gray"
          style={{ color: "white", fontSize: 16 }}
        />
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          onPress={handleLogin}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={!name || !password}
          style={{
            backgroundColor: "cyan",
            paddingVertical: 16,
            paddingHorizontal: 32,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            opacity: name && password ? 1 : 0.5,
            ...(Platform.OS === "android"
              ? { elevation: 10 }
              : { shadowColor: "cyan", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 10 }),
          }}
        >
          <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={{ color: "white", marginTop: 10 }}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
