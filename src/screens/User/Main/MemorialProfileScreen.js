import React, { useMemo, useState } from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppIcon from '../../../components/AppIcon';
import AppText from '../../../components/AppText';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {
  useGetClientMemorialDetailQuery,
  useGetClientMemorialTributesQuery,
} from '../../../redux/api/userApi';
import { AppAssets } from '../../../utils/AppAssets';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const defaultMemorial = {
  name: 'Robert James Thompson',
  relation: 'Loved One',
  dates: 'Jan 15, 1945 — Mar 20, 2020',
  image: AppAssets.images.profilePic,
};

const valueOf = (...values) => values.find(value => value !== undefined && value !== null && value !== '') || '';
const imageSource = image => {
  if (!image) {
    return AppAssets.images.profilePic;
  }
  if (typeof image === 'number') {
    return image;
  }
  return { uri: image };
};
const displayDate = value => value ? `${value}` : '-';
const formatMemorialDates = memorial => valueOf(
  memorial?.dates,
  memorial?.date_range,
  `${displayDate(valueOf(memorial?.date_of_birth, memorial?.birth_date))} - ${displayDate(valueOf(memorial?.date_of_passing, memorial?.death_date))}`,
);
const mapMemorial = (detail, initial = {}) => {
  const raw = detail || {};
  const merged = { ...initial, ...raw };
  return {
    ...merged,
    id: valueOf(merged.id, merged.memorial_id),
    name: valueOf(merged.name, merged.full_name, merged.memorial_name, defaultMemorial.name),
    relation: valueOf(merged.relationship, merged.relation, merged.relation_to_user, defaultMemorial.relation),
    dates: formatMemorialDates(merged),
    image: imageSource(valueOf(merged.profile_picture_url, merged.profile_picture, merged.image, merged.photo)),
    quote: valueOf(merged.subtitle, '"A loving father who dedicated his life to his family and community"'),
    cemetery: valueOf(merged.cemetery_name, 'Forest Lawn Memorial Park'),
    locationLine: valueOf(merged.address, merged.location, [merged.section, merged.plot_number, merged.grave_number].filter(Boolean).join(', '), 'Garden of Peace, Section A, Plot 142'),
  };
};
const mapTribute = tribute => ({
  id: valueOf(tribute?.id, tribute?.created_at, Math.random().toString()),
  avatar: imageSource(valueOf(tribute?.user?.profile_picture, tribute?.author?.profile_picture, tribute?.avatar)),
  content: valueOf(tribute?.body, tribute?.content, tribute?.message, ''),
  likes: valueOf(tribute?.hearts_count, tribute?.likes_count, tribute?.reactions_count, 0),
  name: valueOf(tribute?.author_name, tribute?.user?.name, tribute?.author?.name, tribute?.name, 'Family Member'),
  time: valueOf(tribute?.created_at_human, tribute?.time_ago, tribute?.created_at, ''),
});

const staticPhotos = [AppAssets.images.vendor1, AppAssets.images.vendor1, AppAssets.images.vendor1];
const staticServices = [
  { date: 'Oct 30, 2025', iconName: 'local-florist', title: 'Flower Placement' },
  { date: 'Oct 15, 2025', iconName: 'calendar-today', title: 'Grave Cleaning' },
];

const MemorialProfileScreen = ({ navigation, route }) => {
  const initialMemorial = route?.params?.memorial ?? defaultMemorial;
  const memorialId = valueOf(initialMemorial.id, initialMemorial.memorial_id);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const insets = useSafeAreaInsets();
  const { data: detailData, isLoading: isDetailLoading } = useGetClientMemorialDetailQuery(memorialId, { skip: !memorialId });
  const { data: tributesData = [], isLoading: isTributesLoading } = useGetClientMemorialTributesQuery(memorialId, { skip: !memorialId });
  const memorial = useMemo(() => mapMemorial(detailData, initialMemorial), [detailData, initialMemorial]);
  const tributes = useMemo(() => tributesData.map(mapTribute), [tributesData]);

  return (
    <ScreenWrapper safeAreaEdges={[]} style={styles.screen}>
      <View style={styles.root}>
        <View style={[styles.statusBand, { height: insets.top }]} />
        <ProfileHeader
          onBack={() => navigation.goBack()}
          onShare={() => setIsShareOpen(true)}
          topOffset={insets.top}
        />
        <ScrollView bounces showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.avatarBlock}>
              <Image source={memorial.image} resizeMode="cover" style={styles.avatar} />
              <View style={styles.relationPill}>
                <AppText style={styles.relationText}>{memorial.relation}</AppText>
              </View>
            </View>
            <LineBreak height={0.85} />
            <AppText style={styles.name}>{memorial.name}</AppText>
            <LineBreak height={0.85} />
            <AppText style={styles.dates}>{memorial.dates}</AppText>
            <LineBreak height={1.29} />
            <AppText style={styles.quote}>"{memorial.quote}"</AppText>
            {isDetailLoading ? <AppText style={styles.dates}>Loading latest details...</AppText> : null}
            <LineBreak height={2.58} />
            <StatsRow />
            <LineBreak height={2.58} />
            <ActionButtons memorial={memorial} memorialId={memorialId} navigation={navigation} />
            <LineBreak height={2.58} />
            <LocationCard memorial={memorial} navigation={navigation} />
          </View>

          <View style={styles.stickyTabWrap}>
            <TabSelector selectedTab={selectedTab} onSelect={setSelectedTab} />
          </View>
          <View style={styles.tabContent}>
            {selectedTab === 0 ? (
              <TributesTab
                isLoading={isTributesLoading}
                memorial={memorial}
                memorialId={memorialId}
                navigation={navigation}
                tributes={tributes}
              />
            ) : null}
            {selectedTab === 1 ? (
              <PhotosTab
                memorialId={memorialId}
                navigation={navigation}
              />
            ) : null}
            {selectedTab === 2 ? (
              <InfoTab
                navigation={navigation}
              />
            ) : null}
          </View>
        </ScrollView>

        <ShareModal visible={isShareOpen} onClose={() => setIsShareOpen(false)} />
      </View>
    </ScreenWrapper>
  );
};

const ProfileHeader = ({ onBack, onShare, topOffset }) => (
  <ImageBackground source={AppAssets.images.vendor3} resizeMode="cover" style={[styles.header, { marginTop: topOffset }]}> 
    <View style={styles.headerOverlay} />
    <View style={styles.headerActions}>
      <TouchableOpacity activeOpacity={0.75} onPress={onBack} style={styles.headerIcon}>
        <AppIcon iconSet="ion" name="chevron-back" color={AppColors.white} size={22} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.75} onPress={onShare} style={styles.shareIcon}>
        <AppIcon name="share" color={AppColors.black} size={20} />
      </TouchableOpacity>
    </View>
  </ImageBackground>
);

const StatsRow = () => (
  <View style={styles.statsRow}>
    <StatCard count="147" label="Tributes" />
    <StatCard count="89" label="Photos" />
    <StatCard count="23" label="Visitors" />
  </View>
);

const StatCard = ({ count, label }) => (
  <GlassCard contentStyle={styles.statCard}>
    <AppText style={styles.statCount}>{count}</AppText>
    <LineBreak height={0.42} />
    <AppText style={styles.statLabel}>{label}</AppText>
  </GlassCard>
);

const ActionButtons = ({ memorial, memorialId, navigation }) => (
  <View style={styles.actionRow}>
    <TouchableOpacity activeOpacity={0.82} onPress={() => navigation.navigate('BookService')} style={styles.bookBtn}>
      <AppIcon name="account-tree" color={AppColors.white} size={18} />
      <AppText style={styles.bookBtnText}>Book Service</AppText>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.82} onPress={() => navigation.navigate('MemorialWall', { memorial, memorialId })} style={styles.wallBtn}>
      <AppIcon iconSet="ion" name="heart-outline" color={AppColors.white} size={18} />
      <AppText style={styles.wallBtnText}>Memorial Wall</AppText>
    </TouchableOpacity>
  </View>
);

const LocationCard = ({ memorial, navigation }) => (
  <GlassCard contentStyle={styles.locationCard}>
    <View style={styles.locationIcon}>
      <AppIcon name="location-on" color={AppColors.memorialCard} size={20} />
    </View>
    <View style={styles.locationCopy}>
      <AppText style={styles.locationTitle}>{memorial.cemetery}</AppText>
      <AppText style={styles.locationSubtitle}>{memorial.locationLine || 'Location details not added'}</AppText>
    </View>
    <TouchableOpacity activeOpacity={0.82} onPress={() => navigation.navigate('MapSelection')} style={styles.directionsBtn}>
      <AppText style={styles.directionsText}>Directions</AppText>
    </TouchableOpacity>
  </GlassCard>
);

const TabSelector = ({ onSelect, selectedTab }) => {
  const tabs = ['Tributes', 'Photos', 'Info'];
  return (
    <View style={styles.tabSelector}>
      {tabs.map((tab, index) => {
        const isSelected = selectedTab === index;
        return (
          <TouchableOpacity key={tab} activeOpacity={0.82} onPress={() => onSelect(index)} style={[styles.tabItem, isSelected && styles.tabItemActive]}>
            <AppText style={[styles.tabText, isSelected && styles.tabTextActive]}>{tab}</AppText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const TributesTab = ({ isLoading, memorial, memorialId, navigation, tributes }) => (
  <View>
    <GlassCard contentStyle={styles.bioCard}>
      <AppText style={styles.bioText}>Robert James Thompson was a devoted father, husband, and community leader. He spent 35 years teaching mathematics at Lincoln High...</AppText>
      <LineBreak height={1.72} />
      <AppText style={styles.readBio}>Read full biography →</AppText>
    </GlassCard>
    <LineBreak height={2.58} />
    {isLoading ? <EmptyText text="Loading tributes..." /> : null}
    {!isLoading && !tributes.length ? <EmptyText text="No tributes yet. Be the first to share one." /> : null}
    {tributes.map(tribute => (
      <View key={tribute.id}>
        <TributeCard {...tribute} />
        <LineBreak height={1.72} />
      </View>
    ))}
    <LineBreak height={0.86} />
    <View style={styles.tributeButtons}>
      <TouchableOpacity activeOpacity={0.82} onPress={() => navigation.navigate('MemorialWall', { memorial, memorialId })} style={styles.outlineAction}>
        <AppText style={styles.outlineActionText}>View All Tributes</AppText>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.82} onPress={() => navigation.navigate('AddTribute', { memorialId })} style={styles.filledAction}>
        <AppIcon iconSet="ion" name="heart" color={AppColors.white} size={18} />
        <AppText style={styles.filledActionText}>Add Tribute</AppText>
      </TouchableOpacity>
    </View>
  </View>
);

const EmptyText = ({ text }) => <AppText style={styles.heartsText}>{text}</AppText>;

const TributeCard = ({ avatar, content, likes, name, time }) => (
  <View style={styles.tributeCard}>
    <View style={styles.tributeTop}>
      <Image source={avatar} style={styles.tributeAvatar} />
      <View>
        <AppText style={styles.tributeName}>{name}</AppText>
        <AppText style={styles.tributeTime}>{time}</AppText>
      </View>
    </View>
    <LineBreak height={1.29} />
    <AppText style={styles.tributeContent}>{content}</AppText>
    <LineBreak height={1.72} />
    <View style={styles.divider} />
    <LineBreak height={0.85} />
    <View style={styles.heartsRow}>
      <AppIcon iconSet="ion" name="heart" color={AppColors.white} size={16} />
      <AppText style={styles.heartsText}>{likes} hearts</AppText>
    </View>
  </View>
);

const PhotosTab = ({ memorialId, navigation }) => (
  <View>
    <View style={styles.photosRow}>
      <TouchableOpacity activeOpacity={0.82} style={styles.addPhotoCard}>
        <AppIcon name="photo-camera" color={AppColors.white} size={22} />
        <LineBreak height={0.85} />
        <AppText style={styles.addPhotoText}>Add Photo</AppText>
      </TouchableOpacity>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photosList}>
        {staticPhotos.map((image, index) => <Image key={index} source={image} style={styles.photoItem} />)}
      </ScrollView>
    </View>
    <LineBreak height={1.4} />
    <LineBreak height={2.58} />
    <TouchableOpacity activeOpacity={0.82} onPress={() => navigation.navigate('ViewMemorialPhotos', { memorialId })} style={styles.fullButton}>
      <AppText style={styles.fullButtonText}>View All 89 Photos</AppText>
    </TouchableOpacity>
  </View>
);

const InfoTab = ({ navigation }) => (
  <View>
    <InfoCard title="Memorial Details">
      <DetailLine label="Full Name" value="Robert James Thompson" />
      <DetailLine label="Born" value="January 15, 1945" />
      <DetailLine label="Passed" value="March 20, 2020" />
      <DetailLine label="Age" value="81 years" />
    </InfoCard>
    <LineBreak height={2.58} />
    <InfoCard title="Recent Services">
      {staticServices.map(service => (
        <View key={service.title}>
          <ServiceLine date={service.date} iconName={service.iconName} title={service.title} />
          <LineBreak height={1.72} />
        </View>
      ))}
      <TouchableOpacity activeOpacity={0.82} onPress={() => navigation.navigate('ViewMemorialServiceInfo')} style={styles.fullButton}>
        <AppText style={styles.fullButtonText}>View All Services</AppText>
      </TouchableOpacity>
    </InfoCard>
  </View>
);

const InfoCard = ({ children, title }) => (
  <View style={styles.infoCard}>
    <AppText style={styles.infoTitle}>{title}</AppText>
    <LineBreak height={2.15} />
    {children}
  </View>
);

const DetailLine = ({ label, value }) => (
  <View style={styles.detailLine}>
    <AppText style={styles.detailLabel}>{label}</AppText>
    <AppText style={styles.detailValue}>{value}</AppText>
  </View>
);

const ServiceLine = ({ date, iconName, title }) => (
  <View style={styles.serviceLine}>
    <View style={styles.serviceIconWrap}>
      <AppIcon name={iconName} color={AppColors.white} size={responsiveWidth(5.8)} />
    </View>
    <View style={styles.serviceCopy}>
      <AppText style={styles.serviceTitle}>{title}</AppText>
      <AppText style={styles.serviceDate}>{date}</AppText>
    </View>
    <View style={styles.completedPill}>
      <AppText style={styles.completedText}>Completed</AppText>
    </View>
  </View>
);

const ShareModal = ({ onClose, visible }) => (
  <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
    <View style={styles.modalBackdrop}>
      <View style={styles.modalSheet}>
        <View style={styles.modalTop}>
          <AppText style={styles.modalTitle}>Share via:</AppText>
          <TouchableOpacity activeOpacity={0.75} onPress={onClose} style={styles.modalClose}>
            <AppIcon name="close" color={AppColors.white} size={24} />
          </TouchableOpacity>
        </View>
        <LineBreak height={2.15} />
        <View style={styles.shareButtons}>
          <ShareButton iconSet="ion" icon="logo-whatsapp" label="WhatsApp" onPress={onClose} />
          <ShareButton iconSet="ion" icon="mail-outline" label="Email" onPress={onClose} />
        </View>
        <LineBreak height={2.58} />
        <AppText style={styles.modalTitle}>Or copy link:</AppText>
        <LineBreak height={1.29} />
        <View style={styles.copyRow}>
          <View style={styles.copyInput}>
            <AppText numberOfLines={1} style={styles.copyLink}>https://memorialcare.app/post/1...</AppText>
          </View>
          <TouchableOpacity activeOpacity={0.82} onPress={onClose} style={styles.copyBtn}>
            <AppIcon name="content-copy" color={AppColors.white} size={16} />
            <AppText style={styles.copyText}>Copy</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const ShareButton = ({ icon, iconSet, label, onPress }) => (
  <TouchableOpacity activeOpacity={0.82} onPress={onPress} style={styles.shareBtn}>
    <AppIcon iconSet={iconSet} name={icon} color={AppColors.white} size={28} />
    <LineBreak height={0.85} />
    <AppText style={styles.shareBtnText}>{label}</AppText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  screen: { backgroundColor: AppColors.bgDark },
  root: { flex: 1 },
  statusBand: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: AppColors.homeBody,
    zIndex: 2,
  },
  header: {
    height: responsiveHeight(21.5),
    width: '100%',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(4, 47, 103, 0.72)',
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(1.93),
    paddingTop: responsiveHeight(5.15),
  },
  headerIcon: {
    alignItems: 'center',
    height: responsiveWidth(10),
    justifyContent: 'center',
    width: responsiveWidth(10),
  },
  shareIcon: {
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: responsiveWidth(5),
    height: responsiveWidth(10),
    justifyContent: 'center',
    marginRight: responsiveWidth(1.93),
    width: responsiveWidth(10),
  },
  content: {
    alignItems: 'center',
    padding: responsiveWidth(5.8),
  },
  avatarBlock: {
    alignItems: 'center',
    marginBottom: responsiveHeight(1.29),
  },
  avatar: {
    borderColor: AppColors.white,
    borderRadius: responsiveWidth(12.08),
    borderWidth: 2,
    height: responsiveWidth(24.15),
    width: responsiveWidth(24.15),
  },
  relationPill: {
    backgroundColor: AppColors.white,
    borderColor: AppColors.memorialCard,
    borderRadius: 12,
    borderWidth: 2,
    marginTop: -responsiveHeight(1.5),
    paddingHorizontal: responsiveWidth(2.9),
    paddingVertical: responsiveHeight(0.42),
  },
  relationText: {
    color: AppColors.memorialCard,
    fontSize: responsiveFontSize(1.3),
    fontWeight: '700',
  },
  name: {
    color: AppColors.white,
    fontSize: responsiveFontSize(2.15),
    fontWeight: '700',
    textAlign: 'center',
  },
  dates: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.52),
  },
  quote: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.52),
    fontStyle: 'italic',
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    gap: responsiveWidth(2.9),
    width: '100%',
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    flex: 1,
    height: responsiveHeight(9.15),
    justifyContent: 'center',
    padding: responsiveWidth(2.9),
  },
  statCount: {
    color: AppColors.white,
    fontSize: responsiveFontSize(2.35),
    fontWeight: '700',
  },
  statLabel: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.3),
  },
  actionRow: {
    flexDirection: 'row',
    gap: responsiveWidth(2.9),
    width: '100%',
  },
  bookBtn: {
    alignItems: 'center',
    backgroundColor: AppColors.homeActionCard,
    borderRadius: 30,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: responsiveHeight(1.5),
  },
  bookBtnText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.35),
    fontWeight: '700',
    marginLeft: responsiveWidth(1.5),
  },
  wallBtn: {
    alignItems: 'center',
    backgroundColor: '#76A1C8',
    borderColor: AppColors.homeBorder,
    borderRadius: 30,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: responsiveHeight(1.5),
  },
  wallBtnText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.35),
    marginLeft: responsiveWidth(1.5),
  },
  locationCard: {
    alignItems: 'center',
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    flexDirection: 'row',
    padding: responsiveWidth(3.86),
    width: '100%',
  },
  locationIcon: {
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderRadius: responsiveWidth(5),
    height: responsiveWidth(10),
    justifyContent: 'center',
    width: responsiveWidth(10),
  },
  locationCopy: {
    flex: 1,
    marginLeft: responsiveWidth(3.86),
  },
  locationTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.52),
  },
  locationSubtitle: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.3),
  },
  directionsBtn: {
    backgroundColor: AppColors.homeActionCard,
    borderRadius: 20,
    paddingHorizontal: responsiveWidth(2.9),
    paddingVertical: responsiveHeight(0.85),
  },
  directionsText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.18),
    fontWeight: '700',
  },
  stickyTabWrap: {
    paddingHorizontal: responsiveWidth(5.8),
    paddingVertical: responsiveHeight(1.72),
  },
  tabSelector: {
    backgroundColor: AppColors.homeActionCard,
    borderColor: AppColors.homeBorder,
    borderRadius: 30,
    borderWidth: 1,
    flexDirection: 'row',
    height: responsiveHeight(5.15),
    padding: 4,
  },
  tabItem: {
    alignItems: 'center',
    borderRadius: 24,
    flex: 1,
    justifyContent: 'center',
  },
  tabItemActive: {
    backgroundColor: AppColors.memorialCard,
  },
  tabText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.52),
  },
  tabTextActive: {
    color: AppColors.white,
    fontWeight: '700',
  },
  tabContent: {
    paddingHorizontal: responsiveWidth(5.8),
    paddingBottom: responsiveHeight(4.3),
  },
  bioCard: {
    alignItems: 'center',
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    padding: responsiveWidth(4.83),
  },
  bioText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.52),
    lineHeight: responsiveHeight(2.4),
    textAlign: 'center',
  },
  readBio: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.52),
    fontWeight: '700',
  },
  tributeCard: {
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    borderRadius: 16,
    borderWidth: 1,
    padding: responsiveWidth(3.86),
  },
  tributeTop: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  tributeAvatar: {
    borderRadius: responsiveWidth(3.86),
    height: responsiveWidth(7.72),
    marginRight: responsiveWidth(2.9),
    width: responsiveWidth(7.72),
  },
  tributeName: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.4),
    fontWeight: '700',
  },
  tributeTime: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.18),
  },
  tributeContent: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.52),
    lineHeight: responsiveHeight(2.35),
  },
  divider: {
    backgroundColor: AppColors.homeBorder,
    height: 1,
  },
  heartsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  heartsText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.18),
    marginLeft: responsiveWidth(1.45),
  },
  tributeButtons: {
    flexDirection: 'row',
    gap: responsiveWidth(3.86),
  },
  outlineAction: {
    alignItems: 'center',
    borderColor: AppColors.homeBorder,
    borderRadius: 30,
    borderWidth: 1,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: responsiveHeight(1.5),
  },
  outlineActionText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.32),
  },
  filledAction: {
    alignItems: 'center',
    backgroundColor: AppColors.homeActionCard,
    borderRadius: 30,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: responsiveHeight(1.5),
  },
  filledActionText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.32),
    fontWeight: '700',
    marginLeft: responsiveWidth(1.45),
  },
  photosRow: {
    flexDirection: 'row',
  },
  addPhotoCard: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: AppColors.homeBorder,
    borderRadius: 16,
    borderWidth: 1,
    height: responsiveWidth(24.15),
    justifyContent: 'center',
    width: responsiveWidth(24.15),
  },
  addPhotoText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.18),
  },
  photosList: {
    marginLeft: responsiveWidth(2.9),
  },
  photoItem: {
    borderRadius: 16,
    height: responsiveWidth(24.15),
    marginRight: responsiveWidth(2.9),
    width: responsiveWidth(24.15),
  },
  fullButton: {
    alignItems: 'center',
    backgroundColor: AppColors.homeActionCard,
    borderRadius: 30,
    justifyContent: 'center',
    paddingVertical: responsiveHeight(1.5),
    width: '100%',
  },
  fullButtonText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.52),
    fontWeight: '700',
  },
  infoCard: {
    backgroundColor: AppColors.memorialCard,
    borderColor: AppColors.homeBorder,
    borderRadius: 16,
    borderWidth: 1,
    padding: responsiveWidth(4.83),
  },
  infoTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.52),
  },
  detailLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(1.72),
  },
  detailLabel: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.3),
  },
  detailValue: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.3),
    fontWeight: '500',
  },
  serviceLine: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  serviceIconWrap: {
    alignItems: 'center',
    height: responsiveWidth(7.25),
    justifyContent: 'center',
    width: responsiveWidth(7.25),
  },
  serviceCopy: {
    flex: 1,
    marginLeft: responsiveWidth(3.86),
  },
  serviceTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.4),
    fontWeight: '700',
  },
  serviceDate: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.18),
  },
  completedPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: responsiveWidth(2.4),
    paddingVertical: responsiveHeight(0.42),
  },
  completedText: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.08),
  },
  modalBackdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: AppColors.homeCard,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: responsiveWidth(5.8),
    paddingTop: responsiveHeight(2.58),
    paddingBottom: responsiveHeight(4.3),
  },
  modalTop: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalClose: {
    alignItems: 'center',
    height: responsiveWidth(8.7),
    justifyContent: 'center',
    width: responsiveWidth(8.7),
  },
  modalTitle: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.75),
  },
  shareButtons: {
    flexDirection: 'row',
    gap: responsiveWidth(3.86),
  },
  shareBtn: {
    alignItems: 'center',
    backgroundColor: AppColors.homeActionCard,
    borderRadius: 14,
    flex: 1,
    height: responsiveHeight(9.65),
    justifyContent: 'center',
  },
  shareBtnText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.4),
  },
  copyRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: responsiveWidth(2.4),
  },
  copyInput: {
    borderColor: AppColors.homeBorder,
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    height: responsiveHeight(5.8),
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(3.86),
  },
  copyLink: {
    color: AppColors.homeTextMuted,
    fontSize: responsiveFontSize(1.4),
  },
  copyBtn: {
    alignItems: 'center',
    backgroundColor: AppColors.homeActionCard,
    borderRadius: 14,
    flexDirection: 'row',
    height: responsiveHeight(5.8),
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(3.86),
  },
  copyText: {
    color: AppColors.white,
    fontSize: responsiveFontSize(1.4),
    marginLeft: responsiveWidth(1),
  },
});

export default MemorialProfileScreen;
