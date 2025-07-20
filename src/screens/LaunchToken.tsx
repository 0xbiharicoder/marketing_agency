import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useWallet } from 'app/lib/wallet';

const LaunchToken = () => {
  const { connected, connect, publicKey } = useWallet();

  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [supply, setSupply] = useState('');

  const handleLaunch = async () => {
    if (!connected) {
      await connect();
    }

    // Simulate token creation (integration will come next)
    Alert.alert("Token Launched!", `Name: ${name}\nSymbol: ${symbol}\nSupply: ${supply}`);
    console.log("Launch Info:", { name, symbol, supply, wallet: publicKey?.toBase58() });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Token Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. DOGEBOSS" />

      <Text style={styles.label}>Token Symbol</Text>
      <TextInput style={styles.input} value={symbol} onChangeText={setSymbol} placeholder="e.g. DOGE" />

      <Text style={styles.label}>Total Supply</Text>
      <TextInput style={styles.input} value={supply} onChangeText={setSupply} keyboardType="numeric" placeholder="e.g. 69000000" />

      <Button title="Launch Token" onPress={handleLaunch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { marginBottom: 5, fontSize: 16 },
  input: { borderWidth: 1, padding: 10, marginBottom: 15, borderRadius: 5 },
});

export default LaunchToken;
