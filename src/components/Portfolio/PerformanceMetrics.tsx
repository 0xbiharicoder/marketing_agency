import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Ionicons } from '@expo/vector-icons';
import { PortfolioData } from '@/modules/data-module';

const { width } = Dimensions.get('window');

interface PerformanceMetricsProps {
  portfolio?: PortfolioData;
}

export default function PerformanceMetrics({ portfolio }: PerformanceMetricsProps) {
  // Mock data for now - in a real app, you'd track historical portfolio values
  const performanceData = useMemo(() => {
    // Generate sample data for the last 7 days
    const data = [];
    const baseValue = 1000;
    
    for (let i = 6; i >= 0; i--) {
      const variance = (Math.random() - 0.5) * 100;
      data.push(baseValue + variance);
    }
    
    return data;
  }, []);

  const chartData = {
    labels: ['6d', '5d', '4d', '3d', '2d', '1d', 'Now'],
    datasets: [
      {
        data: performanceData,
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const currentValue = performanceData[performanceData.length - 1];
  const previousValue = performanceData[0];
  const change = currentValue - previousValue;
  const changePercent = (change / previousValue) * 100;
  const isPositive = change >= 0;

  const metrics = [
    {
      title: '7-Day Performance',
      value: `${isPositive ? '+' : ''}${changePercent.toFixed(2)}%`,
      color: isPositive ? '#00D484' : '#FF6B6B',
      icon: isPositive ? 'trending-up' : 'trending-down',
    },
    {
      title: 'Best Performer',
      value: 'SOL',
      subvalue: '+12.5%',
      color: '#00D484',
      icon: 'star',
    },
    {
      title: 'Total Assets',
      value: portfolio?.items?.length.toString() || '0',
      subvalue: 'Tokens & NFTs',
      color: '#007AFF',
      icon: 'wallet',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Performance</Text>
      
      {/* Performance Chart */}
      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={width - 80}
          height={180}
          chartConfig={{
            backgroundColor: '#111',
            backgroundGradientFrom: '#111',
            backgroundGradientTo: '#111',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '3',
              strokeWidth: '2',
              stroke: '#007AFF',
            },
          }}
          bezier
          style={styles.chart}
          withInnerLines={false}
          withOuterLines={false}
          withVerticalLines={false}
          withHorizontalLines={false}
        />
      </View>

      {/* Metrics Grid */}
      <View style={styles.metricsGrid}>
        {metrics.map((metric, index) => (
          <View key={index} style={styles.metricItem}>
            <View style={styles.metricHeader}>
              <Ionicons name={metric.icon as any} size={16} color={metric.color} />
              <Text style={styles.metricTitle}>{metric.title}</Text>
            </View>
            <Text style={[styles.metricValue, { color: metric.color }]}>
              {metric.value}
            </Text>
            {metric.subvalue && (
              <Text style={styles.metricSubvalue}>{metric.subvalue}</Text>
            )}
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
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chart: {
    borderRadius: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  metricItem: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginVertical: 4,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricTitle: {
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  metricSubvalue: {
    fontSize: 11,
    color: '#888',
  },
}); 