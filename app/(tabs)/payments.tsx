import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAppStore } from '@/store/useAppStore';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function PaymentsScreen() {
  const { user, payBill } = useAppStore();
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  if (!user) return null;

  const handlePayment = () => {
    if (user.debt === 0) {
      Alert.alert('Todo al día', 'No tienes deudas pendientes.');
      return;
    }
    if (cardNumber.length < 15 || expiry.length < 5 || cvv.length < 3) {
      Alert.alert('Datos inválidos', 'Por favor ingresa datos de tarjeta válidos simulados.');
      return;
    }

    // Simulate Payment
    Alert.alert(
      'Procesando Pago...',
      'Por favor espere.',
      [
        {
          text: 'Continuar',
          onPress: () => {
            payBill(user.debt); // Pay all
            setCardNumber('');
            setExpiry('');
            setCvv('');
            Alert.alert('Pago Exitoso', 'El pago fue procesado. Si el servicio estaba suspendido, ha sido reactivado automáticamente.');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Centro de Pagos</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Total a Pagar</Text>
        <Text style={[styles.summaryAmount, user.debt === 0 && styles.amountZero]}>
          ${user.debt}
        </Text>
        <Text style={styles.summarySubtitle}>
          {user.debt === 0 ? '¡Estás al día!' : 'Vencimiento: 5 de este mes'}
        </Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Método de Pago</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Número de Tarjeta</Text>
          <View style={styles.inputIconContainer}>
            <IconSymbol name="creditcard.fill" size={20} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.inputWithIcon}
              placeholder="0000 0000 0000 0000"
              keyboardType="numeric"
              maxLength={19}
              value={cardNumber}
              onChangeText={setCardNumber}
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
            <Text style={styles.label}>Vencimiento</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/AA"
              maxLength={5}
              value={expiry}
              onChangeText={setExpiry}
            />
          </View>
          <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
            <Text style={styles.label}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="123"
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry
              value={cvv}
              onChangeText={setCvv}
            />
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.payBtn, user.debt === 0 && styles.payBtnDisabled]} 
          onPress={handlePayment}
          disabled={user.debt === 0}
          activeOpacity={0.8}
        >
          <Text style={styles.payBtnText}>
            {user.debt === 0 ? 'Nada que pagar' : `Pagar $${user.debt}`}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: '#0056b3',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#0056b3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  summaryTitle: {
    color: '#e2e8f0',
    fontSize: 16,
    marginBottom: 8,
  },
  summaryAmount: {
    color: '#FFF',
    fontSize: 48,
    fontWeight: 'bold',
  },
  amountZero: {
    color: '#d1fae5', 
  },
  summarySubtitle: {
    color: '#cbd5e1',
    marginTop: 8,
  },
  formCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f8fafc',
  },
  inputIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    backgroundColor: '#f8fafc',
  },
  inputIcon: {
    padding: 12,
  },
  inputWithIcon: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  payBtn: {
    backgroundColor: '#28a745', // Success green
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  payBtnDisabled: {
    backgroundColor: '#9ca3af',
  },
  payBtnText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
