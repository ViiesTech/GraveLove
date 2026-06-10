import React, { useMemo, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppButton from '../../../components/AppButton';
import AppIcon from '../../../components/AppIcon';
import AppText from '../../../components/AppText';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const stepLabels = ['Pending', 'In Progress', 'Completed'];

const VendorTaskDetailsScreen = ({ navigation, route }) => {
  const params = route?.params || {};
  const [status, setStatus] = useState(params.status || 'Pending');
  const [beforeSelected, setBeforeSelected] = useState(false);
  const [afterSelected, setAfterSelected] = useState(false);
  const [sentVisible, setSentVisible] = useState(false);

  const activeIndex = useMemo(() => {
    const index = stepLabels.indexOf(status);
    return index < 0 ? 0 : index;
  }, [status]);

  const handlePrimary = () => {
    if (status === 'Pending') {
      setStatus('In Progress');
      return;
    }
    navigation.navigate('VendorCompletionProof', {
      cemeteryName: params.title || 'Peaceful Gardens Cemetery',
      graveLocation: params.subtitle || 'Plot 54, Section C',
      serviceName: params.service || 'Grave Cleaning',
    });
  };

  return (
    <ScreenWrapper contentContainerStyle={styles.root}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => navigation.goBack()}
          style={styles.backRow}
        >
          <AppIcon name="arrow-back" color={AppColors.white} size={23} />
          <AppText style={styles.backText}>Back to Dashboard</AppText>
        </TouchableOpacity>
        <LineBreak height={1.55} />
        <AppText style={styles.title}>Task Details</AppText>
      </View>

      <View style={styles.flex}>
        <ScreenWrapper
          isScroll
          safeAreaEdges={[]}
          useBackgroundImage={false}
          contentContainerStyle={styles.scrollContent}
          style={styles.transparent}
        >
          <GlassCard contentStyle={styles.progressCard}>
            <View style={styles.progressTop}>
              <AppText style={styles.dimText}>Progress</AppText>
              <View style={styles.statusPill}>
                <AppText style={styles.statusText}>{status}</AppText>
              </View>
            </View>
            <LineBreak height={1.55} />
            <View style={styles.stepTrack}>
              {stepLabels.map((label, index) => (
                <View
                  key={label}
                  style={[
                    styles.stepBar,
                    index <= activeIndex && styles.stepBarActive,
                    index === stepLabels.length - 1 && styles.stepBarLast,
                  ]}
                />
              ))}
            </View>
            <LineBreak height={1.1} />
            <View style={styles.stepLabelRow}>
              {stepLabels.map(label => (
                <AppText key={label} style={styles.stepLabel}>{label}</AppText>
              ))}
            </View>
          </GlassCard>

          <SectionCard icon="location-on" title="Cemetery Information">
            <InfoLine label="Cemetery Name" value={params.title || 'Peaceful Gardens Cemetery'} />
            <InfoLine label="Address" value="2450 Oak Street, Los Angeles, CA 90012" />
            <InfoLine label="Grave Number" value={params.subtitle || 'Plot 54, Section C'} />
          </SectionCard>

          <SectionCard icon="person-outline" title="Client Information">
            <InfoLine label="Name" value="James Anderson" />
            <View style={styles.phoneRow}>
              <AppIcon name="phone" color={AppColors.homeTextMuted} size={16} />
              <AppText style={styles.valueText}>+1 (555) 234-5678</AppText>
            </View>
          </SectionCard>

          <SectionCard icon="description" title="Service Details">
            <InfoLine label="Service Type" value={params.service || 'Grave Cleaning'} />
            <InfoLine label="Scheduled Date & Time" value={`2025-11-03 at ${params.time || '10:00 AM'}`} />
            <View>
              <AppText style={styles.labelText}>Special Instructions</AppText>
              <AppText style={styles.valueText}>
                Please clean the grave thoroughly and add fresh flowers.
              </AppText>
            </View>
          </SectionCard>

          <TouchableOpacity activeOpacity={0.85} style={styles.mapCard}>
            <View style={styles.mapIcon}>
              <AppIcon name="location-on" color={AppColors.white} size={32} />
            </View>
            <LineBreak height={1.2} />
            <AppText style={styles.mapText}>Map location</AppText>
          </TouchableOpacity>

          {status !== 'Pending' ? (
            <>
              <View style={styles.photoRow}>
                <ProofBox
                  selected={beforeSelected}
                  title="Before Photo"
                  uploadedText="Uploaded"
                  onPress={() => setBeforeSelected(true)}
                />
                <ProofBox
                  selected={afterSelected}
                  title="After Photo"
                  uploadedText="Uploaded"
                  onPress={() => setAfterSelected(true)}
                />
              </View>
              <LineBreak height={1.6} />
            </>
          ) : null}

          <TouchableOpacity
            activeOpacity={0.82}
            onPress={() => navigation.navigate('VendorPersonalChat', {
              clientName: 'James Anderson',
              service: params.service || 'Grave Cleaning',
            })}
            style={styles.chatButton}
          >
            <AppIcon name="chat-bubble-outline" color={AppColors.white} size={20} />
            <AppText style={styles.chatText}>Chat</AppText>
          </TouchableOpacity>
        </ScreenWrapper>

        {status !== 'Completed' ? (
          <View style={styles.bottomAction}>
            <AppButton style={styles.primaryButton} onPress={handlePrimary}>
              {status === 'Pending' ? 'Mark as In Progress' : 'Send Proof to Client'}
            </AppButton>
          </View>
        ) : null}
      </View>

      <Modal transparent visible={sentVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <GlassCard contentStyle={styles.modalCard}>
            <AppText style={styles.modalTitle}>Sent</AppText>
            <LineBreak height={2.2} />
            <View style={styles.sentCircle}>
              <AppIcon name="check" color={AppColors.themeColor} size={52} />
            </View>
            <LineBreak height={2.2} />
            <AppText style={styles.valueText}>Successfully</AppText>
            <LineBreak height={2.8} />
            <AppButton
              style={styles.primaryButton}
              onPress={() => {
                setSentVisible(false);
                navigation.goBack();
              }}
            >
              Back to home
            </AppButton>
          </GlassCard>
        </View>
      </Modal>
    </ScreenWrapper>
  );
};

const SectionCard = ({ children, icon, title }) => (
  <GlassCard contentStyle={styles.sectionCard}>
    <View style={styles.sectionHeading}>
      <AppIcon name={icon} color={AppColors.white} size={20} />
      <AppText style={styles.sectionTitle}>{title}</AppText>
    </View>
    <LineBreak height={1.45} />
    {children}
  </GlassCard>
);

const InfoLine = ({ label, value }) => (
  <View style={styles.infoLine}>
    <AppText style={styles.labelText}>{label}</AppText>
    <AppText style={styles.valueText}>{value}</AppText>
  </View>
);

const ProofBox = ({ onPress, selected, title, uploadedText }) => (
  <TouchableOpacity activeOpacity={0.82} onPress={onPress} style={styles.proofBox}>
    <AppText style={styles.proofTitle}>{title}</AppText>
    <LineBreak height={1.35} />
    <View style={styles.proofIcon}>
      <AppIcon
        name={selected ? 'check-circle' : 'upload'}
        color={AppColors.white}
        size={31}
      />
    </View>
    <LineBreak height={1.05} />
    <AppText style={styles.proofHint}>
      {selected ? uploadedText : 'Tap to upload after photo'}
    </AppText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  transparent: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    padding: responsiveWidth(4),
    backgroundColor: 'rgba(4,47,103,0.5)',
  },
  backRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  backText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.35),
    marginLeft: responsiveWidth(3),
  },
  title: {
    color: AppColors.white,
    fontSize: responsiveFontSize(2.35),
    fontWeight: '700',
  },
  scrollContent: {
    padding: responsiveWidth(4),
    paddingBottom: responsiveHeight(3),
  },
  progressCard: {
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    marginBottom: responsiveHeight(1.6),
  },
  progressTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dimText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.3),
  },
  statusPill: {
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(0.55),
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: AppColors.white,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  statusText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.05),
    fontWeight: '700',
  },
  stepTrack: {
    flexDirection: 'row',
  },
  stepBar: {
    flex: 1,
    height: 4,
    marginRight: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.24)',
  },
  stepBarActive: {
    backgroundColor: AppColors.onboardingButton,
  },
  stepBarLast: {
    marginRight: 0,
  },
  stepLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepLabel: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.05),
  },
  sectionCard: {
    marginBottom: responsiveHeight(1.6),
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
  },
  sectionHeading: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  sectionTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.55),
    fontWeight: '700',
    marginLeft: responsiveWidth(2),
  },
  infoLine: {
    marginBottom: responsiveHeight(1.1),
  },
  labelText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.22),
    marginBottom: responsiveHeight(0.35),
  },
  valueText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.36),
    lineHeight: responsiveFontSize(2.05),
  },
  phoneRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: responsiveWidth(2),
  },
  mapCard: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: responsiveHeight(14),
    marginBottom: responsiveHeight(1.6),
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: AppColors.homeBorder,
    backgroundColor: AppColors.memorialCard,
  },
  mapIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(15),
    height: responsiveWidth(15),
    borderRadius: responsiveWidth(7.5),
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  mapText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.36),
  },
  photoRow: {
    flexDirection: 'row',
    gap: responsiveWidth(3),
  },
  proofBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: responsiveHeight(18),
    padding: responsiveWidth(3),
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: AppColors.homeBorder,
    backgroundColor: AppColors.memorialCard,
  },
  proofTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.38),
    fontWeight: '700',
    textAlign: 'center',
  },
  proofIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(14),
    height: responsiveWidth(14),
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.14)',
  },
  proofHint: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.05),
    textAlign: 'center',
  },
  chatButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    height: responsiveHeight(5.5),
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: AppColors.homeBorder,
    backgroundColor: AppColors.memorialCard,
  },
  chatText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.38),
    marginLeft: responsiveWidth(2),
  },
  bottomAction: {
    padding: responsiveWidth(4),
    borderTopWidth: 0.5,
    borderTopColor: AppColors.homeBorder,
  },
  primaryButton: {
    backgroundColor: AppColors.onboardingButton,
    borderRadius: 12,
  },
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsiveWidth(8),
    backgroundColor: 'rgba(0,0,0,0.44)',
  },
  modalCard: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    padding: responsiveWidth(8),
  },
  modalTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(2.3),
    fontWeight: '700',
  },
  sentCircle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveWidth(24),
    height: responsiveWidth(24),
    borderRadius: responsiveWidth(12),
    backgroundColor: AppColors.white,
  },
});

export default VendorTaskDetailsScreen;
