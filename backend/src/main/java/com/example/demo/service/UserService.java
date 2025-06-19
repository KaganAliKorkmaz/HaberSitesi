package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Service
public class UserService {
private static final Logger log = LoggerFactory.getLogger(UserService.class);


		
@Autowired
private UserRepository userRepositoryRef;
	

	public List<User> getAllUsers() {
	    return userRepositoryRef.findAll();
	}


    public  Optional<User> login(String username, String password) {

	Optional<User> user1 = userRepositoryRef.findByUsername(username);  
    if(user1.isPresent()) {
    	User userref = user1.get();
    	if(userref.getPassword().equals(password)) {
           
    	log.info("Giriş başarılı: {}", username);
    	return Optional.of(userref);
    				
    	}
    }
    else {
    log.info("Kullanıcı bulunamadı.");
    }
    return Optional.empty();
}
   
    
   public  Optional<User> sign_up(String username, String password) {

	Optional<User> user2 = userRepositoryRef.findByUsername(username);

	if(user2.isPresent()) {
		log.info("Kullanıcı adı kullanımda.");
		return Optional.empty();
	}
	else {
		User userref = new User();
		userref.setUsername(username);
		userref.setPassword(password);
		if(username.equals("admin123") && password.equals("123456")) {
			userref.setRole("admin");
		}
		else {
			userref.setRole("user");
		}
		userRepositoryRef.save(userref);
    	return Optional.of(userref);
		
	}
   
   }
   
   
   public User updateUser(Long id, String newUsername, String newPassword) {
	    Optional<User> user3 = userRepositoryRef.findById(id);
	    if (user3.isPresent()) {
	        User user = user3.get();
	        user.setUsername(newUsername);
	        user.setPassword(newPassword);
	        userRepositoryRef.save(user);
	        log.info("Kullanıcı güncellendi: {}", newUsername);
	        return user;
	    } else {
	        log.info("Güncellenecek kullanıcı bulunamadı: ID {}", id);
	        return null;
	    }
	}

   
   

   
   public Optional<User> getUserById(Long id) {
	    return userRepositoryRef.findById(id);
	}
   
   
   public boolean deleteUser(Long id) {
	    if (userRepositoryRef.existsById(id)) {
	        userRepositoryRef.deleteById(id);
	        log.info("Kullanıcı silindi: ID {}", id);
	        return true;
	    } else {
	        log.info("Silinecek kullanıcı bulunamadı: ID {}", id);
	        return false;
	    }
	}

   
   
    
}

