package com.hackathon.recruitmentassistant.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackathon.recruitmentassistant.model.Admin;
import com.hackathon.recruitmentassistant.model.Drive;
import com.hackathon.recruitmentassistant.model.Skill;
import com.hackathon.recruitmentassistant.service.DriveService;

@RestController
@RequestMapping("/recruitmentassistant")
public class DriveController {
	
	@Autowired
	private DriveService driveService;
	
	@PostMapping("/drive")
	public Drive createNewDrive(@Valid @RequestBody Drive drive){
		
		return driveService.save(drive);
		
	}
	
	@GetMapping("/skills")
	public List<Skill> getAllSkills(){
		
		return driveService.getAllDriveSkills();
		
	}
	
    @GetMapping("/login")
    public Admin getAdminOnLogin(@RequestHeader(value="userName") String userName){
    	return driveService.getAdminOnLogin(userName);
    }


    @PostMapping("/register")
	public void registerUser(@RequestBody Admin adminUser) {
    	//todo a return bean which has id.
    	driveService.registerUser(adminUser);
	}
}
