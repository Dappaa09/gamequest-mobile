import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator, SafeAreaView, StatusBar, TextInput, Modal, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('Player');
  const [selectedCategory, setSelectedCategory] = useState('All Games');

  const [modalVisible, setModalVisible] = useState(false);
  const [activeTournament, setActiveTournament] = useState('');
  const [teamName, setTeamName] = useState('');
  const [gameId, setGameId] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const session = await SecureStore.getItemAsync('user_session');
      if (!session) {
        router.replace('/login');
        return;
      }
      const profile = await AsyncStorage.getItem('user_profile');
      if (profile) {
        const parsed = JSON.parse(profile);
        if (parsed.username) setUsername(parsed.username);
      }
    } catch (error) {
      router.replace('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert('Logout', 'Apakah kamu yakin ingin keluar?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Keluar',
        style: 'destructive',
        onPress: async () => {
          await SecureStore.deleteItemAsync('user_session');
          await AsyncStorage.removeItem('user_profile');
          router.replace('/login');
        },
      },
    ]);
  };

  const openRegisterModal = (namaTurnamen: string) => {
    setActiveTournament(namaTurnamen);
    setTeamName('');
    setGameId('');
    setWhatsapp('');
    setModalVisible(true);
  };

  const submitTournamentRegistration = () => {
    if (!teamName.trim() || !gameId.trim() || !whatsapp.trim()) {
      Alert.alert('Form Belum Lengkap', 'Harap isi Nama Tim, Game ID / UID, dan Nomor WhatsApp!');
      return;
    }

    setModalVisible(false);
    Alert.alert(
      'Pendaftaran Berhasil! 🎉', 
      `Tim "${teamName}" berhasil terdaftar di ${activeTournament}. Panitia akan menghubungi via WhatsApp.`
    );
  };

  const tournamentsData = [
    {
      id: '1',
      category: 'MOBA',
      title: 'MLBB National Championship 2026',
      date: '15 Oktober 2026',
      prize: 'Rp 50.000.000',
      isHot: true,
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: '2',
      category: 'MOBA',
      title: 'Honor of Kings Regional War',
      date: '22 Oktober 2026',
      prize: 'Rp 25.000.000',
      isHot: false,
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: '3',
      category: 'FPS / Battle Royale',
      title: 'Valorant Community Cup Season 4',
      date: '18 Oktober 2026',
      prize: 'Rp 30.000.000',
      isHot: true,
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: '4',
      category: 'FPS / Battle Royale',
      title: 'PUBG Mobile Freedom Tournament',
      date: '25 Oktober 2026',
      prize: 'Rp 40.000.000',
      isHot: false,
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: '5',
      category: 'Fighting',
      title: 'Tekken 8 Ultimate Showdown',
      date: '20 Oktober 2026',
      prize: 'Rp 15.000.000',
      isHot: true,
      image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: '6',
      category: 'Fighting',
      title: 'Street Fighter 6 Local Brawl',
      date: '28 Oktober 2026',
      prize: 'Rp 10.000.000',
      isHot: false,
      image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=600&auto=format&fit=crop',
    },
  ];

  const filteredTournaments = selectedCategory === 'All Games' 
    ? tournamentsData 
    : tournamentsData.filter((item) => item.category === selectedCategory);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0b1120" />
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userSection}>
            <Text style={styles.greeting}>Selamat Datang,</Text>
            <Text style={styles.username}>{username}</Text>
          </View>
          
          <View style={styles.headerActionRow}>
            <TouchableOpacity 
              style={styles.profileNavBtn} 
              activeOpacity={0.7}
              onPress={() => router.push('/profile')}
            >
              <Ionicons name="person-outline" size={16} color="#38bdf8" />
              <Text style={styles.profileNavText}>Profil</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.logoutBtn} 
              activeOpacity={0.7}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={16} color="#ef4444" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Banner */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Temukan Match & Kuasai Arena!</Text>
          <Text style={styles.heroDesc}>
            Ikuti turnamen esports bergengsi. Kumpulkan poin, raih posisi puncak leaderboard, dan menangkan total hadiah jutaan rupiah!
          </Text>
        </View>

        {/* Kategori Game */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kategori Game</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
            {['All Games', 'MOBA', 'FPS / Battle Royale', 'Fighting'].map((cat) => (
              <TouchableOpacity
                key={cat}
                activeOpacity={0.7}
                style={[styles.categoryBadge, selectedCategory === cat && styles.categoryActive]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Daftar Turnamen dengan Banner Gambar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === 'All Games' ? 'Semua Turnamen' : `Turnamen ${selectedCategory}`}
          </Text>

          {filteredTournaments.length === 0 ? (
            <Text style={styles.emptyText}>Belum ada turnamen untuk kategori ini.</Text>
          ) : (
            filteredTournaments.map((item) => (
              <View key={item.id} style={styles.tournamentCard}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.image }} style={styles.cardImage} />
                  {item.isHot && (
                    <View style={styles.hotBadgeContainer}>
                      <Ionicons name="flame" size={13} color="#f59e0b" />
                      <Text style={styles.hotBadge}>HOT EVENT</Text>
                    </View>
                  )}
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.tournamentName}>{item.title}</Text>
                  <Text style={styles.prizePool}>Prize Pool: {item.prize}</Text>
                  
                  <View style={styles.cardFooter}>
                    <View style={styles.dateContainer}>
                      <Ionicons name="calendar-outline" size={14} color="#64748b" />
                      <Text style={styles.tournamentDate}>{item.date}</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.secondaryBtn}
                      activeOpacity={0.8}
                      onPress={() => openRegisterModal(item.title)}
                    >
                      <Text style={styles.secondaryBtnText}>Daftar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* MODAL BIODATA PENDAFTARAN TURNAMEN */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Form Pendaftaran</Text>
            <Text style={styles.modalSub}>{activeTournament}</Text>

            <Text style={styles.inputLabel}>Nama Tim / Squad</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Contoh: RRQ Junior / Team Alpha"
              placeholderTextColor="#64748b"
              value={teamName}
              onChangeText={setTeamName}
            />

            <Text style={styles.inputLabel}>Game ID / UID (Server)</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Contoh: 12345678 (2011)"
              placeholderTextColor="#64748b"
              value={gameId}
              onChangeText={setGameId}
            />

            <Text style={styles.inputLabel}>Nomor WhatsApp Aktif</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Contoh: 08123456789"
              placeholderTextColor="#64748b"
              keyboardType="phone-pad"
              value={whatsapp}
              onChangeText={setWhatsapp}
            />

            <View style={styles.modalActionRow}>
              <TouchableOpacity 
                style={[styles.modalBtn, styles.cancelBtn]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.modalBtn, styles.submitBtn]} 
                onPress={submitTournamentRegistration}
              >
                <Text style={styles.submitBtnText}>Kirim Biodata</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b1120' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 100 },
  center: { justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  userSection: { flexDirection: 'column' },
  greeting: { color: '#94a3b8', fontSize: 13, marginBottom: 2 },
  username: { color: '#f8fafc', fontSize: 18, fontWeight: '700' },
  headerActionRow: { flexDirection: 'row', alignItems: 'center' },
  profileNavBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 8, borderWidth: 1, borderColor: '#334155', marginRight: 8 },
  profileNavText: { color: '#38bdf8', fontWeight: '600', fontSize: 12, marginLeft: 4 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e293b', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 8, borderWidth: 1, borderColor: '#334155' },
  logoutText: { color: '#ef4444', fontWeight: '600', fontSize: 12, marginLeft: 4 },
  heroSection: { marginBottom: 24 },
  heroTitle: { fontSize: 22, fontWeight: '700', color: '#38bdf8', marginBottom: 8, lineHeight: 28 },
  heroDesc: { color: '#94a3b8', fontSize: 13, lineHeight: 20 },
  section: { marginBottom: 24 },
  sectionTitle: { color: '#f8fafc', fontSize: 17, fontWeight: '700', marginBottom: 14 },
  categoryContainer: { flexDirection: 'row' },
  categoryBadge: { backgroundColor: '#1e293b', paddingHorizontal: 16, paddingVertical: 9, borderRadius: 20, marginRight: 10, borderWidth: 1, borderColor: '#334155' },
  categoryActive: { backgroundColor: '#2563eb', borderColor: '#2563eb' },
  categoryText: { color: '#94a3b8', fontSize: 13 },
  categoryTextActive: { color: '#ffffff', fontWeight: '600' },
  tournamentCard: { backgroundColor: '#1e293b', borderRadius: 16, marginBottom: 16, borderWidth: 1, borderColor: '#334155', overflow: 'hidden' },
  imageContainer: { width: '100%', height: 140, position: 'relative' },
  cardImage: { width: '100%', height: '100%' },
  hotBadgeContainer: { position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(15, 23, 42, 0.85)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, flexDirection: 'row', alignItems: 'center' },
  hotBadge: { color: '#f59e0b', fontWeight: '700', fontSize: 11, marginLeft: 4 },
  cardBody: { padding: 16 },
  tournamentName: { color: '#ffffff', fontSize: 16, fontWeight: '700', marginBottom: 4 },
  prizePool: { color: '#10b981', fontWeight: '600', fontSize: 13, marginBottom: 12 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#334155', paddingTop: 12 },
  dateContainer: { flexDirection: 'row', alignItems: 'center' },
  tournamentDate: { color: '#64748b', fontSize: 12, marginLeft: 6 },
  secondaryBtn: { backgroundColor: '#2563eb', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 8 },
  secondaryBtnText: { color: '#ffffff', fontWeight: '600', fontSize: 13 },
  emptyText: { color: '#64748b', fontSize: 13, fontStyle: 'italic' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#1e293b', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#334155' },
  modalTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 2 },
  modalSub: { fontSize: 13, color: '#38bdf8', marginBottom: 16 },
  inputLabel: { color: '#94a3b8', fontSize: 12, fontWeight: '600', marginBottom: 4 },
  modalInput: { backgroundColor: '#0b1120', borderRadius: 8, borderWidth: 1, borderColor: '#334155', paddingHorizontal: 12, height: 42, color: '#fff', marginBottom: 12, fontSize: 13 },
  modalActionRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  modalBtn: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  cancelBtn: { backgroundColor: '#334155', marginRight: 8 },
  cancelBtnText: { color: '#94a3b8', fontWeight: '600' },
  submitBtn: { backgroundColor: '#2563eb', marginLeft: 8 },
  submitBtnText: { color: '#fff', fontWeight: '700' }
});