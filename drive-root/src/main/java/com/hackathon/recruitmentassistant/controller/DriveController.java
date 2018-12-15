package com.hackathon.recruitmentassistant.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackathon.recruitmentassistant.dto.AdminParams;
import com.hackathon.recruitmentassistant.dto.AssignCandidateDTO;
import com.hackathon.recruitmentassistant.dto.CandidateStatusUpdateDTO;
import com.hackathon.recruitmentassistant.dto.DriveCreationDTO;
import com.hackathon.recruitmentassistant.dto.MessageDto;
import com.hackathon.recruitmentassistant.model.Admin;
import com.hackathon.recruitmentassistant.model.Candidate;
import com.hackathon.recruitmentassistant.model.Drive;
import com.hackathon.recruitmentassistant.model.Skill;
import com.hackathon.recruitmentassistant.service.DriveService;

@RestController
@RequestMapping("/recruitmentassistant")
public class DriveController {
	
	@Autowired
	private DriveService driveService;
	
	// Working - looks good , I think we still need drive and recruiter association.
	@PostMapping("/drive")
	public Drive createNewDrive(@Valid @RequestBody DriveCreationDTO driveCreationDTO){
		return driveService.saveDrive(driveCreationDTO);
	}
	
	// Working
	@GetMapping("/admins")
	public List<Admin> getAllAdmins(){
		return driveService.getAllAdmins();
	}
	
	// Working
	@GetMapping("/skills")
	public List<Skill> getAllSkills(){
		return driveService.getAllDriveSkills();
	}
	
	// working
    @GetMapping("/login")
    public Admin getAdminOnLogin(@RequestHeader(value="userName") String userName){
    	return driveService.getAdminOnLogin(userName);
    }
    
    // Working
    @GetMapping("/drive/candidates")
    public Set<Candidate> getAllCandidatesForADrive(@RequestBody AssignCandidateDTO assignCandidateDTO){
    	return driveService.getAllCandidatesForADrive(assignCandidateDTO);
    }

    // Working
    @PostMapping("/register")
	public Map registerUser(@RequestBody AdminParams adminUser) {
		Long  driveID = driveService.registerUser(adminUser);
		Map<String, Object> map = new HashMap<>();
		map.put("adminID", driveID);
    	return map;
	}

    // Working
	@GetMapping("/candidate/status")
	public MessageDto getCandidateStatus(@RequestHeader(value = "userName") String userName) {
		MessageDto m = new MessageDto();
		m.setResponseMessage(driveService.getCandidateStatus(userName));
		return m;
	}
	
	// Working
	@GetMapping("/admin/drives")
	public Set<Drive> getAllDrivesForAdmin(@RequestBody AssignCandidateDTO admin){
		return driveService.getAllDrivesForAdmin(admin.getAdminId());
	}
	
	// Working
	@PostMapping("/candidate/updateStatus")
	public MessageDto updateCandidateStatus(@RequestBody CandidateStatusUpdateDTO candidateStatusUpdateDTO){
		
		MessageDto m = new MessageDto();
		m.setResponseMessage(driveService.updateCandidateStatus(candidateStatusUpdateDTO));
		return m;
	}
	
	// Working
	@PostMapping("/drive/assignCandidates")
	public MessageDto assignCandidatesToPanel(@RequestBody List<AssignCandidateDTO> assignCandidateDTO){
		return driveService.assignCandidatesToPanel(assignCandidateDTO);
	}
	
}
