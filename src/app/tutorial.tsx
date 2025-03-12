import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function Tutorial() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Como Funciona as Indicações</Text>

      <View style={styles.step}>
        <Text style={styles.stepTitle}>Passo 1: Cadastro</Text>
        <Text style={styles.stepDescription}>
          Para começar a indicar obras, você precisa se cadastrar no aplicativo. Insira seus dados pessoais, como CPF e telefone, para criar sua conta.
        </Text>
      </View>

      <View style={styles.step}>
        <Text style={styles.stepTitle}>Passo 2: Login</Text>
        <Text style={styles.stepDescription}>
          Após o cadastro, faça login no aplicativo usando seu CPF e telefone. Certifique-se de que os dados estão corretos para acessar sua conta.
        </Text>
      </View>

      <View style={styles.step}>
        <Text style={styles.stepTitle}>Passo 3: Acesso ao Painel</Text>
        <Text style={styles.stepDescription}>
          Depois de fazer login, você será direcionado ao painel principal. Aqui, você pode ver suas indicações e adicionar novas obras.
        </Text>
      </View>

      <View style={styles.step}>
        <Text style={styles.stepTitle}>Passo 4: Adicionar Nova Obra</Text>
        <Text style={styles.stepDescription}>
          Para adicionar uma nova obra, clique no botão "Adicionar Obra". Preencha os detalhes da obra, como nome do dono, localização e telefone. Você também pode adicionar imagens da obra.
        </Text>
      </View>

      <View style={styles.step}>
        <Text style={styles.stepTitle}>Passo 5: Enviar Indicação</Text>
        <Text style={styles.stepDescription}>
          Após preencher todos os detalhes, clique no botão "Enviar". Sua indicação será salva no sistema e você poderá acompanhar o status da obra no painel.
        </Text>
      </View>

      <View style={styles.step}>
        <Text style={styles.stepTitle}>Passo 6: Acompanhar Status</Text>
        <Text style={styles.stepDescription}>
          No painel principal, você pode acompanhar o status das suas indicações. As obras podem estar pendentes, aprovadas ou rejeitadas. Fique de olho nas atualizações!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  step: {
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
});