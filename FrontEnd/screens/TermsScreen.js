import React from "react";
import { ScrollView } from "react-native";
import { Container, Title, ConsentText } from "../components/StyledComponents";

const TermsScreen = () => (
  <Container>
    <Title>Términos y Condiciones</Title>
    <ScrollView>
      <ConsentText>
        1. Aceptas que la información proporcionada será almacenada de manera segura.
        {"\n\n"}2. No compartiremos tus datos con terceros sin tu consentimiento.
        {"\n\n"}3. Nos reservamos el derecho de modificar estos términos sin previo aviso.
      </ConsentText>
    </ScrollView>
  </Container>
);

export default TermsScreen;
