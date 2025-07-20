import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AssetItem } from '@/modules/data-module';

interface TokenListItemProps {
  asset: AssetItem;
  onPress?: () => void;
}

export default function TokenListItem({ asset, onPress }: TokenListItemProps) {
  const tokenBalance = asset.token_info?.balance ? parseFloat(asset.token_info.balance) : 0;
  const tokenPrice = asset.token_info?.price_info?.price_per_token || 0;
  const totalValue = asset.token_info?.price_info?.total_price || 0;
  
  // Format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + 'K';
    }
    return num.toFixed(4);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.tokenInfo}>
        <View style={styles.tokenImageContainer}>
          {asset.image ? (
            <Image source={{ uri: asset.image }} style={styles.tokenImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Ionicons name="ellipse" size={20} color="#666" />
            </View>
          )}
        </View>
        
        <View style={styles.tokenDetails}>
          <Text style={styles.tokenName} numberOfLines={1}>
            {asset.name || 'Unknown Token'}
          </Text>
          <Text style={styles.tokenSymbol} numberOfLines={1}>
            {asset.symbol || 'N/A'}
          </Text>
          {tokenPrice > 0 && (
            <Text style={styles.tokenPrice}>
              ${tokenPrice < 0.01 ? tokenPrice.toFixed(6) : tokenPrice.toFixed(4)}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.tokenValue}>
        <Text style={styles.tokenAmount}>
          {formatNumber(tokenBalance)}
        </Text>
        <Text style={styles.tokenUsdValue}>
          ${totalValue.toFixed(2)}
        </Text>
        {/* Add 24h change if available */}
        {asset.token_info?.price_info && (
          <View style={styles.changeContainer}>
            <Text style={styles.changeText}>
              {/* Placeholder for price change - would need historical data */}
              --
            </Text>
          </View>
        )}
      </View>

      <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
  tokenImageContainer: {
    marginRight: 12,
  },
  tokenImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#222',
  },
  placeholderImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 2,
  },
  tokenPrice: {
    fontSize: 12,
    color: '#888',
  },
  tokenValue: {
    alignItems: 'flex-end',
    marginRight: 12,
  },
  tokenAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  tokenUsdValue: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    color: '#888',
  },
}); 