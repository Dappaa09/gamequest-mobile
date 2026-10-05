import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('Player');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const profile = await AsyncStorage.getItem('user_profile');
      if (profile) {
        const parsed = JSON.parse(profile);
        if (parsed.username) setUsername(parsed.username);
      }
    } catch (error) {
      console.log('Gagal memuat profil');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0b1120" />
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#f8fafc" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profil Saya</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarCard}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person" size={50} color="#38bdf8" />
          </View>
          <Text style={styles.profileName}>{username}</Text>
          <Text style={styles.profileRole}>Pro Esports Player</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.sectionTitle}>Informasi Akun</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Status Akun</Text>
            <Text style={styles.infoValueActive}>Aktif & Terverifikasi</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Game Favorit</Text>
            <Text style={styles.infoValue}>MOBA / FPS / Fighting</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Sistem Keamanan</Text>
            <Text style={styles.infoValue}>SecureStore Active</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1120' },
  center: { justifyContent: 'center', alignItems: 'center' },
  headerBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#1e293b' },
  backBtn: { padding: 4 },
  headerTitle: { color: '#f8fafc', fontSize: 18, fontWeight: '700' },
  content: { padding: 20 },
  avatarCard: { alignItems: 'center', backgroundColor: '#1e293b', padding: 24, borderRadius: 16, borderWidth: 1, borderColor: '#334155', marginBottom: 20 },
  avatarCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#0b1120', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#334155', marginBottom: 12 },
  profileName: { color: '#f8fafc', fontSize: 20, fontWeight: '700', marginBottom: 4 },
  profileRole: { color: '#38bdf8', fontSize: 13, fontWeight: '600' },
  infoCard: { backgroundColor: '#1e293b', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#334155' },
  sectionTitle: { color: '#f8fafc', fontSize: 16, fontWeight: '700', marginBottom: 14 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#334155' },
  infoLabel: { color: '#94a3b8', fontSize: 14 },
  infoValue: { color: '#f8fafc', fontSize: 14, fontWeight: '600' },
  infoValueActive: { color: '#10b981', fontSize: 14, fontWeight: '600' }
});