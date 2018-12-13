package com.hackathon.recruitmentassistant.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hackathon.recruitmentassistant.model.Admin;

@Repository
public interface AdminDao extends JpaRepository<Admin,Long>{
	
	Admin getAdminByEmailId(String emailId);

}
