// app/main/MainView.native.tsx
import { useMainViewModel } from '@/viewmodels/useMainViewModel';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';

export default function MainView() {
  const vm = useMainViewModel();

  // 🔹 Alert для мобайла вынесен во View
  const handleLogoutWithAlert = () => {
    Alert.alert('Выйти?', 'Подписка будет сброшена', [
      { text: 'Отмена', style: 'cancel' },
      { text: 'Выйти', style: 'destructive', onPress: vm.handleLogout },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Главная</Text>
        <TouchableOpacity onPress={handleLogoutWithAlert} activeOpacity={0.7}>
          <Text style={styles.logout}>Выйти</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={vm.contentItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isExpanded = vm.expandedItemId === item.id;
          return (
            <TouchableOpacity
              style={[styles.card, isExpanded && styles.cardExpanded]}
              onPress={() => vm.toggleCard(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.cardHeader}>
                <View style={styles.cardTitleContainer}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDesc}>{item.description}</Text>
                </View>
                <Text style={[styles.chevron, isExpanded && styles.chevronExpanded]}>
                  {isExpanded ? '▲' : '▼'}
                </Text>
              </View>

              {isExpanded && (
                <View style={styles.expandedContent}>
                  <Text style={styles.expandedText}>{item.details}</Text>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      vm.openSection(item.title);
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.actionButtonText}>Открыть →</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />

      {/* 🔹 Мобайл-модалка */}
      <Modal
        visible={vm.modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={vm.closeModal}
      >
        <TouchableWithoutFeedback onPress={vm.closeModal}>
          <View style={styles.modalOverlay} pointerEvents="box-none">
            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
              <View style={styles.modalContent} pointerEvents="box-none">
                <Text style={styles.modalTitle}>{vm.modalTitle}</Text>
                <Text style={styles.modalText}>
                  Функция в разработке 🚧{'\n'}{'\n'}
                  Здесь будет подробный раздел с информацией.
                </Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={vm.closeModal}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalButtonText}>Закрыть</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

// 📱 Мобильные стили
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: { fontSize: 24, fontWeight: 'bold' },
  logout: { color: '#FF3B30', fontSize: 16 },
  list: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardExpanded: {},
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitleContainer: { flex: 1, marginRight: 12 },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  cardDesc: { fontSize: 14, color: '#666' },
  chevron: { fontSize: 16, color: '#999' },
  chevronExpanded: { color: '#007AFF' },
  expandedContent: { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#E0E0E0' },
  expandedText: { fontSize: 14, color: '#444', lineHeight: 20, marginBottom: 12 },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  actionButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' },
  modalText: { fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 20, marginBottom: 20 },
  modalButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  modalButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});