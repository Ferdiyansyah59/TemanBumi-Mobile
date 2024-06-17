import { StatusBar } from 'expo-status-bar';
import Colors from '../../../static/Colors';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../../../components/classification/button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ClassificationOutput from '../../../components/classification/output';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../../config/firebase';
import { CLASSIFICATION_URL } from '../../../../config/apiConfig';

const Classification = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [className, setClassName] = useState();

  const [imageCamera, setImageCamera] = useState(null);
  const [imagePic, setImagePic] = useState(null);
  const [imagePicPred, setImagePicPred] = useState(null);
  const predict = async (url) => {
    await axios
      .post(
        `${CLASSIFICATION_URL}`,
        { img: url },
        {
          headers: {
            Accept: 'application/json, text/plain',
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then((res) => {
        setClassName(res.data.prediksi);
      })
      .catch((err) => {
        console.log(err);
      });
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

  const handleUpload = async (imagePic) => {
    if (imagePic) {
      try {
        const response = await fetch(imagePic);
        const blob = await response.blob();

        const fileExtension = imagePic.split('.').pop();
        const contentType = getMimeType(fileExtension);

        const storageRef = ref(
          storage,
          `images/${new Date().toISOString()}.${fileExtension}`,
        );
        const snapshot = await uploadBytes(storageRef, blob, {
          contentType: contentType,
        });

        const downloadURL = await getDownloadURL(snapshot.ref);
        setImagePicPred(downloadURL);
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    }
  };

  const pickImage = async () => {
    setImageCamera(null);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagePic(result.assets[0].uri);
      handleUpload(result.assets[0].uri);
    }
  };

  useEffect(() => {
    setImageCamera(null);
    if (imagePic == null) {
      const image = route.params.image;
      setImageCamera(image);
      predict(imageCamera);
    } else if (imagePicPred != null) {
      predict(imagePicPred);
    }
  });
  return (
    <>
      <StatusBar
        style='light'
        backgroundColor={Colors.primary}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.body}>
            <View style={styles.previewContainer}>
              {imageCamera === null && imagePic === null ? (
                <Text style={styles.previewTitle}>Pratinjau Foto</Text>
              ) : imageCamera !== null ? (
                <Image
                  source={{
                    uri: imageCamera,
                  }}
                  style={{ width: '100%', height: 300 }}
                />
              ) : (
                <>
                  {imagePic && (
                    <Image
                      source={{ uri: imagePic }}
                      style={{ width: '100%', height: 300 }}
                    />
                  )}
                </>
              )}
            </View>
            <Button
              cameraPress={() => {
                navigation.navigate('Camera');
                setImagePic(null);
              }}
              galeryPress={pickImage}
            />
            <ClassificationOutput className={className} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Classification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // paddingTop: 120,
  },
  body: {
    paddingHorizontal: 30,
    marginTop: 10,
  },
  header: {
    height: 120,
    backgroundColor: Colors.primary,
  },
  previewContainer: {
    height: 300,
    width: '100%',
    backgroundColor: Colors.gray250,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  previewTitle: {
    color: Colors.gray300,
    fontSize: 12,
    fontFamily: 'PoppinsMedium',
  },
});
