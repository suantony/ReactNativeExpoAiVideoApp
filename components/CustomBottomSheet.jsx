/* eslint-disable react/display-name */
import React, {
  useCallback,
  useMemo,
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

export const CustomBottomSheet = forwardRef(({children, ...props}, ref) => {
  const [item, setItem] = useState(null);
  const snapPoints = useMemo(() => ['30%'], []);
  const bottomSheetModalRef = useRef(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback(index => {
    // console.log('handleSheetChanges', index);
  }, []);

  useImperativeHandle(ref, () => ({
    showBottomSheetWithItem: item => {
      setItem(item);
      handlePresentModalPress();
    },
  }));

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{backgroundColor: '#1E1E2D'}}
        handleIndicatorStyle={{backgroundColor: '#CDCDE0'}}
        onChange={handleSheetChanges}>
        <BottomSheetView
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {children({item})}
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});
