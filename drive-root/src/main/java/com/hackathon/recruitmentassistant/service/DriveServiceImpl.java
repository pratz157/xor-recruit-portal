package com.hackathon.recruitmentassistant.service;

import java.util.List;
import java.util.Optional;

import com.hackathon.recruitmentassistant.dto.AdminParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hackathon.recruitmentassistant.dao.AdminDao;
import com.hackathon.recruitmentassistant.dao.CandidateDao;
import com.hackathon.recruitmentassistant.dao.DriveDao;
import com.hackathon.recruitmentassistant.dao.SkillDao;
import com.hackathon.recruitmentassistant.model.Admin;
import com.hackathon.recruitmentassistant.model.Candidate;
import com.hackathon.recruitmentassistant.model.Drive;
import com.hackathon.recruitmentassistant.model.Skill;

@Service
@Transactional
public class DriveServiceImpl implements DriveService{
	
	@Autowired
	private DriveDao driveDao;
	
	@Autowired
	private CandidateDao candidateDao;
	
	@Autowired
	private AdminDao adminDao;
	
	@Autowired
	private SkillDao skillDao;

	@Override
	public Optional<Drive> save(Drive e) {
		
		Optional<Drive> drive = driveDao.save(e);

		for(Candidate cand: e.getCandidates()){
			cand.setDrive(drive);
			candidateDao.save(cand);
		}
		
		for(Admin admin: e.getPanel()){
			admin.setDrive(drive);
			adminDao.save(admin);
		}
		
		return drive;
	}

	@Override
	public Drive getById(long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Drive> getAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Drive> getDriveListForAdmin(long adminId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Skill> getAllDriveSkills() {
		return skillDao.findAll();
	}

	@Override
	public Admin getAdminOnLogin(String emailId) {
		return adminDao.getAdminByEmailId(emailId);
	}

	@Override
	public Long registerUser(AdminParams adminUser) {
		if(adminUser != null && adminUser.getRole() != null && adminUser.getEmailId() != null) {
			Admin user = new Admin();
			Optional<Drive> currentDrive = driveDao.findById(adminUser.getDriveID());
			user.setPassword("password123");
			user.setEmailId(adminUser.getEmailId());
			user.setRole(adminUser.getRole());
			user.setDrive(currentDrive);
			adminDao.save(user);
			return user.getId();
		}
		return null;
	}



}
