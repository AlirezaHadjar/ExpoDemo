import {
  DragDropContentView,
  DragDropContentViewProps,
  OnDropEvent,
} from "expo-drag-drop-content-view";
import React, { useEffect, useState } from "react";
import {
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
    backgroundColor: "#2f95dc",
    borderRadius: 20,
    overflow: "visible",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderStyle: "dashed",
    borderColor: "#2f95dc",
  },
  imageContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

const usePermission = () => {
  useEffect(() => {
    const fn = async () => {
      try {
        await PermissionsAndroid.request(
          "android.permission.READ_MEDIA_IMAGES"
        );
      } catch (_) {}
    };
    if (Platform.OS === "android") fn();
  }, []);
};

export const IDragDropContentView = (props) => {
  usePermission();
  const [imageData, setImageData] = useState(null);
  return (
    <DragDropContentView
      {...props}
      onDropEvent={(event) => {
        setImageData(event.assets);
      }}
      style={[styles.container, props.style]}
    >
      {imageData &&
        imageData.map((asset, index) => {
          const rotation = Math.ceil(index / 2) * 5;
          const direction = index % 2 === 0 ? 1 : -1;
          return (
            <View
              key={asset.uri}
              style={[
                styles.imageContainer,
                {
                  transform: [{ rotate: `${rotation * direction}deg` }],
                },
              ]}
            >
              <Image source={{ uri: asset.uri }} style={styles.image} />
            </View>
          );
        })}
    </DragDropContentView>
  );
};
