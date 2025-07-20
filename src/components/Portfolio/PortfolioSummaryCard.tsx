import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PortfolioSummaryCardProps {
  totalValue: number;
  change24h: number;
  loading?: boolean;
}

export default function PortfolioSummaryCard({ 
  totalValue, 
  change24h, 
  loading = false 
}: PortfolioSummaryCardProps) {
  const isPositive = change24h >= 0;
  const changeColor = isPositive ? '#00D484' : '#FF6B6B';
  const changeIcon = isPositive ? 'trending-up' : 'trending-down';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Total Portfolio Value</Text>
        {loading && (
          <Ionicons name="sync-outline" size={16} color="#666" />
        )}
      </View>
      
      <Text style={styles.totalValue}>
        ${totalValue.toLocaleString('en-US', { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 2 
        })}
      </Text>
      
      <View style={styles.changeContainer}>
        <Ionicons name={changeIcon} size={16} color={changeColor} />
        <Text style={[styles.changeText, { color: changeColor }]}>
          {isPositive ? '+' : ''}${Math.abs(change24h).toFixed(2)} ({isPositive ? '+' : ''}{((change24h / totalValue) * 100).toFixed(2)}%)
        </Text>
        <Text style={styles.changeLabel}>24h</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  totalValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  changeText: {
    fontSize: 16,
    fontWeight: '600',
  },
  changeLabel: {
    fontSize: 14,
    color: '#666',
  },
}); 