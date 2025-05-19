//hook
import { useMutation } from '@tanstack/react-query';
import {
  getAddressById,
  createAddress,
  updateAddressStatus,
  updateAddress,
} from '../services/addressService';

const useAddress = () => {
  const getAddress = useMutation({
    mutationFn: getAddressById,
    onSuccess: (data) => {
      console.log('Địa chỉ:', data);
    },
    onError: (error) => {
      console.error('Lỗi lấy địa chỉ:', {
        error,
        response: error.response?.data,
      });
      alert(`Lấy địa chỉ thất bại: ${error.response?.data?.message || error.message}`);
    },
  });

  const addAddress = useMutation({
    mutationFn: createAddress,
    onSuccess: (data) => {
      console.log('Đã thêm địa chỉ:', data);
    },
    onError: (error) => {
      console.error('Lỗi khi thêm địa chỉ:', {
        error,
        response: error.response?.data,
      });
      alert(`Thêm địa chỉ thất bại: ${error.response?.data?.message || error.message}`);
    },
  });

  const updateStatus = useMutation({
    mutationFn: updateAddressStatus,
    onSuccess: (data) => {
      console.log('Địa chỉ đã được cập nhật trạng thái:', data);
    },
    onError: (error) => {
      console.error('Lỗi khi cập nhật trạng thái địa chỉ:', {
        error,
        response: error.response?.data,
      });
      alert(`Cập nhật trạng thái địa chỉ thất bại: ${error.response?.data?.message || error.message}`);
    },
  });

  const updateAddressMutation = useMutation({
    mutationFn: ({ id, data }) => updateAddress(id, data),
    onSuccess: (data) => {
      console.log('Địa chỉ đã được cập nhật:', data);
    },
    onError: (error) => {
      console.error('Lỗi khi cập nhật địa chỉ:', {
        error,
        response: error.response?.data,
        id: error.config?.url?.split('/').pop(),
      });
      alert(`Cập nhật địa chỉ thất bại: ${error.response?.data?.message || error.message}`);
    },
  });

  return {
    getAddress: getAddress.mutateAsync,
    addAddress: addAddress.mutateAsync,
    updateStatus: updateStatus.mutateAsync,
    updateAddress: updateAddressMutation.mutateAsync,
  };
};

export default useAddress;