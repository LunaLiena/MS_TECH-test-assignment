import { router } from 'expo-router';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';

import { resetSubscription } from '@/store/SubscriptionStore';
import React, { useState } from 'react';

const ITEMS = [
  {
    id: '1',
    title: '📊 Статистика',
    desc: 'Ваши достижения',
    details: 'Просмотрите подробную статистику вашей активности за все время использования приложения.'
  },
  {
    id: '2',
    title: '🎯 Задачи',
    desc: 'План на день',
    details: 'Создавайте и управляйте задачами, устанавливайте дедлайны и приоритеты.'
  },
  {
    id: '3',
    title: '🏆 Награды',
    desc: 'Разблокируйте бейджи',
    details: 'Получайте достижения за выполнение целей и поддержание серии успехов.'
  },
];

export default function MainScreen() {

  const [expandedId, setExpandedId] = useState<string | null>(null);


  const handleLogout = () => {
    Alert.alert(
      'Выйти?',
      'Подписка будет сброшена',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Выйти',
          style: 'destructive',
          onPress: async () => {
            await resetSubscription();
            router.replace('/onboarding');
          },
        },
      ]
    );
  };
  const toggleCard = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Главная</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Выйти</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={ITEMS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isExpanded = expandedId === item.id;

          return (
            <TouchableOpacity
              style={[styles.card, isExpanded && styles.cardExpanded]}
              onPress={() => toggleCard(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.cardHeader}>
                <View style={styles.cardTitleContainer}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDesc}>{item.desc}</Text>
                </View>

                {/* 🔥 Иконка стрелки */}
                <Text style={[styles.chevron, isExpanded && styles.chevronExpanded]}>▼</Text>
              </View>

              {/* 🔥 Раскрывающийся контент */}
              {isExpanded && (
                <View style={styles.expandedContent}>
                  <Text style={styles.expandedText}>{item.details}</Text>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => Alert.alert(item.title, 'Открываем раздел...')}
                  >
                    <Text style={styles.actionButtonText}>Открыть →</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardExpanded: {
    shadowOpacity: 0.2,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  cardTitle: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  cardDesc: { fontSize: 14, color: '#666' },
  chevron: {
    fontSize: 12,
    color: '#999',
  },
  chevronExpanded: {
    transform: [{ rotate: '180deg' }],
    color: '#007AFF',
  },
  expandedContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  expandedText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
    marginBottom: 12,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});