import CustomButton from '@/components/CustomButton';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { useState } from 'react';
import NoteList from '@/components/NoteList';


export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingChange = (loadingState: any) => {
    setIsLoading(loadingState);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>
          Welcome back, Hatem
        </Text>
        <CustomButton 
          title="Hey there" 
          bgColor={isLoading ? 'red' : 'green'} // Pass the initial bgColor as green, it will turn red when loading
          onLoadingChange={handleLoadingChange} // Pass the function to change loading state
        />
        <NoteList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logo: {
    height: 80,
    marginBottom: 16,
    width: 80,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'left',
  },
});