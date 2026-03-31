// app/main/MainView.web.tsx
import { useMainViewModel } from '@/viewmodels/useMainViewModel';
import React from 'react';

export const MainView = () => {
  const vm = useMainViewModel();

  return (
    <>

      <style>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes contentFadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .modal-animate {
          animation: modalSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .content-animate {
          animation: contentFadeIn 0.2s ease-out forwards;
        }
        .card-transition {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .chevron-transition {
          transition: transform 0.2s ease, color 0.2s ease;
        }
        .chevron-rotated {
          transform: rotate(180deg);
        }
      `}</style>


      <div style={webStyles.container}>
        <header style={webStyles.header}>
          <h3 style={webStyles.title}>Главная</h3>
          <button onClick={vm.handleLogout} style={webStyles.logoutButton}>
            Выйти
          </button>
        </header>

        <div style={webStyles.list}>
          {vm.contentItems.map((item) => {
            const isExpanded = vm.expandedItemId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => vm.toggleCard(item.id)}
                style={{
                  ...webStyles.card,
                  ...(isExpanded ? webStyles.cardExpanded : {}),
                }}
              >
                <div style={webStyles.cardHeader}>
                  <div style={webStyles.cardTitleContainer}>
                    <h3 style={webStyles.cardTitle}>{item.title}</h3>
                    <h3 style={webStyles.cardDesc}>{item.description}</h3>
                  </div>
                  <span style={{ ...webStyles.chevron, color: isExpanded ? '#007AFF' : '#999' }}>
                    {isExpanded ? '▲' : '▼'}
                  </span>
                </div>

                {isExpanded && (
                  <div style={webStyles.expandedContent}>
                    <h3 style={webStyles.expandedText}>{item.details}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        vm.openSection(item.title);
                      }}
                      style={webStyles.actionButton}
                    >
                      Открыть →
                    </button>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* 🔹 Веб-модалка */}
        {vm.modalVisible && (
          <div style={webStyles.modalOverlay} onClick={vm.closeModal}>
            <div style={webStyles.modalContent} onClick={(e) => e.stopPropagation()}>
              <h3 style={webStyles.modalTitle}>{vm.modalTitle}</h3>
              <h3 style={webStyles.modalText}>
                Функция в разработке 🚧{'\n'}{'\n'}
                Здесь будет подробный раздел с информацией.
              </h3>
              <button onClick={vm.closeModal} style={webStyles.modalButton}>
                Закрыть
              </button>
            </div>
          </div>
        )}
      </div>
    </>

  );
}

// 🌐 Веб-стили (CSS-in-JS)
const webStyles: Record<string, React.CSSProperties> = {
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #E0E0E0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    margin: 0,
  },
  logoutButton: {
    background: 'none',
    border: 'none',
    color: '#FF3B30',
    fontSize: 15,
    fontWeight: '500',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: 8,
    fontFamily: 'inherit',
    transition: 'background-color 0.15s ease',
  },
  list: {
    padding: '12px 16px 24px',
    maxWidth: 600,
    margin: '0 auto',
    width: '100%',
    boxSizing: 'border-box',
  },

  // 🃏 Карточки
  card: {
    backgroundColor: '#fff',
    padding: '14px 18px',
    borderRadius: 14,
    marginBottom: 12,
    border: '1px solid #E8E8E8',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    display: 'block',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  cardExpanded: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F7FF',
    boxShadow: '0 4px 16px rgba(0,122,255,0.12)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  cardTitleContainer: {
    flex: 1,
    minWidth: 0, // для корректного обрезания текста
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 4,
    margin: 0,
    color: '#1C1C1E',
    lineHeight: 1.3,
  },
  cardDesc: {
    fontSize: 14,
    color: '#666',
    margin: 0,
    fontWeight: '400',
    lineHeight: 1.4,
  },
  chevron: {
    fontSize: 18,
    fontWeight: '300',
    flexShrink: 0,
    marginTop: 2,
  },

  // 📦 Раскрытый контент
  expandedContent: {
    marginTop: 14,
    paddingTop: 14,
    borderTop: '1px solid rgba(0,122,255,0.2)',
  },
  expandedText: {
    fontSize: 14,
    color: '#3C3C43',
    lineHeight: 1.5,
    marginBottom: 14,
    margin: 0,
    fontWeight: '400',
  },
  actionButton: {
    backgroundColor: '#007AFF',
    padding: '10px 20px',
    borderRadius: 10,
    border: 'none',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
    color: '#fff',
    alignSelf: 'flex-start',
    marginTop: 4,
    fontFamily: 'inherit',
    transition: 'background-color 0.15s ease, transform 0.1s ease',
  },

  // 🪟 Модалка
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 9999,
    backdropFilter: 'blur(4px)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: '28px 24px',
    width: '100%',
    maxWidth: 420, // 🔥 Увеличили с 320 до 420
    alignItems: 'center',
    boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 14,
    textAlign: 'center',
    margin: 0,
    color: '#1C1C1E',
  },
  modalText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 1.6,
    marginBottom: 24,
    margin: 0,
    whiteSpace: 'pre-line',
  },
  modalButton: {
    backgroundColor: '#007AFF',
    border: 'none',
    padding: '12px 32px',
    borderRadius: 12,
    cursor: 'pointer',
    fontSize: 15,
    fontWeight: 600,
    color: '#fff',
    fontFamily: 'inherit',
    marginTop: 4,
    transition: 'background-color 0.15s ease, transform 0.1s ease',
  },
};