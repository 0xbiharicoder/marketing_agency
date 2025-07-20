import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { PortfolioData, AssetItem } from '@/modules/data-module';

const { width } = Dimensions.get('window');

interface AssetAllocationChartProps {
  portfolio?: PortfolioData;
}

export default function AssetAllocationChart({ portfolio }: AssetAllocationChartProps) {
  const chartData = useMemo(() => {
    if (!portfolio?.items) return [];

    const tokenValues: { [key: string]: number } = {};
    let totalValue = 0;

    // Calculate value for each token
    portfolio.items.forEach((item: AssetItem) => {
      if (item.assetType === 'token' && item.token_info?.price_info?.total_price) {
        const value = item.token_info.price_info.total_price;
        tokenValues[item.symbol || item.name || 'Unknown'] = 
          (tokenValues[item.symbol || item.name || 'Unknown'] || 0) + value;
        totalValue += value;
      }
    });

    // Add SOL balance
    if (portfolio.nativeBalance?.lamports) {
      const solValue = (portfolio.nativeBalance.lamports / 1e9) * 200; // Placeholder SOL price
      tokenValues['SOL'] = (tokenValues['SOL'] || 0) + solValue;
      totalValue += solValue;
    }

    // Convert to chart format and limit to top 5
    const chartItems = Object.entries(tokenValues)
      .map(([name, value]) => ({
        name,
        value,
        color: getRandomColor(),
        legendFontColor: '#fff',
        legendFontSize: 12,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    return chartItems;
  }, [portfolio]);

  const getRandomColor = () => {
    const colors = ['#007AFF', '#34C759', '#FF9500', '#FF3B30', '#AF52DE', '#00C7BE'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (!chartData.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Asset Allocation</Text>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No allocation data available</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asset Allocation</Text>
      <PieChart
        data={chartData}
        width={width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#000',
          backgroundGradientFrom: '#000',
          backgroundGradientTo: '#000',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="value"
        backgroundColor="transparent"
        paddingLeft="15"
        center={[10, 10]}
      />
      
      {/* Legend */}
      <View style={styles.legendContainer}>
        {chartData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>
              {item.name}: ${item.value.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    borderRadius: 16,
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
  },
  legendContainer: {
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#fff',
  },
}); 