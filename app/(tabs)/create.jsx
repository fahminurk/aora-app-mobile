import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setform] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectedType) => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectedType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!res.canceled) {
      if (selectedType === "image") {
        setform({ ...form, thumbnail: res.assets[0] });
      } else {
        setform({ ...form, video: res.assets[0] });
      }
    }
  };

  const onSubmit = async () => {
    if (!form.title || !form.prompt || !form.video || !form.thumbnail) {
      return Alert.alert("Error", "Please fill in all the fields");
    }

    setUploading(true);

    try {
      await createVideo({ ...form, userId: user.$id });
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setform({ ...form, title: "", prompt: "", video: null, thumbnail: null });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-4">
        <Text className="text-2xl font-psemibold text-white">Upload Video</Text>

        <FormField
          title={"Video Title"}
          value={form.title}
          placeholder={"Give your video a catch title..."}
          handleChangeText={(e) => setform({ ...form, title: e })}
          otherStyles={"mt-10"}
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base font-pmedium text-gray-100">
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base font-pmedium text-gray-100">
            Thumbnail Image
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View
                className="w-full h-16 px-4 bg-black-100
               rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2"
              >
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-gray-100 font-pmedium text-sm">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title={"AI Prompt"}
          value={form.prompt}
          placeholder={"The prompt you used to create this video"}
          handleChangeText={(e) => setform({ ...form, prompt: e })}
          otherStyles={"mt-7"}
        />

        <CustomButton
          title={"Submit"}
          handlePress={onSubmit}
          containerStyles={"mt-7"}
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
