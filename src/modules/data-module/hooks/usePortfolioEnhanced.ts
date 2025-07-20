import { useState, useEffect, useMemo, useCallback } from 'react';
import { useFetchPortfolio } from './useFetchTokens';
import { fetchTokenPrice, DEFAULT_SOL_TOKEN } from '../services/tokenService';
import { AssetItem, PortfolioData } from '../types/assetTypes';

interface PortfolioMetrics {
  totalValue: number;
  tokenCount: number;
  nftCount: number;
  change24h: number;
  changePercent24h: number;
  topPerformer: {
    name: string;
    symbol: string;
    change: number;
  } | null;
}

interface EnhancedPortfolioData extends PortfolioData {
  metrics: PortfolioMetrics;
  enrichedItems: (AssetItem & {
    usdValue?: number;
    price?: number;
    change24h?: number;
  })[];
}

export function usePortfolioEnhanced(walletAddress?: string) {
  const { 
    portfolio, 
    loading: portfolioLoading, 
    error: portfolioError 
  } = useFetchPortfolio(walletAddress);

  const [enhancedPortfolio, setEnhancedPortfolio] = useState<EnhancedPortfolioData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Enhanced portfolio calculation
  const calculatePortfolioMetrics = useCallback(async (portfolioData: PortfolioData) => {
    if (!portfolioData?.items) return null;

    setLoading(true);
    try {
      const enrichedItems: EnhancedPortfolioData['enrichedItems'] = [];
      let totalValue = 0;
      let tokenCount = 0;
      let nftCount = 0;

      // Process each asset
      for (const item of portfolioData.items) {
        const enrichedItem: any = { ...item };

        if (item.assetType === 'token') {
          tokenCount++;

          // Get token price
          const tokenInfo = {
            address: item.mint,
            symbol: item.symbol || '',
            name: item.name || '',
            decimals: item.token_info?.decimals || 9,
            logoURI: item.image || '',
          };

          const price = await fetchTokenPrice(tokenInfo);
          
          if (price && item.token_info?.balance) {
            const balance = parseFloat(item.token_info.balance);
            const usdValue = balance * price;
            
            enrichedItem.price = price;
            enrichedItem.usdValue = usdValue;
            enrichedItem.change24h = Math.random() * 20 - 10; // Mock 24h change
            
            totalValue += usdValue;

            // Update token_info with price data
            enrichedItem.token_info = {
              symbol: item.token_info?.symbol || item.symbol || '',
              balance: item.token_info?.balance || '0',
              decimals: item.token_info?.decimals || 9,
              token_program: item.token_info?.token_program || 'spl-token',
              price_info: {
                price_per_token: price,
                total_price: usdValue,
              },
            };
          }
        } else if (item.assetType === 'nft' || item.assetType === 'cnft') {
          nftCount++;
          // NFTs could have floor price estimation here
        }

        enrichedItems.push(enrichedItem);
      }

      // Add SOL balance
      if (portfolioData.nativeBalance?.lamports) {
        const solBalance = portfolioData.nativeBalance.lamports / 1e9;
        const solPrice = await fetchTokenPrice(DEFAULT_SOL_TOKEN);
        
        if (solPrice) {
          const solValue = solBalance * solPrice;
          totalValue += solValue;

          // Add SOL as a token item
          enrichedItems.unshift({
            id: 'native-sol',
            mint: DEFAULT_SOL_TOKEN.address,
            name: 'Solana',
            symbol: 'SOL',
            image: DEFAULT_SOL_TOKEN.logoURI,
            assetType: 'token',
            token_info: {
              symbol: 'SOL',
              balance: solBalance.toString(),
              decimals: 9,
              token_program: 'native',
              price_info: {
                price_per_token: solPrice,
                total_price: solValue,
              },
            },
            usdValue: solValue,
            price: solPrice,
            change24h: Math.random() * 10 - 5, // Mock change
          } as any);

          tokenCount++;
        }
      }

      // Calculate metrics
      const change24h = Math.random() * 100 - 50; // Mock 24h portfolio change
      const changePercent24h = totalValue > 0 ? (change24h / totalValue) * 100 : 0;

      // Find top performer
      const tokensWithChanges = enrichedItems.filter(item => 
        item.assetType === 'token' && item.change24h !== undefined
      );
      
      const topPerformer = tokensWithChanges.length > 0 
        ? tokensWithChanges.reduce((best, current) => 
            (current.change24h || 0) > (best.change24h || 0) ? current : best
          )
        : null;

      const metrics: PortfolioMetrics = {
        totalValue,
        tokenCount,
        nftCount,
        change24h,
        changePercent24h,
        topPerformer: topPerformer ? {
          name: topPerformer.name || 'Unknown',
          symbol: topPerformer.symbol || '',
          change: topPerformer.change24h || 0,
        } : null,
      };

      const enhanced: EnhancedPortfolioData = {
        ...portfolioData,
        enrichedItems,
        metrics,
      };

      setEnhancedPortfolio(enhanced);
      setError(null);

    } catch (err: any) {
      console.error('Error calculating portfolio metrics:', err);
      setError(err.message || 'Failed to calculate portfolio metrics');
    } finally {
      setLoading(false);
    }
  }, []);

  // Recalculate when portfolio data changes
  useEffect(() => {
    if (portfolio && !portfolioLoading) {
      calculatePortfolioMetrics(portfolio);
    }
  }, [portfolio, portfolioLoading, calculatePortfolioMetrics]);

  // Refresh function
  const refresh = useCallback(async () => {
    if (portfolio) {
      await calculatePortfolioMetrics(portfolio);
    }
  }, [portfolio, calculatePortfolioMetrics]);

  return {
    portfolio: enhancedPortfolio,
    loading: portfolioLoading || loading,
    error: portfolioError || error,
    refresh,
    metrics: enhancedPortfolio?.metrics || {
      totalValue: 0,
      tokenCount: 0,
      nftCount: 0,
      change24h: 0,
      changePercent24h: 0,
      topPerformer: null,
    },
  };
} 