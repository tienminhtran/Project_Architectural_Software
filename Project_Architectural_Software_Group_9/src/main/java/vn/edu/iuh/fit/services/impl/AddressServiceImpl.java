package vn.edu.iuh.fit.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.dtos.request.AddressRequest;
import vn.edu.iuh.fit.dtos.response.AddressResponse;
import vn.edu.iuh.fit.entities.Address;
import vn.edu.iuh.fit.entities.User;
import vn.edu.iuh.fit.repositories.AddressRepository;
import vn.edu.iuh.fit.repositories.UserRepository;
import vn.edu.iuh.fit.services.AddressService;

import java.util.List;
import java.util.Optional;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    private AddressResponse convertToDto(Address address) {
        return modelMapper.map(address, AddressResponse.class);
    }

    @Override
    public List<AddressResponse> getAllAddressesByUserId(Long userId) {
        List<Address> addresses = addressRepository.findAllByUserId(userId);
        return addresses.stream().map(this::convertToDto).toList();
    }

    @Override
    public AddressResponse save(AddressRequest request, Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) return null;

        User user = optionalUser.get();
        Address address = new Address();
        address.setCity(request.getCity());
        address.setDistrict(request.getDistrict());
        address.setStreet(request.getStreet());
        address.setDetailLocation(request.getDetailLocation());
        address.setUser(user);

        Address saved = addressRepository.save(address);
        return convertToDto(saved);
    }

    @Override
    public AddressResponse update(AddressRequest request, Long id) {
        Optional<Address> optional = addressRepository.findById(id);
        if (optional.isEmpty()) return null;

        Address address = optional.get();
        address.setCity(request.getCity());
        address.setDistrict(request.getDistrict());
        address.setStreet(request.getStreet());
        address.setDetailLocation(request.getDetailLocation());

        Address updated = addressRepository.save(address);
        return convertToDto(updated);
    }
}
