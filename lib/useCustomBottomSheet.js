import {useRef} from 'react';

const useCustomBottomSheet = () => {
  const customBottomSheetRef = useRef(null);

  const showBottomSheet = selectedItem => {
    customBottomSheetRef.current.showBottomSheetWithItem(selectedItem);
  };
  return {customBottomSheetRef, showBottomSheet};
};

export default useCustomBottomSheet;
