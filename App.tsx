import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const App = () => {
  const baseUrl = 'https://api.github.com';
  const perPage = 20;

  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    loadApi();
  }, []);

  async function loadApi() {
    if (loading) return;

    setLoading(true);

    const response = await axios.get(
      `${baseUrl}/search/repositories?q=react&per_page=${perPage}&page=${page}`,
    );
    setData([...data, ...response.data.items]);
    setPage(page + 1);
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <View style={styles.item} key={index}>
            <Text style={styles.title} numberOfLines={1}>
              {item.full_name}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        onEndReached={loadApi}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading ? (
            <View style={styles.loading}>
              <ActivityIndicator size={40} color={'green'} />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#212121',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 25,
    color: '#fff',
  },
  loading: {
    padding: 20,
  },
});

export default App;
