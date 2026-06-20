import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import AppIcon from '../../../components/AppIcon';
import AppImageHeader from '../../../components/AppImageHeader';
import AppText from '../../../components/AppText';
import GlassCard from '../../../components/GlassCard';
import LineBreak from '../../../components/LineBreak';
import ScreenWrapper from '../../../components/ScreenWrapper';
import {
  useGetClientWalletQuery,
  useGetClientWalletTransactionsQuery,
} from '../../../redux/api/userApi';
import { AppAssets } from '../../../utils/AppAssets';
import { AppColors } from '../../../utils/AppColors';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../../../utils/Responsive_Dimensions';

const firstValue = (...values) =>
  values.find(value => value !== undefined && value !== null && value !== '');

const mapTransaction = item => {
  const amount = firstValue(item?.amount, item?.hearts, 0);
  const numericAmount = Number(amount);
  const isCredit = firstValue(item?.type, item?.transaction_type, '') === 'credit' || numericAmount > 0;

  return [
    firstValue(item?.title, item?.description, item?.service_name, 'Transaction'),
    firstValue(item?.formatted_date, item?.created_at, item?.date, 'Date unavailable'),
    `${numericAmount > 0 ? '+' : ''}${Number.isNaN(numericAmount) ? amount : numericAmount}`,
    isCredit,
  ];
};

const UserCoinsWalletScreen = ({ navigation }) => {
  const [tab, setTab] = useState(0);
  const { data: walletData, isLoading: isWalletLoading, isError: isWalletError } = useGetClientWalletQuery();
  const { data: transactionData = [], isLoading: isTransactionsLoading } = useGetClientWalletTransactionsQuery();
  const transactions = transactionData.map(mapTransaction);
  const wallet = {
    balance: firstValue(
      walletData?.balance,
      walletData?.hearts,
      walletData?.available_balance,
      0,
    ),
    spent: firstValue(walletData?.month_spent, walletData?.spent_this_month, 0),
    earned: firstValue(walletData?.month_earned, walletData?.earned_this_month, 0),
  };

  return (
    <ScreenWrapper isScroll contentContainerStyle={styles.content}>
      <AppImageHeader
        image={AppAssets.images.userDashboardFront}
        onBack={() => navigation.goBack()}
        title="My Hearts Wallet"
        subtitle="Manage your hearts and transactions"
        height={responsiveHeight(23.8)}
      />
      <View style={styles.body}>
        <View style={styles.tabWrap}>
          {['Balance', 'History'].map((label, index) => (
            <TouchableOpacity
              key={label}
              activeOpacity={0.82}
              onPress={() => setTab(index)}
              style={[styles.tabItem, tab === index && styles.tabItemActive]}>
              <AppText style={[styles.tabText, tab === index && styles.tabTextActive]}>{label}</AppText>
            </TouchableOpacity>
          ))}
        </View>
        <LineBreak height={2.4} />
        {tab === 0 ? (
          <BalanceView
            isLoading={isWalletLoading || isTransactionsLoading}
            isError={isWalletError}
            navigation={navigation}
            onHistory={() => setTab(1)}
            transactions={transactions}
            wallet={wallet}
          />
        ) : (
          <HistoryView transactions={transactions} />
        )}
      </View>
    </ScreenWrapper>
  );
};

const BalanceView = ({ isError, isLoading, navigation, onHistory, transactions, wallet }) => (
  <>
    <GlassCard contentStyle={styles.balanceCard}>
      <View style={styles.balanceTop}>
        <View>
          <AppText style={styles.muted}>Available Balance</AppText>
          <View style={styles.heartsRow}>
            <AppIcon name="favorite-border" color={AppColors.white} size={31} />
            <AppText style={styles.hearts}>{wallet.balance}</AppText>
            <AppText style={styles.heartsLabel}>Hearts</AppText>
          </View>
          <AppText style={styles.muted}>≈ ${wallet.balance}.00 USD</AppText>
        </View>
        <View style={styles.walletCircle}>
          <AppIcon name="account-balance-wallet" color={AppColors.themeColor} size={24} />
        </View>
      </View>
      <View style={styles.cardDivider} />
      <View style={styles.statRow}>
        <Stat label="This Month Spent" value={`${wallet.spent}`} />
        <Stat label="This Month Earned" value={`${wallet.earned}`} />
      </View>
    </GlassCard>

    <View style={styles.walletActions}>
      <ActionTile icon="add" title="Purchase Hearts" onPress={() => navigation.navigate('PurchaseHearts')} />
      <ActionTile icon="send" title="Share Hearts" dark onPress={() => navigation.navigate('ShareHearts')} />
    </View>

    <GlassCard contentStyle={styles.howCard}>
      <View style={styles.smallCircle}>
        <AppIcon name="trending-up" color={AppColors.themeColor} size={20} />
      </View>
      <View style={styles.howCopy}>
        <AppText style={styles.infoTitle}>How Hearts Work</AppText>
        <AppText style={styles.infoBody}>1 Heart = $1.00 USD. Use hearts to pay for services, share with family members, or save for future memorial care needs.</AppText>
      </View>
    </GlassCard>

    <View style={styles.sectionRow}>
      <AppText style={styles.sectionTitle}>Recent Transactions</AppText>
      <TouchableOpacity onPress={onHistory}>
        <AppText style={styles.viewAll}>View All</AppText>
      </TouchableOpacity>
    </View>
    {isLoading ? <EmptyState text="Loading wallet..." /> : null}
    {isError ? <EmptyState text="Unable to load wallet." /> : null}
    {!isLoading && !isError && !transactions.length ? <EmptyState text="No transactions found." /> : null}
    {transactions.slice(0, 3).map(item => <Transaction key={`${item[0]}-${item[1]}`} item={item} />)}
  </>
);

const HistoryView = ({ transactions }) => (
  <View>
    <View style={styles.historyHeader}>
      <AppText style={styles.sectionTitle}>All Transactions</AppText>
      <AppText style={styles.historyCount}>{transactions.length} transactions</AppText>
    </View>
    {transactions.length ? (
      transactions.map(item => <Transaction key={`${item[0]}-${item[1]}`} item={item} />)
    ) : (
      <EmptyState text="No transactions found." />
    )}
  </View>
);

const EmptyState = ({ text }) => (
  <GlassCard contentStyle={styles.emptyCard}>
    <AppText style={styles.emptyText}>{text}</AppText>
  </GlassCard>
);

const Stat = ({ label, value }) => (
  <View>
    <AppText style={styles.statLabel}>{label}</AppText>
    <View style={styles.statValueRow}>
      <AppIcon name="favorite-border" color={AppColors.white} size={14} />
      <AppText style={styles.statValue}>{value}</AppText>
    </View>
  </View>
);

const ActionTile = ({ dark, icon, onPress, title }) => (
  <TouchableOpacity activeOpacity={0.84} onPress={onPress} style={[styles.actionTile, dark && styles.actionTileDark]}>
    <View style={[styles.actionIconCircle, dark && styles.actionIconCircleLight]}>
      <AppIcon name={icon} color={AppColors.themeColor} size={20} />
    </View>
    <AppText style={[styles.actionTileText, dark && styles.actionTileTextDark]}>{title}</AppText>
  </TouchableOpacity>
);

const Transaction = ({ item }) => (
  <GlassCard contentStyle={styles.transaction}>
    <View style={styles.smallCircle}>
      <AppIcon name={item[3] ? 'add' : 'remove'} color={AppColors.themeColor} size={18} />
    </View>
    <View style={styles.transactionCopy}>
      <AppText style={styles.infoTitle}>{item[0]}</AppText>
      <AppText style={styles.muted}>{item[1]}</AppText>
    </View>
    <AppText style={[styles.amount, item[3] && styles.amountCredit]}>{item[2]}</AppText>
  </GlassCard>
);

const styles = StyleSheet.create({
  content: { paddingBottom: responsiveHeight(6) },
  body: { paddingHorizontal: responsiveWidth(5.8), paddingTop: responsiveHeight(2.4) },
  emptyCard: { alignItems: 'center', backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  emptyText: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.35), textAlign: 'center' },
  tabWrap: { flexDirection: 'row', height: responsiveHeight(5.2), padding: 4, borderRadius: 12, backgroundColor: AppColors.onboardingButton },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 10 },
  tabItemActive: { backgroundColor: AppColors.memorialCard },
  tabText: { color: AppColors.white, fontSize: responsiveFontSize(1.35), fontWeight: '700' },
  tabTextActive: { color: AppColors.white },
  balanceCard: { backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  balanceTop: { flexDirection: 'row', justifyContent: 'space-between' },
  muted: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.25) },
  heartsRow: { alignItems: 'flex-end', flexDirection: 'row', marginVertical: responsiveHeight(0.85) },
  hearts: { color: AppColors.white, fontSize: responsiveFontSize(4.1), fontWeight: '700', marginLeft: responsiveWidth(2) },
  heartsLabel: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.35), marginBottom: responsiveHeight(0.55), marginLeft: responsiveWidth(2) },
  walletCircle: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(11.6), height: responsiveWidth(11.6), borderRadius: responsiveWidth(5.8), backgroundColor: AppColors.white },
  cardDivider: { height: 0.5, backgroundColor: AppColors.homeBorder, marginVertical: responsiveHeight(2) },
  statRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statLabel: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.15) },
  statValueRow: { alignItems: 'center', flexDirection: 'row', marginTop: responsiveHeight(0.4) },
  statValue: { color: AppColors.white, fontSize: responsiveFontSize(1.8), fontWeight: '700', marginLeft: responsiveWidth(1) },
  walletActions: { flexDirection: 'row', gap: responsiveWidth(3.8), marginVertical: responsiveHeight(2.4) },
  actionTile: { flex: 1, alignItems: 'center', borderRadius: 16, paddingVertical: responsiveHeight(2.5), backgroundColor: AppColors.homeActionCard },
  actionTileDark: { backgroundColor: AppColors.memorialCard, borderWidth: 0.5, borderColor: AppColors.homeBorder },
  actionIconCircle: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(9.8), height: responsiveWidth(9.8), borderRadius: responsiveWidth(4.9), backgroundColor: AppColors.white },
  actionIconCircleLight: { backgroundColor: AppColors.white },
  smallCircle: { alignItems: 'center', justifyContent: 'center', width: responsiveWidth(9.8), height: responsiveWidth(9.8), borderRadius: responsiveWidth(4.9), backgroundColor: AppColors.white },
  smallCircleLight: { backgroundColor: AppColors.white },
  actionTileText: { color: AppColors.white, fontSize: responsiveFontSize(1.35), fontWeight: '700', marginTop: responsiveHeight(1.2), textAlign: 'center' },
  actionTileTextDark: { color: AppColors.white },
  howCard: { flexDirection: 'row', backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder },
  howCopy: { flex: 1, marginLeft: responsiveWidth(3.8) },
  infoTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.45), fontWeight: '700' },
  infoBody: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.25), lineHeight: responsiveHeight(2.1), marginTop: responsiveHeight(0.75) },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: responsiveHeight(3), marginBottom: responsiveHeight(1.4) },
  sectionTitle: { color: AppColors.white, fontSize: responsiveFontSize(1.8), fontWeight: '700' },
  viewAll: { color: AppColors.white, fontSize: responsiveFontSize(1.35) },
  historyHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: responsiveHeight(1.6) },
  historyCount: { color: AppColors.homeTextMuted, fontSize: responsiveFontSize(1.2) },
  transaction: { flexDirection: 'row', alignItems: 'center', backgroundColor: AppColors.memorialCard, borderColor: AppColors.homeBorder, marginBottom: responsiveHeight(1.2) },
  transactionCopy: { flex: 1, marginLeft: responsiveWidth(3.8) },
  amount: { color: '#FFB7B7', fontSize: responsiveFontSize(1.45), fontWeight: '700' },
  amountCredit: { color: '#B0E2D6' },
});

export default UserCoinsWalletScreen;
