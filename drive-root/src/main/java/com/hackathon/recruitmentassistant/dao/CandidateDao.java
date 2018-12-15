package com.hackathon.recruitmentassistant.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hackathon.recruitmentassistant.dto.CandidateStatusUpdateDTO;
import com.hackathon.recruitmentassistant.model.Admin;
import com.hackathon.recruitmentassistant.model.Candidate;

@Repository
public interface CandidateDao extends JpaRepository<Candidate,Long>{
      Candidate getCandidateByEmailId(String emailId);
      //String updateCandidateStatus(CandidateStatusUpdateDTO candidateStatusUpdateDTO);
      //String assignCandidateToPanel(Candidate cand);
}
