import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Import modules
import { useWallet } from '@/modules/wallet-providers';
import { 
  useFetchTokens, 
  useFetchPortfolio,
  useCoingecko,
  TokenInfo,
  AssetItem,
  PortfolioData
} from '@/modules/data-module';
import { useFetchNFTs } from '@/modules/nft';

// Import components
import PortfolioSummaryCard from '../../components/Portfolio/PortfolioSummaryCard';
import TokenListItem from '../../components/Portfolio/TokenListItem';
import AssetAllocationChart from '../../components/Portfolio/AssetAllocationChart';
import PerformanceMetrics from '../../components/Portfolio/PerformanceMetrics';
import SearchTokenModal from '../../components/Portfolio/SearchTokenModal';

const { width, height } = Dimensions.get('window');

interface PortfolioScreenProps {
  navigation?: any;
}

export default function PortfolioScreen({ navigation }: PortfolioScreenProps) {
  const { publicKey, connected, disconnect } = useWallet();
  const walletAddress = publicKey?.toBase58();

  // State management
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<'tokens' | 'nfts' | 'analytics'>('tokens');
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState<number>(0);
  const [portfolioChange, setPortfolioChange] = useState<number>(0);

  // Data hooks
  const { 
    tokens, 
    loading: tokensLoading, 
    error: tokensError,
    refetch: refetchTokens 
  } = useFetchTokens(walletAddress);

  const { 
    portfolio, 
    loading: portfolioLoading, 
    error: portfolioError 
  } = useFetchPortfolio(walletAddress);

  const { 
    nfts, 
    loading: nftsLoading, 
    error: nftsError 
  } = useFetchNFTs(walletAddress);

  // Calculate portfolio metrics
  const portfolioMetrics = useMemo(() => {
    if (!portfolio?.items) return { totalValue: 0, tokenCount: 0, nftCount: 0 };

    let totalValue = 0;
    let tokenCount = 0;
    let nftCount = 0;

    portfolio.items.forEach((item: AssetItem) => {
      if (item.assetType === 'token' && item.token_info?.price_info?.total_price) {
        totalValue += item.token_info.price_info.total_price;
        tokenCount++;
      } else if (item.assetType === 'nft' || item.assetType === 'cnft') {
        nftCount++;
      }
    });

    // Add SOL balance if available
    if (portfolio.nativeBalance?.lamports) {
      const solBalance = portfolio.nativeBalance.lamports / 1e9;
      // You would need to fetch SOL price here
      // For now, estimating with a placeholder
      totalValue += solBalance * 200; // Placeholder SOL price
    }

    return { totalValue, tokenCount, nftCount };
  }, [portfolio]);

  // Refresh handler
  const onRefresh = useCallback(async () => {
    if (!connected || !walletAddress) return;
    
    setRefreshing(true);
    try {
      await Promise.all([
        refetchTokens?.(),
        // Add other refresh calls here
      ]);
    } catch (error) {
      console.error('Error refreshing portfolio:', error);
      Alert.alert('Error', 'Failed to refresh portfolio data');
    }
    setRefreshing(false);
  }, [connected, walletAddress, refetchTokens]);

  // Tab content renderers
  const renderTokensTab = () => {
    const tokenAssets = portfolio?.items?.filter(item => item.assetType === 'token') || [];
    
    return (
      <FlatList
        data={tokenAssets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TokenListItem 
            asset={item}
            onPress={() => navigation?.navigate('TokenDetail', { tokenAddress: item.mint })}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="wallet-outline" size={48} color="#666" />
            <Text style={styles.emptyStateText}>No tokens found</Text>
            <TouchableOpacity 
              style={styles.addTokenButton}
              onPress={() => setSearchModalVisible(true)}
            >
              <Text style={styles.addTokenButtonText}>Search Tokens</Text>
            </TouchableOpacity>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderNFTsTab = () => {
    const nftAssets = portfolio?.items?.filter(item => 
      item.assetType === 'nft' || item.assetType === 'cnft'
    ) || [];

    return (
      <FlatList
        data={nftAssets}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.nftItem}
            onPress={() => navigation?.navigate('NFTDetail', { mint: item.mint })}
          >
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.nftImage} />
            )}
            <Text style={styles.nftName} numberOfLines={1}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="image-outline" size={48} color="#666" />
            <Text style={styles.emptyStateText}>No NFTs found</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderAnalyticsTab = () => (
    <ScrollView 
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      showsVerticalScrollIndicator={false}
    >
      <AssetAllocationChart portfolio={portfolio} />
      <PerformanceMetrics portfolio={portfolio} />
      <View style={styles.analyticsSection}>
        <Text style={styles.sectionTitle}>Portfolio Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{portfolioMetrics.tokenCount}</Text>
            <Text style={styles.statLabel}>Tokens</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{portfolioMetrics.nftCount}</Text>
            <Text style={styles.statLabel}>NFTs</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>
              ${portfolioMetrics.totalValue.toFixed(2)}
            </Text>
            <Text style={styles.statLabel}>Total Value</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  // Wallet connection check
  if (!connected) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.disconnectedState}>
          <Ionicons name="wallet-outline" size={64} color="#666" />
          <Text style={styles.disconnectedText}>Connect your wallet to view portfolio</Text>
          <TouchableOpacity style={styles.connectButton}>
            <Text style={styles.connectButtonText}>Connect Wallet</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Loading state
  if (portfolioLoading && !portfolio?.items?.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingState}>
          <Ionicons name="sync-outline" size={48} color="#007AFF" />
          <Text style={styles.loadingText}>Loading portfolio...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Portfolio</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => setSearchModalVisible(true)}
          >
            <Ionicons name="search-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={onRefresh}
          >
            <Ionicons name="refresh-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Portfolio Summary */}
      <PortfolioSummaryCard 
        totalValue={portfolioMetrics.totalValue}
        change24h={portfolioChange}
        loading={portfolioLoading}
      />

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {['tokens', 'nfts', 'analytics'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab as any)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <View style={styles.tabContent}>
        {activeTab === 'tokens' && renderTokensTab()}
        {activeTab === 'nfts' && renderNFTsTab()}
        {activeTab === 'analytics' && renderAnalyticsTab()}
      </View>

      {/* Search Modal */}
      <SearchTokenModal
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
        onTokenSelect={(token) => {
          navigation?.navigate('TokenDetail', { tokenAddress: token.address });
          setSearchModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#111',
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  disconnectedState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  disconnectedText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  connectButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
    marginBottom: 20,
  },
  addTokenButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addTokenButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  nftItem: {
    flex: 1,
    margin: 8,
    backgroundColor: '#111',
    borderRadius: 12,
    overflow: 'hidden',
  },
  nftImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#222',
  },
  nftName: {
    padding: 12,
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  analyticsSection: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
}); 