import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../static/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImageManipulator from 'expo-image-manipulator';
import TEXT from '../../../static/Text';
import { useNavigation } from '@react-navigation/native';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../../config/firebase';

export default function CameraMenu() {
  const nav = useNavigation();
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [cameraViewKey, setCameraViewKey] = useState(0);
  const [torch, setTorch] = useState(false);
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button
          onPress={requestPermission}
          title='grant permission'
        />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }
  function toggleTorch() {
    setTorch((current) => (current === false ? true : false));
  }

  const takePicture = async () => {
    try {
      const data = await cameraRef.current.takePictureAsync({
        skipProcessing: true, // Avoid automatic resizing
      });

      // Resize the image to your desired aspect ratio
      const resizedImage = await ImageManipulator.manipulateAsync(
        data.uri,
        [{ resize: { width: 800, height: 800 } }], // Adjust width and height for your ratio
      );

      setImage(resizedImage.uri);
      setImageUpload(resizedImage.uri.split('/').pop());
    } catch (error) {
      console.error('Failed to capture image:', error);
      // Handle error appropriately (e.g., display an error message to the user)
    }
  };

  const getMimeType = (extension) => {
    switch (extension.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'gif':
        return 'image/gif';
      default:
        return 'application/octet-stream';
    }
  };

  const handleUpload = async () => {
    if (image) {
      try {
        const response = await fetch(image);
        const blob = await response.blob();

        const fileExtension = image.split('.').pop();
        const contentType = getMimeType(fileExtension);

        const storageRef = ref(
          storage,
          `images/${new Date().toISOString()}.${fileExtension}`,
        );
        const snapshot = await uploadBytes(storageRef, blob, {
          contentType: contentType,
        });

        const downloadURL = await getDownloadURL(snapshot.ref);
        nav.navigate('Classification', {
          image: downloadURL,
        });
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {image == null ? (
        <CameraView
          key={cameraViewKey}
          style={styles.camera}
          facing={facing}
          status='ready'
          enableTorch={torch}
          mute={true}
          //   onCameraReady={cameraReady}
          ref={cameraRef}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <MaterialCommunityIcons
                name='camera-flip-outline'
                size={40}
                color={Colors.white}
              />
            </TouchableOpacity>
            {/* Take Image */}
            <TouchableOpacity
              style={styles.takeBtn}
              activeOpacity={0.1}
              onPress={takePicture}
            >
              <View style={styles.takeCircle}></View>
            </TouchableOpacity>
            {/* Flash */}
            <TouchableOpacity
              style={styles.torchBtn}
              onPress={toggleTorch}
            >
              <MaterialCommunityIcons
                name={torch ? 'flash-off' : 'flash'}
                size={40}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <>
          <Image
            source={{ uri: image }}
            style={{ flex: 1 }}
          />
          <View style={styles.imgBtnContainer}>
            <TouchableOpacity
              style={styles.btnUpload}
              activeOpacity={0.85}
              onPress={handleUpload}
            >
              <Text style={styles.btnTitle}>Upload Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnTakeAgain}
              activeOpacity={0.85}
              onPress={() => {
                setImage(null);
                setTorch(false);
              }}
            >
              <Text style={styles.btnTitle}>Ambil Foto </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    margin: 64,
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  takeBtn: {
    alignSelf: 'flex-end',
    borderRadius: 100,
    height: 70,
    width: 70,
    backgroundColor: Colors.white,
  },
  torchBtn: {
    alignSelf: 'flex-end',
  },
  imgBtnContainer: {
    flexDirection: 'row',
  },
  btnUpload: {
    flex: 0.5,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  btnTakeAgain: {
    flex: 0.5,
    backgroundColor: Colors.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  btnTitle: {
    color: Colors.white,
    fontFamily: 'Jakarta-SemiBold',
    fontSize: TEXT.xsm,
  },
});
