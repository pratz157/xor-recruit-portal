package com.hackathon.recruitmentassistant.service;

import java.util.List;
import java.util.Set;

import com.hackathon.recruitmentassistant.common.CommonCRUDService;
import com.hackathon.recruitmentassistant.dto.AdminParams;
import com.hackathon.recruitmentassistant.dto.AssignCandidateDTO;
import com.hackathon.recruitmentassistant.dto.CandidateStatusUpdateDTO;
import com.hackathon.recruitmentassistant.dto.DriveCreationDTO;
import com.hackathon.recruitmentassistant.dto.MessageDto;
import com.hackathon.recruitmentassistant.model.Admin;
import com.hackathon.recruitmentassistant.model.Candidate;
import com.hackathon.recruitmentassistant.model.Drive;
import com.hackathon.recruitmentassistant.model.Skill;

public interface DriveService extends CommonCRUDService<Drive>{
	
	//List<Drive> getDriveListForAdmin(long adminId);
	Drive saveDrive(DriveCreationDTO driveCreationDTO);
	
	List<Skill> getAllDriveSkills();
	
	Admin getAdminOnLogin(String emailId); 

	Long registerUser(AdminParams adminUser);
	
	String getCandidateStatus(String emailId);
	
	String updateCandidateStatus(CandidateStatusUpdateDTO candidateStatusUpdateDTO);
	
	Set<Drive> getAllDrivesForAdmin(long adminId);
	
	MessageDto assignCandidatesToPanel(List<AssignCandidateDTO> assignCandidateDTO);
	
	Set<Candidate> getAllCandidatesForADrive(AssignCandidateDTO assignCandidateDTO);
	
	List<Admin> getAllAdmins();
}
 