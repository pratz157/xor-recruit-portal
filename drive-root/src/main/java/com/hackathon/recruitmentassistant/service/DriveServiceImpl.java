package com.hackathon.recruitmentassistant.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hackathon.recruitmentassistant.dao.AdminDao;
import com.hackathon.recruitmentassistant.dao.CandidateDao;
import com.hackathon.recruitmentassistant.dao.DriveDao;
import com.hackathon.recruitmentassistant.dao.SkillDao;
import com.hackathon.recruitmentassistant.dto.AdminParams;
import com.hackathon.recruitmentassistant.dto.AssignCandidateDTO;
import com.hackathon.recruitmentassistant.dto.CandidateDTO;
import com.hackathon.recruitmentassistant.dto.CandidateStatusUpdateDTO;
import com.hackathon.recruitmentassistant.dto.DriveCreationDTO;
import com.hackathon.recruitmentassistant.dto.MessageDto;
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
	public Drive saveDrive(DriveCreationDTO driveCreationDTO) {
		Skill skill = new Skill();
		Admin admin = new Admin();
		Set<Admin> adminSet = new HashSet();
		Set<Drive> driveSet = new HashSet();
		
		skill = skillDao.getOne(driveCreationDTO.getSkill_id());
		admin = adminDao.getOne(driveCreationDTO.getAdmin_id());
		
		Drive d = new Drive();
		
		d.setScheduledAt(driveCreationDTO.getScheduledAt());
		d.setSkill(skill);
		adminSet.add(admin);
		d.setPanel(adminSet);
		
		
		if(admin.getDrives() == null){
			driveSet.add(d);
			admin.setDrives(driveSet);
		}else{
			admin.getDrives().add(d);
		}
		
		d = driveDao.save(d);
		
		if(driveCreationDTO.getCandidates().size() > 0){
			for(CandidateDTO cand: driveCreationDTO.getCandidates()){
				Candidate c = new Candidate();
				c.setName(cand.getName());
				c.setEmailId(cand.getEmailId());
				c.setStatus(cand.getStatus());
				c.setDrive(d);
				candidateDao.save(c);
			}
		}
		
		return d;
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
	public List<Skill> getAllDriveSkills() {
		return skillDao.findAll();
	}

	@Override
	public Admin getAdminOnLogin(String emailId) {
		return adminDao.getAdminByEmailId(emailId);
	}

	@Override
	public String getCandidateStatus(String emailId) {
		// TODO Auto-generated method stub
		return candidateDao.getCandidateByEmailId(emailId).getStatus();
	}

	@Override
	public String updateCandidateStatus(CandidateStatusUpdateDTO candidateStatusUpdateDTO) {
		// TODO Auto-generated method stub
		Candidate cand = candidateDao.getOne(candidateStatusUpdateDTO.getId());
		cand.setStatus(candidateStatusUpdateDTO.getStatus());
		if(candidateDao.save(cand) != null)
			return "Status Updated Successfully.";
		else
			return "Status Update Failed.";
	}

	@Override
	public Set<Drive> getAllDrivesForAdmin(long adminId) {
		Admin admin = adminDao.getOne(adminId);
	    return admin.getDrives();	
	}

	@Override
	public MessageDto assignCandidatesToPanel(List<AssignCandidateDTO> assignCandidateDTO) {

		MessageDto m = new MessageDto();
		
		if(assignCandidateDTO.size() > 0){
			for(AssignCandidateDTO dto: assignCandidateDTO){
				Admin admin = adminDao.getOne(dto.getAdminId());
				Candidate cand = candidateDao.getOne(dto.getCandidateId());
				Drive drive = driveDao.getOne(dto.getDriveId());
				
				admin.getDrives().add(drive);
				drive.getPanel().add(admin); 
				
				cand.setAdmin(admin);
				
				if(candidateDao.save(cand) != null && adminDao.save(admin) != null)
					m.setResponseMessage("Successfully Assigned.");
				else
					m.setResponseMessage("Failed to assign.");
				
				
				
				
			}
		}
		
		return m;
	}

	@Override
	public Set<Candidate> getAllCandidatesForADrive(AssignCandidateDTO assignCandidateDTO) {
		Drive drive = driveDao.getOne(assignCandidateDTO.getDriveId());
		return drive.getCandidates();
	}

	@Override
	public List<Admin> getAllAdmins() {
		return adminDao.findAll();
	}


	@Override
	public Long registerUser(AdminParams adminUser) {
		if(adminUser != null && adminUser.getRole() != null && adminUser.getEmailId() != null) {
			Admin user = new Admin();
			user.setPassword("password123");
			user.setEmailId(adminUser.getEmailId());
			user.setRole(adminUser.getRole());
			user.setSkill(skillDao.getOne(adminUser.getSkillID()));
			adminDao.save(user);
			return user.getId(); 
		}
		return null;
	}

	@Override
	public Drive save(Drive e) {
		// TODO Auto-generated method stub
		return null;
	}



}
