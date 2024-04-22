import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  const handleSearch = () => {
    if (!query) {
      return Alert.alert("Error", "Please input something to search");
    }

    if (pathname.startsWith("/search")) {
      router.setParams({ query });
    } else {
      router.push(`/search/${query}`);
    }
  };

  return (
    <View
      className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl
     focus:border-secondary flex flex-row items-center space-x-4"
    >
      <TextInput
        className="text-base h-full text-white flex-1 font-pregular"
        value={query}
        placeholder={"Search for a video topic"}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />
      <TouchableOpacity
        onPress={handleSearch}
        className="border-l border-black-200 h-full justify-center pl-4"
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
