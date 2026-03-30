import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAppStore, UserPlan } from '@/store/useAppStore';

const PLANS = [
  { name: 'Básico (50 Mbps)', price: 25 },
  { name: 'Familiar (100 Mbps)', price: 40 },
  { name: 'Ultra (300 Mbps)', price: 70 },
];

export default function LoginScreen() {
  const login = useAppStore((state) => state.login);
  const [name, setName] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<number>(1); // Index 1: Familiar by default

  const handleLogin = () => {
    if (!name.trim()) {
      alert('Por favor ingresa tu nombre.');
      return;
    }
    const plan = PLANS[selectedPlan];
    login(name, plan.name as UserPlan, plan.price);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>RedConnect</Text>
          <Text style={styles.subtitle}>Gestión de Servicios de Internet</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nombre del Titular:</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Juan Pérez"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />

          <Text style={[styles.label, { marginTop: 20 }]}>Selecciona un Plan:</Text>
          {PLANS.map((plan, index) => (
            <TouchableOpacity
              key={plan.name}
              style={[
                styles.planCard,
                selectedPlan === index && styles.planCardSelected,
              ]}
              onPress={() => setSelectedPlan(index)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.planName,
                selectedPlan === index && styles.planTextSelected
              ]}>{plan.name}</Text>
              <Text style={[
                styles.planPrice,
                selectedPlan === index && styles.planTextSelected
              ]}>${plan.price}/mes</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8}>
            <Text style={styles.loginButtonText}>Ingresar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC', // Light blue-gray background
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0056b3', // Corporate blue
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
  form: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#F8FAFC',
  },
  planCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
    backgroundColor: '#FFF',
  },
  planCardSelected: {
    borderColor: '#0056b3',
    backgroundColor: '#0056b3',
  },
  planName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  planPrice: {
    fontSize: 16,
    color: '#666',
  },
  planTextSelected: {
    color: '#FFF',
  },
  loginButton: {
    backgroundColor: '#0056b3',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
