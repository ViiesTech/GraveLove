import Toast from 'react-native-toast-message';

export const showToast = (message, text2) => {
  Toast.show({
    text1: message,
    text2: text2,
    position: 'top',
    visibilityTime: 4000,
    autoHide: true,
  });
};
