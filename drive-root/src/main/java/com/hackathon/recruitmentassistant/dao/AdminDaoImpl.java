package com.hackathon.recruitmentassistant.dao;

import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hackathon.recruitmentassistant.model.Admin;
import com.hackathon.recruitmentassistant.model.Drive;

@Repository
public abstract class AdminDaoImpl implements AdminDao{
	
	@Autowired
	private EntityManager entityManager;

	@Override
	public Admin getAdminByEmailId(String emailId){
		Query query = entityManager.createQuery("SELECT admin FROM Admin admin WHERE admin.emailId = :uName");
		query.setParameter("uName", emailId);
		return (Admin) query.getResultList().get(0);
	}
	
	/*@Override
	public Set<Drive> getDrivesForAdmin(Admin admin){
		return this.getOne(admin.getId()).getDrives();
	}*/
	

}
