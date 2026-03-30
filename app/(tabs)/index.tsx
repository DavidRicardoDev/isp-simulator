import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function DashboardScreen() {
  const { user, logout } = useAppStore();
  const router = useRouter();

  if (!user) return null;

  const isActive = user.status === 'ACTIVE';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hola,</Text>
          <Text style={styles.name}>{user.name}</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <IconSymbol name="rectangle.portrait.and.arrow.right" size={24} color="#dc3545" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Estado del Servicio</Text>
          <View style={[styles.badge, isActive ? styles.badgeActive : styles.badgeSuspended]}>
            <Text style={styles.badgeText}>{isActive ? 'ACTIVO' : 'SUSPENDIDO'}</Text>
          </View>
        </View>

        {!isActive && (
          <View style={styles.alertBox}>
            <IconSymbol name="exclamationmark.triangle.fill" size={24} color="#dc3545" />
            <Text style={styles.alertText}>
              Su servicio se encuentra suspendido por falta de pago.
            </Text>
          </View>
        )}

        <View style={styles.detailRow}>
          <Text style={styles.label}>Plan Contratado:</Text>
          <Text style={styles.value}>{user.plan}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Costo Mensual:</Text>
          <Text style={styles.value}>${user.monthlyCost}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Deuda Actual:</Text>
          <Text style={[styles.value, user.debt > 0 && styles.debtValue]}>
            ${user.debt}
          </Text>
        </View>

        {user.debt > 0 && (
          <TouchableOpacity
            style={styles.payButton}
            onPress={() => router.push('/payments')}
            activeOpacity={0.8}
          >
            <Text style={styles.payButtonText}>Pagar Ahora</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.featuresTitleContainer}>
        <Text style={styles.featuresTitle}>Mi Conexión</Text>
      </View>
      
      <View style={styles.grid}>
        <View style={styles.gridItem}>
          <IconSymbol name="wifi" size={32} color="#0056b3" />
          <Text style={styles.gridItemText}>Test de Velocidad</Text>
        </View>
        <View style={styles.gridItem}>
          <IconSymbol name="arrow.clockwise.circle.fill" size={32} color="#0056b3" />
          <Text style={styles.gridItemText}>Reiniciar Router</Text>
        </View>
        <View style={styles.gridItem}>
          <IconSymbol name="headphones" size={32} color="#0056b3" />
          <Text style={styles.gridItemText}>Soporte Técnico</Text>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  greeting: {
    fontSize: 18,
    color: '#666',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0056b3',
  },
  logoutBtn: {
    padding: 8,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#0056b3',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 32,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeActive: {
    backgroundColor: '#d1fae5',
  },
  badgeSuspended: {
    backgroundColor: '#fee2e2',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#059669', // text-green-600
  },
  alertBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  alertText: {
    color: '#dc3545',
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  debtValue: {
    color: '#dc3545',
  },
  payButton: {
    backgroundColor: '#0056b3',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  featuresTitleContainer: {
    marginBottom: 16,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '30%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  gridItemText: {
    marginTop: 8,
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
});
