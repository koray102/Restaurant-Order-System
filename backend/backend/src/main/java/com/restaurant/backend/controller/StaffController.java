package com.restaurant.backend.controller;

import com.restaurant.backend.model.Staff;
import com.restaurant.backend.repository.StaffRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "http://localhost:3000")
public class StaffController {

    private final StaffRepository staffRepository;

    public StaffController(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }



    @GetMapping("/locations")
    public List<String> getAllLocations() {
        return staffRepository.findAll()
                .stream()
                .map(Staff::getLocation)
                .distinct()
                .collect(Collectors.toList());
    }

    @GetMapping("/by-location/{location}")
    public List<Staff> getStaffByLocation(@PathVariable String location) {
        return staffRepository.findByLocation(location);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addStaff(@RequestBody Staff staff) {
        staffRepository.save(staff);
        return ResponseEntity.ok("Staff eklendi");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteStaff(@RequestParam String username, @RequestParam String location) {
        Staff staff = staffRepository.findByUsernameAndLocation(username, location);
        if (staff != null) {
            staffRepository.delete(staff);
            return ResponseEntity.ok("Staff silindi");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Staff bulunamadı");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        Optional<Staff> staff = staffRepository.findByUsernameAndPassword(username, password);
        if (staff == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        // Giriş başarılı, tüm gerekli bilgileri React'e gönder
        return ResponseEntity.ok(staff);


    }
}