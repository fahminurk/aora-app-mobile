import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { icons } from "../constants";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPass, setShowPass] = useState(false);
  return (
    <View
      className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl
     focus:border-secondary flex flex-row items-center space-x-4"
    >
      <TextInput
        className="text-base h-full text-white flex-1 font-pregular"
        value={value}
        placeholder={"Search for a video topic"}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPass}
      />
      <TouchableOpacity className="border-l border-black-200 h-full justify-center pl-4">
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
