import React, { useState, useEffect } from "react";
import { Button, Image, View, Text, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function SecondScreen() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // All 包含相片、影像
      allowsEditing: true, // 允許編輯
      allowsMultipleSelection: true, // 允許多張選取
      aspect: [4, 3], // 比例
      quality: 1
, // 壓縮比例 數值0-1（小數點也可設定）
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Second Screen</Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />{" "}
      </View>
    </View>
  );
}
