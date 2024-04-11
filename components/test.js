import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { ConfirmDialog } from 'react-native-simple-dialogs';

export default function Teste() {
  const [dialogVisible, setDialogVisible] = useState(false);

  const showDialog = () => {
    setDialogVisible(true);
  };

  const handleConfirm = () => {
    // Handle confirm action
    setDialogVisible(false);
  };

  const handleCancel = () => {
    // Handle cancel action
    setDialogVisible(false);
  };

  return (
    <View style={styles.container}>
      <ConfirmDialog
        visible={dialogVisible}
        title="Confirm Action"
        message="Are you sure you want to perform this action?"
        onTouchOutside={() => setDialogVisible(false)}
        positiveButton={{
          title: "Confirm",
          onPress: handleConfirm,
        }}
        negativeButton={{
          title: "Cancel",
          onPress: handleCancel,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#2196F3',
    color: 'white',
    borderRadius: 5,
  },
});