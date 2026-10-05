import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  SafeAreaView, 
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Gagal', 'Semua kolom harus diisi!');
      return;
    }

    setLoading(true);
    try {
      const existingUsersJson = await AsyncStorage.getItem('registered_users');
      const existingUsers = existingUsersJson ? JSON.parse(existingUsersJson) : [];

      const newUser = { username: username.trim(), email: email.trim(), password };
      existingUsers.push(newUser);

      await AsyncStorage.setItem('registered_users', JSON.stringify(existingUsers));

      setLoading(false);
      Alert.alert('Sukses', 'Akun berhasil dibuat! Silakan masuk.', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Gagal menyimpan akun.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0b1120" />
      <View style={styles.content}>
        
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#f8fafc" />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.title}>Daftar Akun Baru</Text>
          <Text style={styles.subtitle}>Buat akun untuk mulai bergabung di Esports Hub</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan username"
            placeholderTextColor="#64748b"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan email aktif"
            placeholderTextColor="#64748b"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan password"
            placeholderTextColor="#64748b"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity 
            style={styles.primaryBtn} 
            activeOpacity={0.8} 
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Daftar Sekarang</Text>}
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1120' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  backButton: { position: 'absolute', top: 20, left: 24 },
  headerContainer: { alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 24, fontWeight: '700', color: '#f8fafc', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#94a3b8', textAlign: 'center' },
  formCard: { backgroundColor: '#1e293b', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#334155' },
  label: { color: '#f8fafc', fontSize: 13, fontWeight: '600', marginBottom: 6 },
  input: { backgroundColor: '#0b1120', borderRadius: 10, borderWidth: 1, borderColor: '#334155', paddingHorizontal: 12, height: 46, color: '#fff', marginBottom: 14, fontSize: 14 },
  primaryBtn: { backgroundColor: '#2563eb', height: 46, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 14 }
});