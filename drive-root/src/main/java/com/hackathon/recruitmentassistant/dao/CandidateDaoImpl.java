package com.hackathon.recruitmentassistant.dao;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.hackathon.recruitmentassistant.dto.AssignCandidateDTO;
import com.hackathon.recruitmentassistant.dto.CandidateStatusUpdateDTO;
import com.hackathon.recruitmentassistant.model.Admin;
import com.hackathon.recruitmentassistant.model.Candidate;

public abstract class CandidateDaoImpl implements CandidateDao{

	@Autowired
	private EntityManager entityManager;
	
	@Autowired
	private AdminDao adminDao;
	
	/*@Override
	public String updateCandidateStatus(CandidateStatusUpdateDTO candidateStatusUpdateDTO){
		Query query = entityManager.createQuery("UPDATE Candidate candidate SET status:=statusParam WHERE id:=candId");
		query.setParameter("statusParam", candidateStatusUpdateDTO.getStatus());
		query.setParameter("candId", candidateStatusUpdateDTO.getId());
		Candidate cand = (Candidate) query.getResultList().get(0);
		
		if(cand != null)
		  return "Status Updated Successfully.";
		else
		  return "Status can not be updated";
	}*/
	
	@Override
	public Candidate getCandidateByEmailId(String emailId) {
		Query query = entityManager.createQuery("SELECT candidate FROM Candidate candidate WHERE admin.emailId = :uName");
		query.setParameter("uName", emailId);
		Candidate cand = (Candidate) query.getResultList().get(0);
		return cand;
	}

}
