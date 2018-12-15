package com.hackathon.recruitmentassistant.dao;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hackathon.recruitmentassistant.model.Admin;
import com.hackathon.recruitmentassistant.model.Drive;
@Repository
public interface AdminDao extends JpaRepository<Admin,Long>{
	
	Admin getAdminByEmailId(String emailId);
	
	//Set<Drive> getDrivesForAdmin(Admin admin);

}
