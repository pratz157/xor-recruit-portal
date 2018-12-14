package com.hackathon.recruitmentassistant.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import com.hackathon.recruitmentassistant.dto.AdminParams;
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
	public Map registerUser(@RequestBody AdminParams adminUser) {
		Long  driveID = driveService.registerUser(adminUser);
		Map<String, Object> map = new HashMap<>();
		map.put("adminID", driveID);
    	return map;
	}

	@GetMapping("/candidate/status")
	public void getCandidateStatus(@RequestHeader(value = "candidateName") String candidateName) {
		
	}
}
