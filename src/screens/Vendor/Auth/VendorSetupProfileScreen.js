import React, { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, TextInput, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
import AppText from '../../../components/AppText';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppColors } from '../../../utils/AppColors';
import { showToast } from '../../../utils/Toast';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const VendorSetupProfileScreen = ({ navigation, route }) => {
  const [businessName, setBusinessName] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const previousData = route?.params?.previousData || {};

  const pickImage = async source => {
    setIsPickerVisible(false);

    const picker = source === 'camera' ? launchCamera : launchImageLibrary;
    const result = await picker({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.didCancel) {
      return;
    }

    if (result.errorCode) {
      showToast('Image error', 'Failed to pick image. Please try again.');
      return;
    }

    const asset = result.assets?.[0];
    if (asset?.uri) {
      setProfileImage(asset);
    }
  };

  const goToNextStep = () => {
    if (!businessName.trim() || !location.trim() || !phone.trim()) {
      showToast('Required fields', 'Please fill all required fields.');
      return;
    }

    navigation.navigate('VendorServiceAdd', {
      previousData: {
        ...previousData,
        business_name: businessName.trim(),
        years_of_experience: experience.trim(),
        service_location: location.trim(),
        business_phone_number: phone.trim(),
      },
      profileImage,
    });
  };

  return (
    <ScreenWrapper
      isGradient
      isKeyboardAvoiding
      isScroll
      keyboardVerticalOffset={responsiveHeight(4)}
      contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <AppIcon
            iconSet="material"
            name="arrow-back"
            size={24}
            color={AppColors.gold}
          />
        </Pressable>
        <AppText variant="largeTitle" style={styles.headerTitle}>
          Setup Your Profile
        </AppText>
      </View>

      <LineBreak height={3.2} />
      <Pressable
        style={styles.avatarWrap}
        onPress={() => setIsPickerVisible(true)}>
        <View style={styles.avatar}>
          {profileImage?.uri ? (
            <Image source={{ uri: profileImage.uri }} style={styles.avatarImage} />
          ) : (
            <AppIcon
              iconSet="material"
              name="person"
              size={50}
              color={AppColors.gold}
            />
          )}
        </View>
        <View style={styles.cameraBadge}>
          <AppIcon
            iconSet="material"
            name="camera-alt"
            size={16}
            color={AppColors.bgDark}
          />
        </View>
      </Pressable>
      <LineBreak height={1} />
      <Pressable onPress={() => setIsPickerVisible(true)}>
        <AppText style={styles.uploadText}>
          {profileImage ? 'Change Picture' : 'Upload Profile Picture'}
        </AppText>
      </Pressable>

      <LineBreak height={3.9} />
      <FieldLabel text="Business Name *" />
      <LineBreak height={1} />
      <SetupTextField
        value={businessName}
        onChangeText={setBusinessName}
        placeholder="Enter your business name"
      />

      <LineBreak height={2.45} />
      <FieldLabel text="Years of Experience" />
      <LineBreak height={1} />
      <SetupTextField
        value={experience}
        onChangeText={setExperience}
        placeholder="e.g., 5 years"
      />

      <LineBreak height={2.45} />
      <FieldLabel text="Service Location *" />
      <LineBreak height={1} />
      <SetupTextField
        value={location}
        onChangeText={setLocation}
        placeholder="City, State"
      />

      <LineBreak height={2.45} />
      <FieldLabel text="Phone Number *" />
      <LineBreak height={1} />
      <SetupTextField
        value={phone}
        onChangeText={setPhone}
        placeholder="+1 (555) 000-0000"
        keyboardType="phone-pad"
      />

      <LineBreak height={2.95} />
      <View style={styles.infoCard}>
        <AppText variant="title" style={styles.infoTitle}>
          How it works
        </AppText>
        <LineBreak height={1.5} />
        <BulletPoint text="Clients will post jobs from their app" />
        <BulletPoint text="Jobs matching your services will appear in your dashboard" />
        <BulletPoint text="Review job details and accept or decline" />
        <BulletPoint text="Complete tasks and receive payments" />
      </View>

      <LineBreak height={2} />
      <AppText variant="bodyDim" style={styles.requiredText}>
        * Required fields
      </AppText>

      <LineBreak height={2.95} />
      <AppButton onPress={goToNextStep} style={styles.nextButton}>
        Next
      </AppButton>

      <ImagePickerModal
        isVisible={isPickerVisible}
        onClose={() => setIsPickerVisible(false)}
        onPick={pickImage}
      />
    </ScreenWrapper>
  );
};

const FieldLabel = ({ text }) => (
  <AppText style={styles.label}>{text}</AppText>
);

const SetupTextField = ({ style, ...props }) => (
  <LinearGradient colors={['transparent', 'transparent']} style={[styles.inputWrap, style]}>
    <TextInput
      {...props}
      placeholderTextColor={AppColors.goldDim}
      selectionColor={AppColors.gold}
      style={styles.input}
    />
  </LinearGradient>
);

const BulletPoint = ({ text }) => (
  <View style={styles.bulletRow}>
    <AppText variant="bodyDim" style={styles.bulletDot}>
      {'• '}
    </AppText>
    <AppText variant="bodyDim" style={styles.bulletText}>
      {text}
    </AppText>
  </View>
);

const ImagePickerModal = ({ isVisible, onClose, onPick }) => (
  <Modal animationType="slide" transparent visible={isVisible} onRequestClose={onClose}>
    <Pressable style={styles.modalBackdrop} onPress={onClose}>
      <Pressable style={styles.modalContent}>
        <AppText variant="title" style={styles.modalTitle}>
          Select Profile Picture
        </AppText>
        <LineBreak height={2.45} />
        <View style={styles.optionRow}>
          <PickerOption iconName="camera-alt" label="Camera" onPress={() => onPick('camera')} />
          <PickerOption iconName="photo-library" label="Gallery" onPress={() => onPick('gallery')} />
        </View>
      </Pressable>
    </Pressable>
  </Modal>
);

const PickerOption = ({ iconName, label, onPress }) => (
  <Pressable style={styles.option} onPress={onPress}>
    <View style={styles.optionIcon}>
      <AppIcon iconSet="material" name={iconName} size={30} color={AppColors.gold} />
    </View>
    <LineBreak height={1} />
    <AppText>{label}</AppText>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveWidth(3.9),
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(4.9),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: responsiveWidth(1),
  },
  headerTitle: {
    marginLeft: responsiveWidth(3.9),
    color: AppColors.gold,
    fontSize: responsiveFontSize(2.35),
    fontWeight: '400',
  },
  avatarWrap: {
    alignSelf: 'center',
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(24.2),
    height: responsiveWidth(24.2),
    borderRadius: responsiveWidth(12.1),
    backgroundColor: 'rgba(248, 251, 255, 0.16)',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  cameraBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(7.8),
    height: responsiveWidth(7.8),
    borderWidth: 2,
    borderColor: AppColors.bgDark,
    borderRadius: responsiveWidth(3.9),
    backgroundColor: AppColors.goldAction,
  },
  uploadText: {
    alignSelf: 'center',
    color: AppColors.goldAction,
  },
  label: {
    color: AppColors.gold,
  },
  inputWrap: {
    borderWidth: 1,
    borderColor: AppColors.border,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  input: {
    minHeight: responsiveHeight(4.7),
    paddingHorizontal: responsiveWidth(3.9),
    color: AppColors.gold,
    fontFamily: 'Arial',
    fontSize: responsiveFontSize(1.52),
  },
  infoCard: {
    padding: responsiveWidth(4.8),
    borderRadius: 12,
    backgroundColor: 'rgba(248, 251, 255, 0.12)',
  },
  infoTitle: {
    color: AppColors.gold,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: responsiveHeight(1),
  },
  bulletDot: {
    color: AppColors.goldDim,
  },
  bulletText: {
    flex: 1,
    color: AppColors.goldDim,
  },
  requiredText: {
    textAlign: 'center',
  },
  nextButton: {
    width: '100%',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  modalContent: {
    padding: responsiveWidth(4.8),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: AppColors.bgDark,
  },
  modalTitle: {
    textAlign: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  option: {
    alignItems: 'center',
  },
  optionIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    borderWidth: 1,
    borderColor: AppColors.gold,
    borderRadius: responsiveWidth(7.5),
    backgroundColor: 'rgba(248, 251, 255, 0.12)',
  },
});

export default VendorSetupProfileScreen;
