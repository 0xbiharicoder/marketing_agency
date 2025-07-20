import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTokenSearch, TokenInfo } from '@/modules/data-module';

interface SearchTokenModalProps {
  visible: boolean;
  onClose: () => void;
  onTokenSelect: (token: TokenInfo) => void;
}

export default function SearchTokenModal({ 
  visible, 
  onClose, 
  onTokenSelect 
}: SearchTokenModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { 
    tokens, 
    loading, 
    error, 
    searchQuery: currentQuery,
    setSearchQuery: updateSearchQuery,
    loadMore,
    refresh,
  } = useTokenSearch('', 300); // 300ms debounce

  // Update search when query changes
  useEffect(() => {
    updateSearchQuery(searchQuery);
  }, [searchQuery, updateSearchQuery]);

  const handleTokenSelect = (token: TokenInfo) => {
    onTokenSelect(token);
    setSearchQuery('');
    onClose();
  };

  const renderTokenItem = ({ item }: { item: TokenInfo }) => (
    <TouchableOpacity 
      style={styles.tokenItem}
      onPress={() => handleTokenSelect(item)}
    >
      <View style={styles.tokenInfo}>
        {item.logoURI ? (
          <Image source={{ uri: item.logoURI }} style={styles.tokenImage} />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="ellipse" size={20} color="#666" />
          </View>
        )}
        
        <View style={styles.tokenDetails}>
          <Text style={styles.tokenName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.tokenSymbol} numberOfLines={1}>
            {item.symbol}
          </Text>
        </View>
      </View>

      <View style={styles.tokenActions}>
        <Text style={styles.tokenAddress} numberOfLines={1}>
          {item.address.slice(0, 6)}...{item.address.slice(-4)}
        </Text>
        <Ionicons name="add-circle-outline" size={24} color="#007AFF" />
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons 
        name={searchQuery ? "search-outline" : "trending-up-outline"} 
        size={48} 
        color="#666" 
      />
      <Text style={styles.emptyStateText}>
        {searchQuery 
          ? `No tokens found for "${searchQuery}"` 
          : 'Search for tokens by name or symbol'
        }
      </Text>
      {!searchQuery && (
        <View style={styles.popularTokens}>
          <Text style={styles.popularTitle}>Popular Tokens</Text>
          {['SOL', 'USDC', 'BTC', 'ETH'].map((symbol) => (
            <TouchableOpacity 
              key={symbol}
              style={styles.popularToken}
              onPress={() => setSearchQuery(symbol)}
            >
              <Text style={styles.popularTokenText}>{symbol}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Search Tokens</Text>
          </View>
        </View>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search-outline" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search tokens..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
              returnKeyType="search"
              autoFocus
            />
            {searchQuery && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Results */}
        <View style={styles.resultsContainer}>
          {loading && tokens.length === 0 ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#007AFF" />
              <Text style={styles.loadingText}>Searching tokens...</Text>
            </View>
          ) : (
            <FlatList
              data={tokens}
              keyExtractor={(item) => item.address}
              renderItem={renderTokenItem}
              ListEmptyComponent={renderEmptyState}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loading && tokens.length > 0 ? (
                  <ActivityIndicator size="small" color="#007AFF" style={styles.footerLoader} />
                ) : null
              }
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={refresh} style={styles.retryButton}>
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tokenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 16,
    marginVertical: 4,
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tokenImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#222',
  },
  placeholderImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tokenDetails: {
    flex: 1,
  },
  tokenName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  tokenSymbol: {
    fontSize: 14,
    color: '#666',
  },
  tokenActions: {
    alignItems: 'flex-end',
  },
  tokenAddress: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  popularTokens: {
    marginTop: 32,
    alignItems: 'center',
  },
  popularTitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  popularToken: {
    backgroundColor: '#111',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginVertical: 4,
  },
  popularTokenText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
  footerLoader: {
    marginVertical: 20,
  },
  errorContainer: {
    backgroundColor: '#FF6B6B',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  retryButtonText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '600',
  },
}); 