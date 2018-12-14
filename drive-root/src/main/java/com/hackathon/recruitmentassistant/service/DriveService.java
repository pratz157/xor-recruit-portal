package com.hackathon.recruitmentassistant.service;

import java.util.List;

import com.hackathon.recruitmentassistant.common.CommonCRUDService;
import com.hackathon.recruitmentassistant.dto.AdminParams;
import com.hackathon.recruitmentassistant.model.Admin;
import com.hackathon.recruitmentassistant.model.Drive;
import com.hackathon.recruitmentassistant.model.Skill;

public interface DriveService extends CommonCRUDService<Drive>{
	
	List<Drive> getDriveListForAdmin(long adminId);
	
	List<Skill> getAllDriveSkills();
	
	Admin getAdminOnLogin(String uName);

	void registerUser(Admin adminUser);

	Long registerUser(AdminParams adminUser);
}
 