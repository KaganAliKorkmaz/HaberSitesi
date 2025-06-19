package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.service.UserService;
import com.example.demo.dto.LoginRequest;
import org.springframework.http.ResponseEntity;
import com.example.demo.model.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import java.util.Optional;

    
    
    @RestController
	@RequestMapping("/Check")
    public class LoginController{

     

    @Autowired
    private UserService userService;


    @PostMapping("/login")
	public ResponseEntity<User> loginController(@RequestBody LoginRequest login1) {
		Optional<User> h1 = userService.login(login1.getUsername(),login1.getPassword());
	    if (h1.isPresent()) {
	        return ResponseEntity.ok(h1.get());
	    } else {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    } 
	    
	}



    @PostMapping("/signup")
	public ResponseEntity<User> sign_upController(@RequestBody LoginRequest login1) {
	    Optional<User> h2 = userService.sign_up(login1.getUsername(),login1.getPassword());
	    if (h2.isPresent()) {
	        return ResponseEntity.ok(h2.get());
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	    } 
	    
	}





     }