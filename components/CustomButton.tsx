import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Link } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoffee, faMagic } from '@fortawesome/free-solid-svg-icons';

export default function CustomButton({ title, bgColor, onLoadingChange }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [isMagic, setIsMagic] = useState(true);

  const handleClick = () => {
    console.log('Button clicked');
    setIsLoading(true);
    onLoadingChange(true); // Notify parent component about the loading state
  }
  
  return (
    <TouchableOpacity
      onPress={handleClick}
      style={{
        backgroundColor: isLoading ? 'red' : bgColor, // Use red if isLoading is true, otherwise use bgColor
        padding: 10,
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        width: 200
      }}
    >
      <FontAwesomeIcon icon={isMagic ? faMagic : faCoffee} color="white" />
      <Link href="/(tabs)/explore">
        {title}
      </Link>
    </TouchableOpacity>
  )
};

