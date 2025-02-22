import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const fadeIn = useRef(new Animated.Value(0)).current;
  const slideIn = useRef(new Animated.Value(-width)).current;
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(slideIn, {
        toValue: 0,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start(),
    ]).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "black" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20, marginTop: 40 }}>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => navigation.navigate("CloseDelete")} style={{ position: "absolute", right: 20, top: 20 }}> 
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <Ionicons name="settings" size={32} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center", paddingVertical: 60 }}>
        <Animated.Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "white",
            opacity: fadeIn,
            textAlign: "center"
          }}
        >
          Bienvenido a IN SOUND
        </Animated.Text>
      </View>
      
      <Animated.View style={{ padding: 20, transform: [{ translateX: slideIn }] }}>
        <Text style={{ fontSize: 20, color: "white", marginBottom: 10, textAlign: "center" }}>
          🎶 Disfruta de la mejor experiencia en eventos y sonido.
        </Text>
        <Text style={{ fontSize: 16, color: "gray", marginBottom: 20, textAlign: "center" }}>
          Desde conciertos hasta eventos privados, IN SOUND ofrece la mejor calidad en audio y producción.
        </Text>
      </Animated.View>

      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "cyan" }}>🔥 Lo que ofrecemos 🔥</Text>
      </View>
      
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, color: "white", marginBottom: 10 }}>✅ Sonido profesional para eventos</Text>
        <Text style={{ fontSize: 18, color: "white", marginBottom: 10 }}>✅ Iluminación espectacular</Text>
        <Text style={{ fontSize: 18, color: "white" }}>✅ DJs y producción de música en vivo</Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
