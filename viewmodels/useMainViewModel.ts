// viewmodels/useMainViewModel.ts
import { useState, useCallback } from 'react';
import { Platform } from 'react-native';
import { router } from 'expo-router';
import { ContentItem } from '@/models/ContentItem';
import { SubscriptionService } from '@/services/SubscriptionService';

/** 🔹 Интерфейс ViewModel — контракт для View */
export interface MainViewModel {
  // State
  expandedItemId: string | null;
  modalVisible: boolean;
  modalTitle: string;
  contentItems: ContentItem[];

  // Actions
  toggleCard: (id: string) => void;
  openSection: (title: string) => void;
  closeModal: () => void;
  handleLogout: () => void;
}

/** 🔹 Реализация ViewModel */
export const useMainViewModel = (): MainViewModel => {
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  // 🔹 Данные (могли бы приходить из репозитория)
  const contentItems: ContentItem[] = [
    { id: '1', title: '📊 Статистика', description: 'Ваши достижения', details: 'Просмотрите подробную статистику вашей активности за все время использования приложения.' },
    { id: '2', title: '🎯 Задачи', description: 'План на день', details: 'Создавайте и управляйте задачами, устанавливайте дедлайны и приоритеты.' },
    { id: '3', title: '🏆 Награды', description: 'Разблокируйте бейджи', details: 'Получайте достижения за выполнение целей и поддержание серии успехов.' },
  ];

  // 🔹 Бизнес-логика (не зависит от UI)
  const toggleCard = useCallback((id: string) => {
    setExpandedItemId(prev => prev === id ? null : id);
  }, []);

  const openSection = useCallback((title: string) => {
    setModalTitle(title);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
    setModalTitle('');
  }, []);

  const handleLogout = useCallback(async () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Выйти?\n\nПодписка будет сброшена');
      if (confirmed) {
        await SubscriptionService.resetSubscription();
        window.location.href = '/onboarding';
      }
    } else {
      // Для мобильных — Alert вызывается во View, ViewModel только готовит данные
      // Здесь можно вернуть коллбек или использовать event emitter
      await SubscriptionService.resetSubscription();
      router.replace('/onboarding');
    }
  }, []);

  // 🔹 Возвращаем только то, что нужно View (инкапсуляция)
  return {
    expandedItemId,
    modalVisible,
    modalTitle,
    contentItems,
    toggleCard,
    openSection,
    closeModal,
    handleLogout,
  };
};