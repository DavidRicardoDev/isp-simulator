import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAppStore } from '@/store/useAppStore';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function AdminScreen() {
  const { user, forceNextMonth } = useAppStore();

  if (!user) return null;

  const handleSimulateMonth = () => {
    Alert.alert(
      'Simular Paso del Tiempo',
      '¿Deseas adelantar 1 mes? Esto generará una factura impaga por el valor de su plan actual, y si tiene deudas, suspenderá su servicio automáticamente.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sí, Adelantar', 
          style: 'destructive',
          onPress: () => {
            forceNextMonth();
            Alert.alert('Mes finalizado', `Se ha generado una nueva factura por $${user.monthlyCost}.`);
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Herramientas de Simulación</Text>
      
      <View style={styles.warningBox}>
        <IconSymbol name="exclamationmark.triangle.fill" size={24} color="#856404" />
        <Text style={styles.warningText}>
          Esta pantalla es solo para demostración. Permite forzar el comportamiento del sistema.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Simulador de Tiempo</Text>
        <Text style={styles.cardDesc}>
          Adelanta 1 mes en el tiempo para ver cómo el sistema reacciona automáticamente a la falta de pagos.
        </Text>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleSimulateMonth} activeOpacity={0.8}>
          <IconSymbol name="calendar.badge.clock" size={24} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.actionButtonText}>Avanzar 1 Mes</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Información Interna</Text>
        <Text style={styles.debugText}>ID de usuario: {user.id}</Text>
        <Text style={styles.debugText}>Estado actual: {user.status}</Text>
        <Text style={styles.debugText}>Deuda: ${user.debt}</Text>
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
  warningBox: {
    flexDirection: 'row',
    backgroundColor: '#fff3cd',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffeeba',
    alignItems: 'center',
    marginBottom: 24,
  },
  warningText: {
    flex: 1,
    color: '#856404',
    marginLeft: 12,
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  cardDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 22,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#dc3545',
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  debugText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    backgroundColor: '#f1f5f9',
    padding: 8,
    borderRadius: 6,
  },
});
