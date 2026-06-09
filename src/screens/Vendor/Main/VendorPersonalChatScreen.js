import React, { useState } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import AppIcon from '../../../components/AppIcon';
import AppText from '../../../components/AppText';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const initialMessages = [
  { id: '1', text: 'Please use white roses only.', time: '8:00 AM', sent: false },
  { id: '2', text: 'Understood. I will arrange white roses.', time: '8:15 AM', sent: true },
  { id: '3', text: 'Thank you for your service.', time: '8:30 AM', sent: false },
];

const VendorPersonalChatScreen = ({ navigation, route }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const clientName = route?.params?.clientName || 'James Anderson';
  const service = route?.params?.service || 'Grave Cleaning';

  const sendMessage = () => {
    const trimmed = message.trim();
    if (!trimmed) {
      return;
    }
    setMessages(current => [
      ...current,
      { id: `${Date.now()}`, text: trimmed, time: 'Now', sent: true },
    ]);
    setMessage('');
  };

  return (
    <ScreenWrapper
      isKeyboardAvoiding
      keyboardVerticalOffset={responsiveHeight(1)}
      contentContainerStyle={styles.root}
    >
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.75} onPress={() => navigation.goBack()}>
          <AppIcon name="arrow-back" color={AppColors.white} size={24} />
        </TouchableOpacity>
        <View style={styles.headerCopy}>
          <AppText style={styles.clientName}>{clientName}</AppText>
          <AppText style={styles.service}>{service}</AppText>
        </View>
      </View>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messages}
        renderItem={({ item }) => <MessageBubble message={item} />}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.inputBar}>
        <TouchableOpacity activeOpacity={0.82} style={styles.roundButton}>
          <AppIcon name="attach-file" color={AppColors.white} size={20} />
        </TouchableOpacity>
        <View style={styles.inputWrap}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={sendMessage}
            placeholder="Type your message..."
            placeholderTextColor={AppColors.homeTextMuted}
            style={styles.input}
          />
        </View>
        <TouchableOpacity activeOpacity={0.82} onPress={sendMessage} style={styles.sendButton}>
          <AppIcon name="send" color={AppColors.white} size={20} />
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const MessageBubble = ({ message }) => (
  <View style={[
    styles.messageRow,
    message.sent ? styles.sentRow : styles.receivedRow,
  ]}>
    {!message.sent ? <Avatar /> : null}
    <View style={[
      styles.bubble,
      message.sent ? styles.sentBubble : styles.receivedBubble,
    ]}>
      <AppText style={[styles.messageText, message.sent && styles.sentText]}>
        {message.text}
      </AppText>
      <AppText style={[styles.timeText, message.sent && styles.sentTime]}>
        {message.time}
      </AppText>
    </View>
    {message.sent ? <Avatar /> : null}
  </View>
);

const Avatar = () => (
  <View style={styles.avatar}>
    <AppIcon name="person" color={AppColors.themeColor} size={16} />
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: responsiveWidth(4),
    borderBottomWidth: 0.5,
    borderBottomColor: AppColors.homeBorder,
    backgroundColor: 'rgba(4,47,103,0.8)',
  },
  headerCopy: {
    flex: 1,
    marginLeft: responsiveWidth(3),
  },
  clientName: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.72),
    fontWeight: '700',
  },
  service: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.1),
    marginTop: responsiveHeight(0.2),
  },
  messages: {
    padding: responsiveWidth(4),
    paddingBottom: responsiveHeight(2),
  },
  messageRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginBottom: responsiveHeight(1.6),
  },
  sentRow: {
    justifyContent: 'flex-end',
  },
  receivedRow: {
    justifyContent: 'flex-start',
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    borderRadius: responsiveWidth(4),
    backgroundColor: AppColors.white,
  },
  bubble: {
    maxWidth: '74%',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.2),
    borderWidth: 0.5,
  },
  receivedBubble: {
    marginLeft: responsiveWidth(2),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 16,
    borderColor: AppColors.homeBorder,
    backgroundColor: AppColors.memorialCard,
  },
  sentBubble: {
    marginRight: responsiveWidth(2),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 4,
    borderColor: AppColors.onboardingButton,
    backgroundColor: AppColors.onboardingButton,
  },
  messageText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.32),
  },
  sentText: {
    color: AppColors.white,
  },
  timeText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(0.92),
    marginTop: responsiveHeight(0.4),
  },
  sentTime: {
    color: 'rgba(255,255,255,0.7)',
  },
  inputBar: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: responsiveWidth(4),
    borderTopWidth: 0.5,
    borderTopColor: AppColors.homeBorder,
    backgroundColor: 'rgba(4,47,103,0.82)',
  },
  roundButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  inputWrap: {
    flex: 1,
    height: responsiveHeight(4.8),
    marginHorizontal: responsiveWidth(3),
    borderWidth: 0.5,
    borderColor: AppColors.homeBorder,
    borderRadius: responsiveHeight(2.4),
    backgroundColor: AppColors.memorialCard,
  },
  input: {
    flex: 1,
    color: AppColors.white,
    fontSize: responsiveFontSize(1.28),
    paddingHorizontal: responsiveWidth(4),
  },
  sendButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    backgroundColor: AppColors.onboardingButton,
  },
});

export default VendorPersonalChatScreen;
