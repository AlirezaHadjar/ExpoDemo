import {
  DragDropContentView,
  DragDropContentViewProps,
  OnDropEvent,
} from "expo-drag-drop-content-view";
import React, { useEffect, useState } from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const borderRadius = 20;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fefefe",
    borderRadius,
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
    borderRadius,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  placeholderContainer: {
    paddingHorizontal: 30,
    backgroundColor: "#2f95dc",
    opacity: 0.5,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius,
  },
  activePlaceholderContainer: {
    backgroundColor: "#2f95dc",
    opacity: 1,
  },
  placeholderText: {
    color: "white",
    textAlign: "center",
  },
});

const usePermission = () => {
  useEffect(() => {
    const fn = async () => {
      try {
        // @ts-ignore
        const PermissionsAndroid = await import("react-native").then(
          (module) => module.PermissionsAndroid
        );
        await PermissionsAndroid.request(
          "android.permission.READ_MEDIA_IMAGES"
        );
      } catch (_) {}
    };
    if (Platform.OS === "android") fn();
  }, []);
};

export const IDragDropContentView: React.FC<DragDropContentViewProps> = (
  props
) => {
  usePermission();
  const [imageData, setImageData] = useState<OnDropEvent[] | null>(null);
  const [isActive, setIsActive] = useState(false);

  const handleClear = () => setImageData(null);

  return (
    <DragDropContentView
      {...props}
      includeBase64
      draggableImageSources={imageData?.map(
        (image) => (image.uri || image.base64) as string
      )}
      onDropStartEvent={() => {
        setIsActive(true);
      }}
      onDropEndEvent={() => {
        setIsActive(false);
      }}
      highlightColor="#2f95dc"
      highlightBorderRadius={borderRadius}
      onDropEvent={(event) => {
        const newData = [...(imageData ?? []), ...event.assets];
        setImageData(newData);
        props.onDropEvent?.(event);
      }}
      style={[styles.container, props.style]}
    >
      {imageData ? (
        imageData.map((image, index) => {
          const uri = image.uri ? image.uri : image.base64;
          const rotation = Math.ceil(index / 2) * 5;
          const direction = index % 2 === 0 ? 1 : -1;
          const rotate = `${rotation * direction}deg`;

          return (
            <Pressable
              key={index}
              onPress={handleClear}
              style={[styles.imageContainer, { transform: [{ rotate }] }]}
            >
              <Image draggable source={{ uri }} style={[styles.image]} />
            </Pressable>
          );
        })
      ) : (
        <View
          style={[
            styles.placeholderContainer,
            isActive && styles.activePlaceholderContainer,
          ]}
        >
          <Text style={styles.placeholderText}>Drop any image here!</Text>
        </View>
      )}
    </DragDropContentView>
  ) as React.ReactNode;
};
