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
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Gagal Login', 'Username dan Password tidak boleh kosong!');
      return;
    }

    setLoading(true);

    try {
      const registeredUsersJson = await AsyncStorage.getItem('registered_users');
      const registeredUsers = registeredUsersJson ? JSON.parse(registeredUsersJson) : [];

      const foundUser = registeredUsers.find(
        (u: any) => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
      );

      if (registeredUsers.length > 0 && !foundUser) {
        setLoading(false);
        Alert.alert('Login Gagal', 'Username atau Password salah! Silakan periksa kembali.');
        return;
      }

      await SecureStore.setItemAsync('user_session', 'active_token_123');
      const userProfile = { username: username.trim() };
      await AsyncStorage.setItem('user_profile', JSON.stringify(userProfile));

      router.replace('/');
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan sistem saat mencoba masuk.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0b1120" />
      <View style={styles.content}>
        
        <View style={styles.headerContainer}>
          <View style={styles.logoBadge}>
            <Ionicons name="game-controller" size={40} color="#38bdf8" />
          </View>
          <Text style={styles.title}>Esports Hub</Text>
          <Text style={styles.subtitle}>Masuk ke akun kamu untuk mulai bertanding</Text>
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
            style={styles.loginBtn} 
            activeOpacity={0.8} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.loginBtnText}>Masuk Sekarang</Text>}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.registerLink} 
            onPress={() => router.push('/register')}
          >
            <Text style={styles.registerText}>Belum punya akun? <Text style={styles.registerTextBold}>Daftar di sini</Text></Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1120' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  headerContainer: { alignItems: 'center', marginBottom: 32 },
  logoBadge: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#1e293b', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#334155', marginBottom: 16 },
  title: { fontSize: 26, fontWeight: '700', color: '#f8fafc', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#94a3b8', textAlign: 'center' },
  formCard: { backgroundColor: '#1e293b', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#334155' },
  label: { color: '#f8fafc', fontSize: 13, fontWeight: '600', marginBottom: 6 },
  input: { backgroundColor: '#0b1120', borderRadius: 10, borderWidth: 1, borderColor: '#334155', paddingHorizontal: 12, height: 46, color: '#fff', marginBottom: 14, fontSize: 14 },
  loginBtn: { backgroundColor: '#2563eb', height: 46, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 4 },
  loginBtnText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },
  registerLink: { marginTop: 16, alignItems: 'center' },
  registerText: { color: '#94a3b8', fontSize: 13 },
  registerTextBold: { color: '#38bdf8', fontWeight: '700' }
});