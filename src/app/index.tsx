import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1e293b" />
      
      {/* 1. HEADER SECTION */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=150' }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.greeting}>Selamat Datang,</Text>
            <Text style={styles.username}>ProGamer_495</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notifBtn}>
          <Text style={{ fontSize: 16 }}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* MAIN CONTENT */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* 2 & 3. JUDUL UTAMA & INFORMASI */}
        <View style={styles.headline}>
          <Text style={styles.mainTitle}>Temukan Match & Kuasai Arena!</Text>
          <Text style={styles.mainDesc}>
            Ikuti turnamen esports bergengsi minggu ini. Kumpulkan poin, raih posisi puncak leaderboard, dan menangkan total hadiah jutaan rupiah!
          </Text>
        </View>

        {/* 4 & 5. BANNER VISUAL & ACTION BUTTON */}
        <View style={styles.bannerCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800' }}
            style={styles.bannerImg}
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.badge}>🔥 HOT EVENT</Text>
            <Text style={styles.bannerTitle}>MLBB National Championship 2026</Text>
            <Text style={styles.bannerPrize}>Prize Pool: Rp 50.000.000</Text>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionBtnText}>Daftar Sekarang</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 6. CONTENT SECTION */}
        <Text style={styles.sectionTitle}>Kategori Game</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          <View style={[styles.chip, styles.chipActive]}>
            <Text style={styles.chipTextActive}>All Games</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>MOBA</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>FPS / Battle Royale</Text>
          </View>
          <View style={styles.chip}>
            <Text style={styles.chipText}>Fighting</Text>
          </View>
        </ScrollView>

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Turnamen Mendatang</Text>

        <View style={styles.tournamentCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400' }}
            style={styles.cardThumb}
          />
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Valorant Community Cup</Text>
            <Text style={styles.meta}>🎮 FPS • 5 vs 5 Mode</Text>
            <Text style={styles.date}>📅 12 Oktober 2026</Text>
          </View>
        </View>

        <View style={styles.tournamentCard}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400' }}
            style={styles.cardThumb}
          />
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>PUBG Mobile Squad Series</Text>
            <Text style={styles.meta}>🎮 Battle Royale • Squad</Text>
            <Text style={styles.date}>📅 18 Oktober 2026</Text>
          </View>
        </View>
      </ScrollView>

      {/* 7. BOTTOM NAVIGATION BAR */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={[styles.navLabel, styles.navLabelActive]}>Beranda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏆</Text>
          <Text style={styles.navLabel}>Turnamen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👥</Text>
          <Text style={styles.navLabel}>Tim Saya</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>👤</Text>
          <Text style={styles.navLabel}>Profil</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1e293b',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  greeting: {
    fontSize: 12,
    color: '#94a3b8',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  notifBtn: {
    backgroundColor: '#334155',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    paddingBottom: 90,
  },
  headline: {
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#38bdf8',
    marginBottom: 8,
  },
  mainDesc: {
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
  },
  bannerCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  bannerImg: {
    width: '100%',
    height: 160,
  },
  bannerOverlay: {
    padding: 16,
  },
  badge: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: 'bold',
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginVertical: 6,
  },
  bannerPrize: {
    fontSize: 14,
    color: '#4ade80',
    fontWeight: '600',
    marginBottom: 12,
  },
  actionBtn: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  categoryScroll: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  chip: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  chipActive: {
    backgroundColor: '#2563eb',
  },
  chipText: {
    color: '#94a3b8',
    fontSize: 12,
  },
  chipTextActive: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tournamentCard: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  cardThumb: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  meta: {
    fontSize: 12,
    color: '#94a3b8',
  },
  date: {
    fontSize: 12,
    color: '#38bdf8',
    marginTop: 4,
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#1e293b',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  navLabel: {
    fontSize: 11,
    color: '#94a3b8',
  },
  navLabelActive: {
    color: '#38bdf8',
    fontWeight: 'bold',
  },
});